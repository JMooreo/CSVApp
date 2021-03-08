import { Component } from '@angular/core';
import { Cell } from '../models/cell';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dataBlock: Cell[][] = [];
  lastCoordinates = {
    x: 0,
    y: 0,
  }
  selectedArea = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  };
  numRows = 50;
  numColumns = 20;

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
        row.push({ id, rowIndex: i, columnIndex: j, value: j.toString(), status: 'deselected' } as Cell);
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

  public async mouseOver(event: any, rowIndex: number, columnIndex: number) {
    let buttonPressed = event.which;
    this.lastCoordinates = { x: event.x, y: event.y }
    const { x1, y1 } = this.selectedArea;
    let minRowIndex = Math.min(x1, rowIndex);
    let maxRowIndex = Math.max(x1, rowIndex);
    let minColIndex = Math.min(y1, columnIndex);
    let maxColIndex = Math.max(y1, columnIndex);

    if (buttonPressed == 1) {
      for (let i = minRowIndex; i <= maxRowIndex; i++) {
        for (let j = minColIndex; j <= maxColIndex; j++) {
          this.dataBlock[i][j].status = 'selected';
        }
      }
    }
  }

  public async mouseLeave(event: any, rowIndex: number, columnIndex: number) {
    let buttonPressed = event.which;
    const { x, y } = this.lastCoordinates;
    const { x1, y1 } = this.selectedArea;

    let minRowIndex = Math.min(x1, rowIndex);
    let maxRowIndex = Math.max(x1, rowIndex);
    let minColIndex = Math.min(y1, columnIndex);
    let maxColIndex = Math.max(y1, columnIndex);

    if (buttonPressed == 1) {
      if ((rowIndex > x1 && event.y < y) || (rowIndex < x1 && event.y > y)) { // Handle Rows
        for (let j = minColIndex; j <= maxColIndex; j++) {
          this.dataBlock[rowIndex][j].status = 'deselected';
        }
      }

      if ((columnIndex > y1 && event.x < x) || (columnIndex < y1 && event.x > x)) { // Handle Columns
        for (let i = minRowIndex; i <= maxRowIndex; i++) {
          this.dataBlock[i][columnIndex].status = 'deselected';
        }
      }
    }
  }

  public async mouseDown(rowIndex: number, columnIndex: number) {
    this.selectedArea.x1 = rowIndex;
    this.selectedArea.y1 = columnIndex;
    this.dataBlock.forEach(row => {
      row.forEach(cell => {
        cell.status = 'deselected'
      })
    })
    console.log("Mouse Down", this.selectedArea)
  }

  public async mouseUp(rowIndex: number, columnIndex: number) {
    this.selectedArea.x2 = rowIndex;
    this.selectedArea.y2 = columnIndex;
    console.log("Mouse Up", this.selectedArea)
    const { x1, y1 } = this.selectedArea;
    let minRowIndex = Math.min(x1, rowIndex);
    let maxRowIndex = Math.max(x1, rowIndex);
    let minColIndex = Math.min(y1, columnIndex);
    let maxColIndex = Math.max(y1, columnIndex);

    this.dataBlock.forEach((row, rowIndex) => {

      row.forEach((cell, columnIndex) => {
        if (rowIndex < minRowIndex || columnIndex < minColIndex || rowIndex > maxRowIndex || columnIndex > maxColIndex) {
          cell.status = 'deselected'
        }
      })
    })
  }
}
