import {HttpClient, HttpParams} from '@angular/common/http';
import {Cart} from './model';
import {Injectable} from '@angular/core';

@Injectable()
export class CartService {

  constructor(private http: HttpClient) { }

  loadCart(name: string): Promise<Cart> {
    const params = new HttpParams()
      .set('name', name);
    return (
      this.http.get<Cart>('api/cart', { params: params })
        .toPromise()
    )
  }

  saveCart(cart: Cart): Promise<boolean> {
    return (
      this.http.post<boolean>('api/cart', cart)
        .toPromise()
        .then(() => true )
    );
  }

}
