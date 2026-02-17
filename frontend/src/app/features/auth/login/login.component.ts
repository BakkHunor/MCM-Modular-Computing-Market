import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  remember = true;

  message = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.message = '';

    const username = this.email.trim();
    if (!username) {
      this.message = 'Add meg a felhasználónevet.';
      return;
    }
    if (!this.password) {
      this.message = 'Add meg a jelszót.';
      return;
    }

    this.loading = true;

    this.auth.login(username, this.password, this.remember).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/profile']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        const backendMsg = (err.error as any)?.message;
        this.message = backendMsg ?? err.message ?? 'Sikertelen belépés.';
      },
    });
  }
}