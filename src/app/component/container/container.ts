import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  imports: [],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container {
  @Input() interactive: boolean = false;
}
