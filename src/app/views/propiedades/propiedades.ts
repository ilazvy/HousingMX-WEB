import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService, PropertyFilters } from '../../services/property';

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './propiedades.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropiedadesComponent implements OnInit {
  properties: any[] = [];
  
  // Filtros
  filters: PropertyFilters = {
    search: '',
    city: '',
    min_price: undefined,
    max_price: undefined,
    bedrooms: undefined,
    status: '',
    per_page: 10
  };

  // Paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  perPageOptions = [10, 20, 50];
  
  // Estados disponibles
  statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'available', label: 'Disponible' },
    { value: 'sold', label: 'Vendido' },
    { value: 'rented', label: 'Rentado' }
  ];

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Leer query parameters de búsqueda
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.filters.search = params['search'];
      }
      this.loadProperties();
    });
  }

  loadProperties(): void {
    this.propertyService.getProperties(this.filters).subscribe({
      next: (data) => {
        // La respuesta de paginación tiene la estructura: { data: [...], current_page, total, last_page }
        this.properties = data.data || data;
        this.currentPage = data.current_page || 1;
        this.totalPages = data.last_page || 1;
        this.totalItems = data.total || 0;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error cargando propiedades:', err)
    });
  }

  getStatusLabel(status: string): string {
    const statusMap: Record<string, string> = {
      'available': 'Disponible',
      'sold': 'Vendido',
      'rented': 'Rentado'
    };
    return statusMap[status] || status;
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadProperties();
  }

  changePerPage(newPerPage: number): void {
    this.filters.per_page = newPerPage;
    this.currentPage = 1;
    this.loadProperties();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Aquí iría el parámetro de página en la API si la soporta
      this.loadProperties();
    }
  }

  clearFilters(): void {
    this.filters = {
      search: '',
      city: '',
      min_price: undefined,
      max_price: undefined,
      bedrooms: undefined,
      status: '',
      per_page: 10
    };
    this.currentPage = 1;
    this.loadProperties();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxButtons = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(this.totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
