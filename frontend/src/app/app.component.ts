import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { CartDrawerComponent } from './shared/cart-drawer/cart-drawer.component';
import { ToastComponent } from './shared/toast/toast.component';
@Component({
 selector: 'app-root',
 standalone: true,
 imports: [RouterOutlet, RouterLink, HeaderComponent, CartDrawerComponent, ToastComponent],
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css'],
})
export class AppComponent {
 title = 'mcm-frontend';
}
