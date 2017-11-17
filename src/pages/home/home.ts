import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs/Observable';
import { Item } from './../../models/item.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;

  constructor(
    public navCtrl: NavController,
    private shoppingService: ShoppingListService) {

    this.shoppingList$ = this.shoppingService
      .getShoppingList()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
      });

  }

}
