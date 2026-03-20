import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  searchQuery: string = '';

  constructor(private router: Router) {}

  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    
    if (this.searchQuery.trim()) {
      // Navegar a propiedades con query parameter
      this.router.navigate(['/propiedades'], {
        queryParams: { search: this.searchQuery }
      });
    }
  }
}