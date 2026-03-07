import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ProfileDataService, ShippingAddress, OrderDto } from '../../services/profile-data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any = null;

  address: ShippingAddress = {
    firstName: '',
    lastName: '',
    address: '',
    additionalInfo: '',
    city: '',
    postcode: '',
    phone: ''
  };

  saving = false;
  saveMsg: string | null = null;
  saveErr: string | null = null;

  orders: OrderDto[] = [];
  ordersLoading = true;
  ordersErr: string | null = null;

  constructor(
    private auth: AuthService,
    private profileData: ProfileDataService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadAddress();
    this.loadOrders();
  }

  private loadUser() {
    this.auth.fetchProfile().subscribe({
      next: (res: any) => { this.user = res?.user ?? null; },
      error: () => { this.user = null; }
    });
  }

  private loadAddress() {
    this.profileData.getShippingAddress().subscribe({
      next: (addr) => { if (addr) this.address = { ...this.address, ...addr }; },
      error: () => { }
    });
  }

  private loadOrders() {
    this.ordersLoading = true;
    this.profileData.getMyOrders().subscribe({
      next: (orders) => {
        this.orders = (orders ?? []);
        this.ordersLoading = false;
      },
      error: () => {
        this.ordersErr = 'Nem sikerült betölteni a rendeléseket.';
        this.ordersLoading = false;
      }
    });
  }

  saveAddress() {
    this.saveMsg = null;
    this.saveErr = null;
    this.saving = true;
    this.profileData.saveShippingAddress(this.address).subscribe({
      next: () => {
        this.saveMsg = 'Szállítási adatok elmentve.';
        this.saving = false;
      },
      error: () => {
        this.saveErr = 'Nem sikerült menteni. Próbáld újra.';
        this.saving = false;
      }
    });
  }

  trackById(_: number, o: any) { return o?.id; }
}
