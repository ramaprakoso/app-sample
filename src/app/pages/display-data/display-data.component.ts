import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxDataGridModule } from 'devextreme-angular';
import { ApiService, Order } from '../../api.service'; 
// import 'devextreme/data/odata/store';

@Component({
  templateUrl: 'display-data.component.html'
})

export class DisplayDataComponent {
  orders: Order[];
  
  constructor(service: ApiService) {
      this.orders = service.getOrders(); 
  }
}
