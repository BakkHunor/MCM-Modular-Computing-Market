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
  email = '';
  password = '';
  password2 = '';
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
    if (this.password !== this.password2) {
      this.message = 'A két jelszó nem egyezik.';
      return;
    }
    // UI-only: profil létrehozása (backend/db nélkül)
    this.auth.register(this.email.trim());
    this.router.navigate(['/profile']);
  }
}
