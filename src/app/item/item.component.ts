import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Item } from "../item";


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})

export class ItemComponent {
  editable = false;
  editableDescription = false;
  editableExpiry = false;
  @Input() item!: Item;
  @Input() itemDescription: string;
  @Input() newItem!: string;
  @Output() remove = new EventEmitter<Item>();
  saveItem(itemName: string) {
    if (!itemName) return;
    this.editable = false;
    this.item.itemName = itemName;
  }
  saveDescription(description: string) {
    if (!description) return;
    this.editableDescription = false;
    this.item.description = description;
  }

  saveExpiry(expiry: DateConstructor) {

    if (!expiry) return;
    this.editableExpiry = false;

  }
}
