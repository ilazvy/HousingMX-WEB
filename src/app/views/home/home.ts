import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { PropertyService } from '../../services/property';

@Component({  
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
 })
export class Home implements OnInit {
  properties: any[] = [];

  constructor(
    private propertyService: PropertyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  private loadProperties(): void {
    // Cargar solo las primeras 6 propiedades para la vista de inicio
    this.propertyService.getProperties({ per_page: 6 }).subscribe({
      next: (data) => {
        // La respuesta de paginación tiene la estructura: { data: [...], current_page, total, last_page }
        this.properties = data.data || data;
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
}
