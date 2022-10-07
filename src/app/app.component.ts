import { DatePipe, formatDate } from "@angular/common";
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { empty } from "rxjs";
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Item } from "./item";

import { TodoListService } from "./todolist.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  

  title = 'TodoListe';
  @Input() item!: Item;
  @Input() itemDescription: string;
  public todoName= '';
  public todoDescription = '';
  public todoDueDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  public todoDone = false;
  public showDone = false;
  constructor(public todoListService: TodoListService) { }



  public items: Item[] =  [
    { id: 1, itemName: 'test1', description: 'Mathe Ferien-Hausübung', dueDate: new Date(2020, 9, 21), done: true },
    { id: 2, itemName: 'test2', description: 'Geburtstagsgeschenk Oma', dueDate: new Date(2020, 8, 20), done: false },
    { id: 3, itemName: 'test3', description: 'Zimmer aufräumen', dueDate: new Date(2020, 8, 14), done: false }
  ];

  ngOnInit(): void {
  }

  public addTodo(): void {
    if ( this.todoName && this.todoDueDate) {
      this.todoListService.addTodo(this.todoName, this.todoDescription, new Date(this.todoDueDate), this.todoDone);
      this.todoName = '';
      this.todoDescription = '';
      this.todoDone=false;
      this.todoDueDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    }
  }

  

  remove(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }

}