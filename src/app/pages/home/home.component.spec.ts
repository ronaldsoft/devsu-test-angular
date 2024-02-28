import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductsService } from '../../shared/services/products.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productsServiceMock: { getProducts: jest.Mock; deleteProducts: jest.Mock };
  const mockProducts = [{ id: '1', logo: 'logo1', name: 'Product 1' }];

  beforeEach(() => {
    productsServiceMock = {
      getProducts: jest.fn(() => of(mockProducts)),
      deleteProducts: jest.fn(() => of("Not product found with that id")),
    };

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: ActivatedRoute, useValue: {} },
      ],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set selectedValue on onChange', () => {
    const mockEvent = { target: { value: 'mockValue' } } as any;

    component.onChange(mockEvent);

    expect(component.selectedValue).toBe('mockValue');
  });

  it('should toggle dropdownActive on toggleDropdown', () => {
    const itemId = 'exampleId';

    component.toggleDropdown(itemId);

    expect(component.dropdownActive).toBe(itemId);

    component.toggleDropdown(itemId);

    expect(component.dropdownActive).toBeNull();
  });

  it('should fetch products on ngOnInit', async () => {
    const mockProducts = [{ id: '1', logo: 'logo1', name: 'Product 1' }];
    productsServiceMock.getProducts.mockReturnValue(of(mockProducts));

    await component.ngOnInit();

    expect(component.data.length).toBe(1);
    expect(component.filteredData.length).toBe(1);
    expect(productsServiceMock.getProducts).toHaveBeenCalled();
  });
});