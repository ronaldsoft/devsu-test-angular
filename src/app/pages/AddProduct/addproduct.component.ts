import { Component, ElementRef, ViewChild } from "@angular/core";
import { Columns, Item } from "../../interfaces/tabla.interface";
import { ProductsService } from "../../shared/services/products.service";
import { Product } from "../../interfaces/products.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-add-product',
    templateUrl: './addproduct.component.html',
    styleUrls: ['./addproduct.component.scss']
})

export class AddProductComponent {
    addProduct: FormGroup;
    validID: boolean = false;
    pathID: string = '';
    @ViewChild("content", { static: true }) content: ElementRef | undefined;
    
    constructor(
        private productsService: ProductsService,
        private router: Router, 
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {
        this.addProduct = this.formBuilder.group({
            ID: ['', Validators.required],
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            logo: ['', [Validators.required]],
            "date-release": [this.getCurrentDate(), [Validators.required]],
            "date-revision": [{ value: '', disabled: true }, [Validators.required]],
        });
        this.updateRevisionDate();
        // Listen for changes in the date-release
        this.addProduct.get('date-release')?.valueChanges.subscribe(() => {
            this.updateRevisionDate();
        });
        this.addProduct.get('ID')?.valueChanges.subscribe((value) => {
            if(this.pathID == '' ||  this.pathID == undefined) {
                this.validIDService(value);
            }
        });
        this.route.params.subscribe(param => {
            this.pathID = param["id"];
            this.addProduct.get('ID')?.setValue(param["id"]);
        });
    }
    isIdDisabled() {
        if(this.pathID == '' ||  this.pathID == undefined) {
            return null;
        } else {
            return true;
        }
    }
    submitForm() {
        if (this.addProduct.valid) {
            let data: Product = {
                id: this.addProduct.value.ID,
                name: this.addProduct.value.name,
                logo: this.addProduct.value.logo,
                description: this.addProduct.value.description,
                date_release: this.addProduct.get("date-release")?.value,
                date_revision: this.addProduct.get("date-revision")?.value
            };
            if (this.pathID) {
                this.productsService.putProducts(data).subscribe({
                    next: (data: Product[]) => {
                        if (data) {
                            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                                this.router.navigate(['/']);
                            });
                        }
                    },
                    error: error => {
                        console.error('error', error);
                    }
                });
            } else {
                this.productsService.postProducts(data).subscribe({
                    next: (data: Product) => {
                        if (data) {
                            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                                this.router.navigate(['/']);
                            });
                        }
                    },
                    error: error => {
                        console.error('error', error);
                    }
                });
            }
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

    hasRequired(name: string) {
        const control = this.addProduct.get(name);
        return control?.hasError('required') && control.touched;
    }

    getCurrentDate(): string {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    updateRevisionDate() {
        const dobValue = this.addProduct.get("date-release")?.value;
        if (dobValue) {
          const dobDate = new Date(dobValue);
          dobDate.setFullYear(dobDate.getFullYear() + 1);
          this.addProduct.get('date-revision')?.setValue(dobDate.toISOString().split('T')[0]);
        }
    }

    validIDService (value: string) {
        this.productsService.getValidProducts(value).subscribe({
            next: (data) => {
                if (data) {
                    this.validID = true;
                } else {
                    this.validID = false;
                }
            },
            error: error => {
                console.error('error', error);
            }
        });
    }

    resetForm() {
        this.addProduct.reset();
    }
}