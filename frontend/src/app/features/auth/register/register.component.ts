import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
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

  message = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.message = '';

    const username = this.username.trim();
    const email = this.email.trim();

    if (!username) {
      this.message = 'Add meg a nevet (felhasználónevet).';
      return;
    }
    if (!email) {
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

    this.loading = true;

    this.auth.register(username, email, this.password).subscribe({
      next: () => {
        this.loading = false;
        // reg után login oldalra
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        const backendMsg = (err.error as any)?.message;
        this.message = backendMsg ?? err.message ?? 'Sikertelen regisztráció.';
      },
    });
  }
}