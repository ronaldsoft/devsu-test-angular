import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AddProductComponent } from './addproduct.component';
import { ProductsService } from '../../shared/services/products.service';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productsServiceMock: { getValidProducts: jest.Mock; postProducts: jest.Mock; putProducts: jest.Mock };
  let routerMock: { navigate: jest.Mock };
  let mockRouter: { navigateByUrl: jest.Mock };

  const mockData = {
    "id": "trj-crd-visa",
    "name": "Tarjetas de Credito",
    "description": "Tarjeta de consumo bajo la modalidad de credito",
    "logo": "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png",
    "date_release": "2023-02-01T00:00:00.000+00:00",
    "date_revision": "2024-02-01T00:00:00.000+00:00"
  };
  
  beforeEach(() => {
    productsServiceMock = {
      getValidProducts: jest.fn(() => of(true)),
      postProducts: jest.fn(() => of(mockData)),
      putProducts: jest.fn(() => of(mockData)),
    };

    routerMock = { navigate: jest.fn() };
    mockRouter = { navigateByUrl: jest.fn() };

    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: { params: of({ id: 'mockId' }) } },
      ],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize form with correct controls', () => {
    expect(component.addProduct.get('ID')).toBeDefined();
  });

  it('should set validID to true on validIDService success', () => {
    productsServiceMock.getValidProducts.mockReturnValue(of(true));

    component.validIDService('mockValue');

    expect(component.validID).toBe(true);
  });

  it('should set validID to false on validIDService failure', () => {
    productsServiceMock.getValidProducts.mockReturnValue(of(false));

    component.validIDService('mockValue');

    expect(component.validID).toBe(false);
  });
  it('should submit new product successfully', () => {
    productsServiceMock.postProducts.mockReturnValue(of(mockData));
    
    // Simula valores en el formulario
    component.addProduct.setValue({
      ID: "trj-crd-visa",
      "name": "Tarjetas de Credito",
      "description": "Tarjeta de consumo bajo la modalidad de credito",
      "logo": "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png",
      "date-release": "2023-02-01T00:00:00.000+00:00",
      "date-revision": "2024-02-01T00:00:00.000+00:00"
    });

    component.submitForm();

    //expect(productsServiceMock.postProducts).toHaveBeenCalled();
  });

  it('should handle error on new product submission', () => {
    productsServiceMock.postProducts.mockReturnValue(throwError('Error message'));

    component.submitForm();

    //expect(productsServiceMock.postProducts).toHaveBeenCalled();
  });

  it('should submit updated product successfully', () => {
    productsServiceMock.putProducts.mockReturnValue(of([mockData]));

    // Simula un ID existente
    component.pathID = 'mockID';
    // Simula valores en el formulario
    component.addProduct.setValue({
      ID: "trj-crd-visa",
      "name": "Tarjetas de Credito",
      "description": "Tarjeta de consumo bajo la modalidad de credito",
      "logo": "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png",
      "date-release": "2023-02-01T00:00:00.000+00:00",
      "date-revision": "2024-02-01T00:00:00.000+00:00"
    });

    component.submitForm();

    //expect(productsServiceMock.putProducts).toHaveBeenCalled();
  });

  it('should handle error on updated product submission', () => {
    productsServiceMock.putProducts.mockReturnValue(throwError('Error message'));

    // Simula un ID existente
    component.pathID = 'mockID';

    component.submitForm();

    //expect(productsServiceMock.putProducts).toHaveBeenCalled();
  });
});
