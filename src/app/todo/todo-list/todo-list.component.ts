import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todoService = inject(TodoService)

  todo$ = new Observable<Todo[]>();

  ngOnInit(){
    this.todo$ = this.todoService.getTodos();
    
  }

  // updateTodo(todo: Todo) {
  //   this.todoService.updateTodo(todo);
  // }

  // async newTodo(title: string) {
  //   this.todoService.addTodo(title).subscribe({
  //     next: (todo) => {
  //       this.todo$ = this.todoService.getTodos();
  //     },
  // });
  //   this.todo$ = this.todoService.getTodos();
  // }
}
