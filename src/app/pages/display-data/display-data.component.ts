import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxDataGridModule } from 'devextreme-angular';
import { ApiService, Employee, State } from '../../api.service'; 
// import 'devextreme/data/odata/store';

@Component({
  templateUrl: 'display-data.component.html'
})

export class DisplayDataComponent {
  state: State[];
  employees: Employee[];

  constructor(public service: ApiService) {
      this.state = service.getStates(); 
      this.employees = service.getEmployees(); 
      this.cloneIconClick = this.cloneIconClick.bind(this);
  }

  private static isChief(position) {
    return position && ["CEO", "CMO"].indexOf(position.trim().toUpperCase()) >= 0;
  };

  rowValidating(e) {
      var position = e.newData.Position;

      if(DisplayDataComponent.isChief(position)) {
          e.errorText = "The company can have only one " + position.toUpperCase() + ". Please choose another position.";
          e.isValid = false;
      }
  }

  editorPreparing(e) {
      if(e.parentType === "dataRow" && e.dataField === "Position") {
          e.editorOptions.readOnly = DisplayDataComponent.isChief(e.value);
      }
  }

  allowDeleting(e) {
      return !DisplayDataComponent.isChief(e.row.data.Position);
  }

  isCloneIconVisible(e) {
      return !e.row.isEditing && !DisplayDataComponent.isChief(e.row.data.Position);
  }

  cloneIconClick(e) {
      var clonedItem = Object.assign({}, e.row.data, { ID: this.service.getMaxID() });

      this.employees.splice(e.row.rowIndex, 0, clonedItem);
      e.event.preventDefault();
  }
}
