import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';

@Component({
  selector: 'cf-custom-tabs-item',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './custom-tabs-item.component.html',
  styleUrl: './custom-tabs-item.component.scss',
})
export class CustomTabsItemComponent implements OnChanges {
  @Input({required: true}) featherIcon!: string;
  @Input({required: true}) titleItem!: string;
  @Input({required: true}) subTitleItem!: string;
  @Input({required: true}) defaultState!: ItemStyle;
  @Input({required: true}) activeState!: ItemStyle;
  @Input({required: true}) isActive!: boolean;
  

  bgColor: string = '';
  iconColor: string = '';
  titleColor: string = '';
  subTitleColor: string = '';

  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'isActive' ] && 'currentValue' in changes[ 'isActive' ]) {
      this.isActive = changes[ 'isActive' ].currentValue;
      this.isActive ? this.setState(this.activeState) : this.setState(this.defaultState);
    }
  }
  setState(newState: ItemStyle): void {
    this.bgColor = newState.bgColor;
    this.iconColor = newState.iconColor;
    this.titleColor = newState.titleColor;
    this.subTitleColor = newState.subTitleColor;
  }
  
}

interface ItemStyle {
  bgColor: string;
  iconColor: string;
  titleColor: string;
  subTitleColor: string;
}