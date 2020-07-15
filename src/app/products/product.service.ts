import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      map((data: IProduct[]) => data.find(elem => elem.productId === id)),
      catchError(err => this.handleError(err)));
  }

  private handleError(err: Error): Observable<never> {
    let errorMessage = '';
    const errorResponse = err as HttpErrorResponse;
    const errorResponseMessage = errorResponse.error.message;
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${errorResponseMessage}`;
    } else {
      errorMessage =
        `Server returned code: ${errorResponse.status}, error message is: ${errorResponseMessage}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
