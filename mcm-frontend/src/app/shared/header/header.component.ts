import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchTerm = '';

  constructor(private router: Router) {}

  onSearch(): void {
    const q = this.searchTerm.trim();
    if (!q) return;
    this.router.navigate(['/search'], { queryParams: { q } });
  }
}
