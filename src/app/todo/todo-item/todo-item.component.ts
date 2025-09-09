import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input('todo') todo: Todo | null = null;
  @Output('update') update = new EventEmitter<Todo>();

  todoService = inject(TodoService)

  isEditing: boolean = false;
  editTitle: string = '';

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    this.update.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });
  }

  edit(){
    if (!this.todo) {
      throw new Error('cannot edit on null');
    }
    this.isEditing = true;
    this.editTitle = this.todo.title;
  }

  cancel(){
    this.isEditing = false;
    this.editTitle = '';
  }

  save(){
    if (!this.todo) {
      throw new Error('cannot save on null');
    }
    if (this.editTitle.trim()) {
      this.todo.title = this.editTitle;
      this.isEditing = false;
      this.todoService.updateTodo(this.todo).subscribe({
        next: (todo) => {
          window.location.reload();
        },
      });
    }
  }
}
