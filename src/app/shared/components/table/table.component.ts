import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionEvent, Columns, Item, MenuOption } from '../../../interfaces/tabla.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() columms: Columns[] = [];
  @Input() data: Item[] = [];
  @Input() lengthShow: number = 5;
  @Input() menuOptions: MenuOption[] = [];
  @Output() actionPerformed = new EventEmitter<ActionEvent>();
  
  dropdownActive: string | null = null;
  options = Array.from({ length: 4 }, (_, index) => (index + 1) * this.lengthShow);
  selectedValue: number = this.options[0];
  
  onChange(event: any) {
    // Obtener el valor seleccionado
    this.selectedValue = event.target.value;
  }

  toggleDropdown(itemId: string): void {
    this.dropdownActive = this.dropdownActive === itemId ? null : itemId;
  }

  isImageUrl(url: string) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
  
    const lowerCaseUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerCaseUrl.endsWith(ext))? true : false;
  }
  
  performAction(action: string, data: any) {
    this.actionPerformed.emit({ action, data });
  }

  modificar(item: string): void {
    try {
      // Lógica para modificar
      console.log(`Modificar el item con ID ${item}`);
      this.dropdownActive = null;
      
    } catch(error) {
      console.log("modificar", error);
    }
  }

  eliminar(item: string): void {
    try {
      // Lógica para eliminar
      console.log(`Eliminar el item con ID ${item}`);
      this.dropdownActive = null;

    } catch(error) {
      console.log("eliminar", error);
    }
  }
}
