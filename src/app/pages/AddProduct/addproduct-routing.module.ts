import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsService } from "../../shared/services/products.service";
import { AddProductComponent } from "./addproduct.component";
import { AddProductModule } from "./addproduct.module";

const routes: Routes = [
    { 
        path: '', 
        component: AddProductComponent
    },
    {
        path: ':id',
        component: AddProductComponent
    },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes), AddProductModule],
    providers: [
        ProductsService
    ],
    exports: [RouterModule]
})
export class AddProductRoutingModule {}