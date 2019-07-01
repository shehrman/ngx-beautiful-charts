import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BeautifulChartsService } from '../../beautiful-charts.service';

@Component({
  selector: 'g[ngx-pie-chart-base]',
  templateUrl: './pie-chart-base.component.html',
  styleUrls: ['./pie-chart-base.component.scss']
})
export class PieChartBaseComponent implements OnInit, OnChanges {

  @Input() xPadding: number;
  @Input() yPadding: number;
  @Input() width: number;
  @Input() height: number;

  x1: number;
  x2: number;

  computeLegionXs() {
    this.x1 = this.width + 2 * this.xPadding + this.beautifulChartsService.legionWidth / 4 * .2;
    this.x2 = this.width + 2 * this.xPadding + this.beautifulChartsService.legionWidth / 4 * .8;
  }

  computeLegionPath(i: number) {
    let path = 'M ';
    const y = this.yPadding + 30 + 30 * i;
    path = path + this.x1 + ' ' + y + ' ' + this.x2 + ' ' + y;
    return path;
  }

  constructor(public beautifulChartsService: BeautifulChartsService) { }

  ngOnInit() {
    this.computeLegionXs();
  }

  ngOnChanges() {
    this.computeLegionXs();
  }

}