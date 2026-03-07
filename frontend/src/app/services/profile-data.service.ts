import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  additionalInfo?: string;
  city: string;
  postcode: string;
  phone?: string;
}

export interface OrderItemDto {
  id: number;
  productId: number;
  productName?: string;
  quantity: number;
  price: number;
  type?: string;
}

export interface OrderDto {
  id: number;
  total_price: number;
  tax: number;
  createdAt: string;
  hasHardware: boolean;
  email?: string;

  first_name?: string;
  last_name?: string;
  address_line?: string;
  additional_info?: string;
  city?: string;
  zip_code?: string;
  phone?: string;

  items?: OrderItemDto[];
}

@Injectable({ providedIn: 'root' })
export class ProfileDataService {
  private base = '/api';

  constructor(private http: HttpClient) {}

  getShippingAddress(): Observable<ShippingAddress | null> {
    return this.http.get<ShippingAddress | null>(`${this.base}/profile/address`);
  }

  saveShippingAddress(payload: ShippingAddress): Observable<any> {
    return this.http.put(`${this.base}/profile/address`, payload);
  }

  getMyOrders(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.base}/orders/mine`);
  }
}
