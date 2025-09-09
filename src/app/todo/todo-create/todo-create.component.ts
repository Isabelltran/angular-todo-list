import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  standalone: false,
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  todoServer = inject(TodoService)
  ngForm: FormGroup;
  formBuilder = inject(FormBuilder);

  todo: string = '';

  @Output('newTodo') newTodo = new EventEmitter<string>();

  constructor() {
    this.ngForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  addTodo() {
    this.todoServer.addTodo(this.todo).subscribe({
      next: (todo) => {
        this.todo = '';
        window.location.reload();
      },
    });
  }

}