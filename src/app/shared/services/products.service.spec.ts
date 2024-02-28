import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./products.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

const productsMock = [
    {
        "id": "trj-crd-visa",
        "name": "Tarjetas de Credito",
        "description": "Tarjeta de consumo bajo la modalidad de credito",
        "logo": "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2024-02-01T00:00:00.000+00:00"
    },
    {
        "id": "ahor",
        "name": "Cuenta de ahorros",
        "description": "Registro de cuentas de ahorro",
        "logo": "https://micuenta.pichincha.com/onb-mfa-login/8c20d69b26237c1a39ba.png",
        "date_release": "2024-02-27T00:00:00.000+00:00",
        "date_revision": "2025-02-27T00:00:00.000+00:00"
    },
    {
        "id": "test",
        "name": "Item Test",
        "description": "Descripcion del item test",
        "logo": "https://www.bolsadequito.com/images/2018/06/05/LOGO-BANCO-PICHINCHA-min.jpg",
        "date_release": "2024-02-27T00:00:00.000+00:00",
        "date_revision": "2025-02-27T00:00:00.000+00:00"
    }
];

const httpClientMock = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
};

describe('ProductsService', () => {
    let service: ProductsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductsService,
                { provide: HttpClient, useValue: httpClientMock}
            ]
        });
        service = TestBed.inject(ProductsService);
        httpClientMock.get.mockReturnValue(productsMock);
    });

    it('getProducts http have been called', () => {
        service.getProducts();
        expect(httpClientMock.get).toHaveBeenCalled();
    });       
    it('getProducts return ProductsList', () => {
        httpClientMock.get.mockReturnValue(of(productsMock));
        service.getProducts().subscribe(res => {
            expect(res.length).toBe(3);
        });
    });   

    it('getValidProducts return a valid product ID', () => {
        httpClientMock.get.mockReturnValue(of(true));
        service.getValidProducts("card").subscribe(res => {
            expect(res).toBe(true);
        });
    });
    it('postProducts valid create new product', () => {
        httpClientMock.post.mockReturnValue(of(productsMock[0]));
        let data = {
            "id": "trj-crd-visa",
            "name": "Tarjetas de Credito",
            "description": "Tarjeta de consumo bajo la modalidad de credito",
            "logo": "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png",
            "date_release": "2023-02-01T00:00:00.000+00:00",
            "date_revision": "2024-02-01T00:00:00.000+00:00"
        };
        service.postProducts(data).subscribe(res => {
            expect(res).toBe(productsMock[0]);
        });
    });
    it('putProducts update product', () => {
        httpClientMock.put.mockReturnValue(of(productsMock[0]));
        let data = {
            "id": "trj-crd-visa",
            "name": "Tarjetas de Credito",
            "description": "Tarjeta de consumo bajo la modalidad de credito",
            "logo": "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png",
            "date_release": "2023-02-01T00:00:00.000+00:00",
            "date_revision": "2024-02-01T00:00:00.000+00:00"
        };
        service.putProducts(data).subscribe(res => {
            expect(res).toBe(productsMock[0]);
        });
    });
    it('deleteProducts check if deleted', () => {
        httpClientMock.delete.mockReturnValue(of("Not product found with that id"));
        service.deleteProducts("trj-crd-visa").subscribe(res => {
            expect(res).toBe("Not product found with that id");
        });
    });
});
