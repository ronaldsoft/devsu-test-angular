import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HomeModule } from "./home.module";
import { ProductsService } from "../../shared/services/products.service";

const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent
    }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes), HomeModule],
    providers: [
        ProductsService
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule {}