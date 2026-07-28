import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-cmp',
  imports: [],
  templateUrl: './footer-cmp.html',
  styleUrl: './footer-cmp.css',
})
export class FooterCmp {
  anioActual = new Date().getFullYear();
}
