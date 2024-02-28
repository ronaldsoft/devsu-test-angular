import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { ActionEvent, Columns, Item, MenuOption } from "../../interfaces/tabla.interface";
import { ProductsService } from "../../shared/services/products.service";
import { Product, selectedItem } from "../../interfaces/products.interface";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    @ViewChild("content", { static: true }) content!: ElementRef;
    options = Array.from({ length: 4 }, (_, index) => (index + 1) * 5);
    selectedValue: number = this.options[0];
    dropdownActive: string | null = null;
    searchTerm: string = '';
    data: Item[] = [];
    filteredData: Item[] = [];
    selectedItem: selectedItem = {id: '', name: ''};

    columms: Columns[] = [
        {name: "Logo", haveInfo: false, msgInfo: ""},
        {name: "Nombre del producto", haveInfo: false, msgInfo: ""},
        {name: "Descripción", haveInfo: true, msgInfo: ""},
        {name: "Fecha de liberación", haveInfo: true, msgInfo: ""},
        {name: "Fecha de reestructuración", haveInfo: true, msgInfo: ""}
    ]

    tableMenuOptions: MenuOption[] = [
        { label: 'Editar', action: 'edit' },
        { label: 'Eliminar', action: 'delete' },
    ];

    constructor(private productsService: ProductsService, 
        private router: Router, 
        private route: ActivatedRoute) {}

    async ngOnInit() {
        await this.fetchProducts();
    }
    async ngAfterViewInit() {

    }
    onChange(event: any) {
        // Obtener el valor seleccionado
        this.selectedValue = event.target.value;
    }

    toggleDropdown(itemId: string): void {
        this.dropdownActive = this.dropdownActive === itemId ? null : itemId;
    }

    async fetchProducts(): Promise<void> {
        this.productsService.getProducts().subscribe({
            next: (data: Product[]) => {
                this.data = data.map(value => {
                    return {id: value.id, values: [value.logo, value.name, value.description, this.formattedDate(value.date_release), this.formattedDate(value.date_revision)] }
                });
                this.filteredData = this.data;
            },
            error: error => {
                console.error('fetchProducts error', error);
            }
        });
    }
    //búsqueda bruta, realiza una búsqueda lineal en el conjunto de datos
    onSearch() {
        this.filteredData = this.data.filter(item =>
          item.values.some(value => value.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
    }
    
    formattedDate(value: string) {
        const inputDate = new Date(value);
        const day = ('0' + inputDate.getDate()).slice(-2);
        const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
        const year = inputDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    buttonAddProduct () {
        this.router.navigate(['/addproduct']);
    }

    handleAction(event: ActionEvent) {
        // Manejar la acción según sea necesario
        if(event.action == "edit") {
            this.router.navigate([`/addproduct/${event.data}`]);   
        }
        if(event.action == "delete") {
            this.selectedItem = {
                id: event.data,
                name: this.data.filter(x => x.id ===  event.data)[0].values[1]
            };
            this.openModal();
        }
    }
    openModal() {
        this.content.nativeElement.style.display = 'block';
    }
  
    closeModal() {
        this.content.nativeElement.style.display = 'none';
    }
    
    deleteItem () {
        this.productsService.deleteProducts(this.selectedItem.id).subscribe({
            next: (data) => {
                console.log("this item was deleted", data);
                this.filteredData = this.filteredData.filter(value => value.id !== this.selectedItem.id);
                this.closeModal();
            },
            error: error => {
                console.error('error', error);
            }
        });
    }
    // Close the modal if clicked outside of it
    @HostListener('window:click', ['$event'])
    closeModalOutside(event: Event) {
        if (event.target === this.content.nativeElement) {
            this.closeModal();
        }
    }
}