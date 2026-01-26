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
  accept = false;
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (!this.email.trim()) {
      this.message = 'Add meg az email címet.';
      return;
    }
    if (!this.accept) {
      this.message = 'Fogadd el a feltételeket.';
      return;
    }
    this.auth.register(this.email.trim());
    this.router.navigate(['/profile']);
  }
}
