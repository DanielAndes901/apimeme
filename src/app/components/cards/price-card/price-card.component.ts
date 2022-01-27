import { Component, Input } from '@angular/core';
import { IPriceItem } from 'src/app/data/prices';

@Component({
  selector: 'hmw-price-card',
  templateUrl: './price-card.component.html',
})
export class PriceCardComponent{

  @Input() price: IPriceItem;

  constructor() { }



}
