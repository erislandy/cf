import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';
import { CustomTabsItemComponent } from '../custom-tabs-item/custom-tabs-item.component';

@Component({
  selector: 'cf-custom-tabs',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent, CustomTabsItemComponent],
  templateUrl: './custom-tabs.component.html',
  styleUrl: './custom-tabs.component.scss',
})
export class CustomTabsComponent implements OnChanges {
  @Input({required: true}) tabs: Array<TabItem> = [];
  @Input() activeTab: number = 0;
  @Output() activeTabChange: EventEmitter<number> = new EventEmitter<number>();

  routineSteps: Array<{
    title: string;
    featherIcon: string;
    subTitle: string;
    isActive: boolean;
  }> = []
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabs'] && changes['tabs'].currentValue) {
      this.tabs = changes['tabs'].currentValue;
      this.routineSteps = this.tabs.map((tab, index) => ({
        ...tab,
        isActive: index === 0,
      }));
    }
    if (changes['activeTab'] && changes['activeTab'].currentValue) {
      this.activeTab = changes['activeTab'].currentValue;
      this.routineSteps.forEach((element, index) =>element.isActive = index === this.activeTab);
    }
  }
  onTabClick(tabIndex: number) {
    this.routineSteps.forEach((element, index) =>element.isActive = index === tabIndex);
    this.activeTabChange.emit(tabIndex);
  }
}

export interface TabItem {
  title: string;
  featherIcon: string;
  subTitle: string;
}
