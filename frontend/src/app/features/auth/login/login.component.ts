import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
 selector: 'app-login',
 standalone: true,
 imports: [CommonModule, FormsModule, RouterModule],
 templateUrl: './login.component.html',
 styleUrl: './login.component.css',
})
export class LoginComponent {
 username = '';
 password = '';
 remember = true;
 message = '';
 constructor(private auth: AuthService, private router: Router) {}
 submit(): void {
 if (!this.username.trim()) {
 this.message = 'Add meg a felhasználónevet.';
 return;
 }
 if (!this.password) {
 this.message = 'Add meg a jelszót.';
 return;
 }
 this.message = '';
 this.auth.login(this.username.trim(), this.password, this.remember).subscribe({
   next: () => this.router.navigate(['/profile']),
   error: (err) => {
     this.message = err?.error?.message || 'Sikertelen bejelentkezés.';
   },
 });
 }
}
