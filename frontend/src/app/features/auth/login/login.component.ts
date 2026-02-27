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
  email = '';
  password = '';
  remember = true;
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (!this.email.trim()) {
      this.message = 'Add meg az email címet.';
      return;
    }
    if (!this.password) {
      this.message = 'Add meg a jelszót.';
      return;
    }
    this.auth.login(this.email.trim(), this.remember);
    this.router.navigate(['/profile']);
  }
}
