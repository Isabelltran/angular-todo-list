import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  
  todos = this.getTodos();
  
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}`);
  }

  addTodo(title: string): Observable<Todo> {
    const todo = {title: title}
    return this.http.post<Todo>(`${environment.apiUrl}`, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const body = {title: todo.title, completed: todo.completed};
    return this.http.put<Todo>(`${environment.apiUrl}/${todo.id}`, body);
  }

}
