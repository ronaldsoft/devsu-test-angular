import { spyOn } from 'jest-mock';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;

  beforeEach(() => {
    // Configuración inicial antes de cada prueba
    component = new TableComponent();
  });

  it('should set selectedValue on onChange', () => {
    const mockEvent = { target: { value: 'mockValue' } } as any;
    component.onChange(mockEvent);
    expect(component.selectedValue).toBe('mockValue');
  });

  it('should toggle dropdownActive on toggleDropdown', () => {
    component.toggleDropdown('itemId1');
    expect(component.dropdownActive).toBe('itemId1');
    component.toggleDropdown('itemId1');
    expect(component.dropdownActive).toBeNull();
  });

  it('should return true for valid image URL', () => {
    const imageUrl = 'https://example.com/image.jpg';
    const result = component.isImageUrl(imageUrl);
    
    expect(result).toBeTruthy();
  });

  it('should return false for invalid image URL', () => {
    const nonImageUrl = 'https://example.com/document.pdf';
    const result = component.isImageUrl(nonImageUrl);
    
    expect(result).toBeFalsy();
  });
  it('should emit actionPerformed event on performAction', () => {
    const spyEmit = spyOn(component.actionPerformed, 'emit');
    const mockData = { id: 1, name: 'Example' };

    component.performAction('edit', mockData);

    expect(spyEmit).toHaveBeenCalledWith({ action: 'edit', data: mockData });
  });

  it('should call console.log on modificar', () => {
    const spyConsoleLog = spyOn(console, 'log');
    const itemId = 'exampleId';
    component.modificar(itemId);
    expect(spyConsoleLog).toHaveBeenCalledWith(`Modificar el item con ID ${itemId}`);
    expect(component.dropdownActive).toBeNull();
    spyConsoleLog.mockRestore();
  });

  it('should call console.log on eliminar', () => {
    const spyConsoleLog = spyOn(console, 'log');
    const itemId = 'exampleId';
    component.eliminar(itemId);
    expect(spyConsoleLog).toHaveBeenCalledWith(`Eliminar el item con ID ${itemId}`);
    expect(component.dropdownActive).toBeNull();
    spyConsoleLog.mockRestore();
  });
});