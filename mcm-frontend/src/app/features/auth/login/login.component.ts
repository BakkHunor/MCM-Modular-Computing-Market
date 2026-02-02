import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((p) => {
      const u = p['u'];
      if (typeof u === 'string' && u.trim()) {
        this.username = u.trim();
      }
    });
  }

  submit(): void {
    this.message = '';
    if (!this.username.trim()) {
      this.message = 'Add meg a felhasználónevet.';
      return;
    }
    if (!this.password) {
      this.message = 'Add meg a jelszót.';
      return;
    }

    this.auth
      .login({ username: this.username.trim(), password: this.password, remember: this.remember })
      .subscribe({
        next: () => {
          // opcionális: frissítjük a profil adatot a /api/profile-ból
          this.auth.refreshProfile().subscribe();
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          const msg = err?.error?.message || err?.message || 'Nem sikerült a belépés.';
          this.message = msg;
        }
      });
  }
}
