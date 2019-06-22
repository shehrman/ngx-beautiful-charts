import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RegularChartsService } from './regular-charts.service';

@Component({
  selector: 'rc-regular-charts',
  templateUrl: './regular-charts.component.html',
  styles: []
})
export class RegularChartsComponent implements OnInit, OnChanges {

  @Input() width: number;
  @Input() height: number;
  @Input() minX: number;
  @Input() minY: number;
  @Input() maxX: number;
  @Input() maxY: number;
  @Input() gridPrecisionX: number;
  @Input() gridPrecisionY: number;
  @Input() displayXAxis: boolean;
  @Input() displayYAxis: boolean;
  @Input() data;
  @Input() chartType: string;


  padding = 60;
  rectWidth: number;
  rectHeight: number;
  gridWidthX: number;
  gridWidthY: number;
  gridPath: string;
  xAxis = [];
  yAxis = [];
  // transformedData = [];


  printAllInput() {
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('minX: ' + this.minX);
    console.log('minY: ' + this.minY);
    console.log('maxX: ' + this.maxX);
    console.log('maxY: ' + this.maxY);
    console.log('gridPrecisionX: ' + this.gridPrecisionX);
    console.log('gridPrecisionY: ' + this.gridPrecisionY);
  }


  // transformX(x: number) {
  //   return this.rectWidth * x / (this.maxX - this.minX);
  // }

  // transformY(y: number) {
  //   return this.rectHeight * y / (this.maxY - this.minY);
  // }

  // transformData() {
  //   this.transformedData = [];
  //   for (const point of this.data) {
  //     this.transformedData.push({
  //       x: this.regularChartsService.transformX(point.x) + this.padding,
  //       y: this.regularChartsService.transformY(this.maxY - point.y) + this.padding,
  //       info: point.info,
  //       originalX: point.x,
  //       originalY: point.y
  //     });
  //   }
  // }

  computeGrid() {
    // maxX - minX --> gridPrecisionX
    // width --> gridWidthX
    this.gridWidthX = this.regularChartsService.transformX(this.gridPrecisionX);
    this.gridWidthY = this.regularChartsService.transformY(this.gridPrecisionY);
    this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
    this.xAxis = [];
    this.yAxis = [];
    for (let x = this.minX; x <= this.maxX; x = x + this.gridPrecisionX) {
      const xPos = this.regularChartsService.transformX(x) + this.padding;
      this.xAxis.push({xPos: xPos, value: x});
    }

    for (let y = this.minY; y <= this.maxY; y = y + this.gridPrecisionY) {
      const yPos = this.regularChartsService.transformY(y) + this.padding + 7;
      this.yAxis.push({yPos: yPos, value: this.maxY - y });
    }
  }

  constructor(public regularChartsService: RegularChartsService) {
  }

  ngOnInit() {
    this.regularChartsService.setValues({
      width: this.width,
      height: this.height,
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      padding: this.padding
    });
    this.printAllInput();
    this.computeGrid();
    // this.transformData();
  }

  ngOnChanges() {
    this.regularChartsService.setValues({
      width: this.width,
      height: this.height,
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      padding: this.padding
    });
    this.printAllInput();
    this.computeGrid();
    // this.transformData();
  }

}
