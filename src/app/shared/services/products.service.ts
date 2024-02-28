import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../interfaces/products.interface";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    // http = inject(HttpClient);
    constructor(private http: HttpClient) { }

      // Define your custom headers
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorId': 20
    });

    // Specify headers as part of the request options
    requestOptions = {
        headers: this.headers
    };

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(environment.rootService + 'bp/products', this.requestOptions);
    }

    getValidProducts(id: string): Observable<boolean> {
        return this.http.get<boolean>(environment.rootService + `bp/products/verification?id=${id}`, this.requestOptions);
    }

    postProducts(data: Product): Observable<Product> {
        return this.http.post<Product>(environment.rootService + 'bp/products', data, this.requestOptions);
    }

    putProducts(data: Product): Observable<Product[]> {
        return this.http.put<Product[]>(environment.rootService + 'bp/products', data, this.requestOptions);
    }

    deleteProducts(id: string): Observable<string> {
        return this.http.delete(environment.rootService + `bp/products?id=${id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'text/plain',
                'authorId': 20,
            }),
            responseType: 'text',      
        });
    }
}