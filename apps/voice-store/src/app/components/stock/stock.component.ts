import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterOutlet } from "@angular/router";
import { ImageService } from "@cf/directus-infrastructure";
import { EntityType, GenericUseCase, Stock, StoreProduct } from "@cf/store-domain";
import { combineLatest, map, Observable } from "rxjs";

interface StockItemsView {
  id: string; 
  name: string; amount: number, 
  description: string;
  imageUrl$: Observable<string>;
}
@Component({
    selector: 'cf-stock',
    standalone: true,
    imports: [
      CommonModule, 
      RouterOutlet,
    ],
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.scss',
  })
export class StockComponent{
  stockService = inject(GenericUseCase<Stock>);
  productService = inject(GenericUseCase<StoreProduct>);
  imageService = inject(ImageService);
  stockItems = toSignal<Array<StockItemsView>>(
    combineLatest([
      this.stockService.getGenerics(EntityType.STOCK),
      this.productService.getGenerics(EntityType.PRODUCT)
    ]).pipe(
      map(([stockItems, products]) => {
        console.log({stockItems, products})
        if(!stockItems || !products) return [];
        return stockItems.map((stockItem: Stock) => { 
          const product = products.find(product => product.id === stockItem.product);
          const {name, picture} = product ? product : {name: '', picture: ''};
          return {
          id: stockItem.id ?? '',
          name,
          amount: stockItem.amount,
          description: '',
          imageUrl$: this.imageService.getImageUrl(picture)  
        }
      })
      })
    )
  )
  currentPage = signal(1);

  currentItems = computed(() => {
    const start = this.start() - 1;
    const end = this.end();
    return this.stockItems()?.slice(start, end) ?? [];
  })
  start = computed(() => {
    const {itemsPerPage} = this.pager();
    const currentPage = this.currentPage();
    const initStart =  (currentPage - 1) * itemsPerPage + 1;
    const itemsLength = this.stockItems()?.length ?? 0;
    return itemsLength === 0 ? 0 :initStart 
  });
  end = computed(() => {
    const {itemsPerPage} = this.pager();
    const currentPage = this.currentPage();
    const maxEnd = (currentPage - 1) * itemsPerPage + itemsPerPage;
    const itemsLength = this.stockItems()?.length ?? 0;
    return maxEnd > itemsLength ? itemsLength : maxEnd;
  });

  pager = computed(() => {
    const defaultPager = {items: 0, itemsPerPage: 5, currentPage: 1};
    if(!this.stockItems()) return defaultPager;
    return {
      items: this.stockItems()?.length ?? 0,
      itemsPerPage: 3
  }})
  itemPages = computed(() => {
    const {items, itemsPerPage} = this.pager();
    const amount = Math.ceil(items / itemsPerPage);
    return Array.from({length: amount}, (_, i) => i + 1);
  });
  changePage(page: number){
    this.currentPage.update(() => page);
  }
  hasPrevious = computed(() => {
    return this.currentPage() > 1;
  });
  hasNext = computed(() => {
    return this.currentPage() < this.itemPages().length;
  });
}