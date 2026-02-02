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
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.message = '';

    const username = this.username.trim();
    const email = this.email.trim();

    if (!username) {
      this.message = 'Add meg a felhasználónevet.';
      return;
    }
    if (!email) {
      this.message = 'Add meg a Gmail címet.';
      return;
    }
    if (!/@gmail\.com$/i.test(email)) {
      this.message = 'Csak Gmail cím használható (pl. valami@gmail.com).';
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

    this.auth.register({ username, email, password: this.password }).subscribe({
      next: () => {
        // A TI backendetek jelenleg a regisztrációnál nem ad vissza tokent,
        // ezért regisztráció után a belépés oldalra dobunk.
        this.router.navigate(['/login'], { queryParams: { u: username } });
      },
      error: (err) => {
        const msg = err?.error?.message || err?.message || 'Nem sikerült a regisztráció.';
        this.message = msg;
      }
    });
  }
}
