import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxDataGridModule } from 'devextreme-angular';
import { ApiService, MProject } from '../../api.service'; 
// import 'devextreme/data/odata/store';

@Component({
  templateUrl: 'display-data.component.html'
})

export class DisplayDataComponent {
  mproject: any = [];

  constructor(public service: ApiService) {
  }

  ngOnInit() {
    this.loadProject(); 
    console.log(this.loadProject()); 
  }

  loadProject() {
    return this.service.getProject().subscribe((data: {}) => {
      this.mproject = data['mproject'];
      console.log("data source", this.mproject); 

    })
  }
  
}
