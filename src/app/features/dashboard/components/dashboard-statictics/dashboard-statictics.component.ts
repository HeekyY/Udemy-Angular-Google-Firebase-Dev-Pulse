import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-statictics',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-statictics.component.html',
  styleUrl: './dashboard-statictics.component.css'
})
export class DashboardStaticticsComponent {

  value = input.required<number>();
  labelDescription = input.required<string>();

}
