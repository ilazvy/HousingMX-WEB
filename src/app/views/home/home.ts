import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { PropertyService } from '../../services/property';

@Component({  
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './home.html',
 })
export class Home implements OnInit {
  properties: any[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe({
      next: (data) => this.properties = data,
      error: (err) => console.error('Error:', err)
    });
  }
}
