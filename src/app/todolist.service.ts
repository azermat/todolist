import { Injectable } from '@angular/core';
import { Item } from "./item";
// import { ItemComponent } from './item/item.component';
import { Router } from '@angular/router'
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  public todos: Item[] = [];
  
  constructor() { }
  filter: 'all' | 'active' | 'done' = 'all';

  public getTodos(done?: boolean): Item[] {
    return this.todos
    .filter(x => done === undefined || (done && x.doneDate) || (!done && !x.doneDate))
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }
  public addTodo(itemName: string, description: string, dueDate: Date, done: boolean): void {
    let newId = 0;
    if (this.todos.length) {
      newId = Math.max(...this.todos.map(t => t.id)) + 1;
    }

    this.todos.push({ id: newId, itemName: itemName, description: description, dueDate: dueDate, done: done });
  }

  public deleteTodoById(id: number): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    }
  }

  public updateTodoById(id: number, itemName: string, description: string, dueDate: Date): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
      this.todos[index].itemName = itemName;
      this.todos[index].description = description;
      this.todos[index].dueDate = dueDate;
    }
  }

  public toggleDoneStateById(id: number): void {
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
      if (this.todos[index].doneDate) {
        this.todos[index].doneDate = undefined;
      } else {
        this.todos[index].doneDate = new Date();
      }
    }
  }

  get Item() {
    if (this.filter === 'all') {
      return this.todos;
    }
    return this.todos.filter((item) => this.filter === 'done' ? item.done : !item.done);
  }

  remove(item: Item) {
    this.todos.splice(this.todos.indexOf(item), 1);
  }
}
