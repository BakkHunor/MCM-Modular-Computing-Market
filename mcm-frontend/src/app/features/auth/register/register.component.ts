import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  submit(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.message = 'Kérlek töltsd ki az emailt és a jelszót.';
      return;
    }
    if (this.password !== this.password2) {
      this.message = 'A két jelszó nem egyezik.';
      return;
    }
    this.message = 'Frontend demo: itt majd a backend API hívás lesz (register).';
  }
}
