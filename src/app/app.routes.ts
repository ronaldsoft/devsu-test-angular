import { Routes } from '@angular/router';
import { HomeRoutingModule } from './pages/home/home-routing.module';
import { AddProductRoutingModule } from './pages/AddProduct/addproduct-routing.module';

export const routes: Routes = [
        { 
                path: '', 
                loadChildren: () => HomeRoutingModule
        },
        {
                path: 'addproduct',
                loadChildren: () => AddProductRoutingModule
        }
];