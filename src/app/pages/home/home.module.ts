import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from "../../shared/components/table/table.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [HomeComponent, TableComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule
    ]
})
export class HomeModule {}