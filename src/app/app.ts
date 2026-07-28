import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavCmp } from './component/nav-cmp/nav-cmp';
import { Hero } from './component/hero/hero';
import { Container } from './component/container/container';
import { FormCmp } from './component/form-cmp/form-cmp';
import { FooterCmp } from './component/footer-cmp/footer-cmp';

@Component({
  selector: 'app-root',
  imports: [NavCmp, Hero, Container, FormCmp, FooterCmp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ase-de-la-cruz');
}
