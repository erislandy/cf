import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from "@cf/directus-infrastructure";
import { ImageService } from "@cf/shared";
import { Currency, EntityType, GenericUseCase, Operation, StoreProduct, Transaction } from "@cf/store-domain";
import { DxButtonModule, DxDataGridModule } from "devextreme-angular";

@Component({
    selector: 'cf-inbound-create',
    standalone: true,
    imports: [
      CommonModule, 
      RouterOutlet,
      DxDataGridModule,
      DxButtonModule
    ],
    templateUrl: './inbound-create.component.html',
    styleUrl: './inbound-create.component.scss',
  })
export class InboundCreateComponent{
  //Services
  productService = inject(GenericUseCase<StoreProduct>);
  imageService = inject(ImageService);
  operationService = inject(GenericUseCase<Operation>);
  router = inject(Router);
  authService = inject(AuthService);

  transactions: Array<Transaction> = [];
  products = toSignal<Array<StoreProduct>>(this.productService.getGenerics(EntityType.PRODUCT));
  currency = toSignal<Array<Currency>>(this.productService.getGenerics(EntityType.CURRENCY));
  async createInbound(){
    console.log('create inbound');
    const user = await this.authService.getCurrenntUser();
    this.operationService.createGeneric({
      entityType: EntityType.OPERATION,
      employee: user.id,
      operation_type: "inbound"
    })
    this.router.navigate(['dashboard','inbound']);
  }
  cancel(){
    this.router.navigate(['dashboard','inbound']);
  }
}