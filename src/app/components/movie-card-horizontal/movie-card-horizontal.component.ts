import { Component, Input } from '@angular/core';
import { Movie } from '../../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card-horizontal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card-horizontal.component.html',
  styleUrl: './movie-card-horizontal.component.css',
})
export class MovieCardHorizontalComponent {
  @Input() Movie: Movie | undefined;
}
