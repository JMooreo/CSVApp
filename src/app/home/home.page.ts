import { Component } from '@angular/core';
import { Cell } from '../models/cell';
import anime from "animejs/lib/anime.es.js";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dataBlock: Cell[][] = [];
  selectedItems = [];
  numRows = 10;
  numColumns = 20;
  numExtraRows = 10;
  numExtraColumns = 0;

  selectedStyle = {
    highlightColor: "#AFF9C9",
    borderColor: "#7CF0BD"
  }

  deselectedStyle = {
    highlightColor: "#FAFFFF",
    borderColor: "#ECECEC"
  }

  inactiveStyle = {
    highlightColor: "#EEEEEE",
    borderColor: "#DDDDDD"
  }

  constructor() {
    var id = 0;
    var row: Cell[] = [];
    for (var i = 0; i < this.numRows; i++) {
      for (var j = 0; j < this.numColumns; j++) {
        id++
        row.push({id, rowIndex: i, columnIndex: j, value: j.toString(), status: 'deselected'} as Cell);
      }

      for (var j = 0; j < this.numExtraRows; j++) {
        id++;
        row.push({id, rowIndex: i, columnIndex: this.numColumns + j, value: "", status: 'inactive'} as Cell);
      }

      this.dataBlock.push(row);
      row = []
    }


    for (var i = 0; i < this.numExtraRows; i++) {
      for (var j = 0; j < this.numColumns + this.numExtraColumns; j++) {
        id++
        row.push({id, rowIndex: this.numRows + i, columnIndex: j, value: "", status: 'inactive'} as Cell);
      }
      this.dataBlock.push(row);
      row = []
    }

    console.log(this.dataBlock)
  }

  public updateValue(rowIndex: number, columnIndex: number, newValue: any) {
    this.dataBlock[rowIndex][columnIndex] = newValue;
  }

  public trackByFn(index: number) {
    return index;
  }

  public itemSelected(cell: Cell) {

    var el = document.getElementById(cell.id.toString())
    anime({
      targets: el,
      backgroundColor: this.selectedStyle.highlightColor,
      borderColor: this.selectedStyle.borderColor,
      easing: 'easeOutCubic',
      duration: 0
    });
  }

  public itemDeselected(cell: Cell) {
    var el = document.getElementById(cell.id.toString())
    if (cell.status == 'deselected') {
      anime({
        targets: el,
        backgroundColor: this.deselectedStyle.highlightColor,
        borderColor: this.deselectedStyle.borderColor,
        duration: 0
      })
    } else {
      anime({
        targets: el,
        backgroundColor: this.inactiveStyle.highlightColor,
        borderColor: this.inactiveStyle.borderColor,
        duration: 0
      })
    }
    
  }

}
