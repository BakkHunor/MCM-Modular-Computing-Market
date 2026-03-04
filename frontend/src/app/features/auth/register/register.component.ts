import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
 selector: 'app-register',
 standalone: true,
 imports: [CommonModule, FormsModule, RouterModule],
 templateUrl: './register.component.html',
 styleUrl: './register.component.css',
})
export class RegisterComponent {
 username = '';
 email = '';
 password = '';
 password2 = '';
 remember = true;
 message = '';
 constructor(private auth: AuthService, private router: Router) {}
 submit(): void {
 if (!this.username.trim()) {
 this.message = 'Add meg a felhasználónevet.';
 return;
 }
 if (!this.email.trim()) {
 this.message = 'Add meg az email címet.';
 return;
 }
 if (!this.password) {
 this.message = 'Add meg a jelszót.';
 return;
 }
 if (this.password !== this.password2) {
 this.message = 'A két jelszó nem egyezik.';
 return;
 }
 this.message = '';
 this.auth.register(this.username.trim(), this.email.trim(), this.password, this.remember).subscribe({
   next: () => this.router.navigate(['/profile']),
   error: (err) => {
     this.message = err?.error?.message || 'Sikertelen regisztráció.';
   },
 });
 }
}
