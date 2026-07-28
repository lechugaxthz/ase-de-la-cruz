import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-cmp',
  imports: [],
  templateUrl: './nav-cmp.html',
  styleUrl: './nav-cmp.css',
})
export class NavCmp {
  isMenuOpen: boolean = false;

  links: Array<{ id: number; tag: string; route: string }> = [
    { id: 0, tag: 'Nosotros', route: '/Nosotros' },
    { id: 1, tag: 'Servicios', route: '/Servicios' },
    { id: 2, tag: 'Testimonios', route: '/Testimonios' },
    { id: 3, tag: 'Contacto', route: '/Contacto' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
