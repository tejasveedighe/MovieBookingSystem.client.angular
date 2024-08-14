import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Movie } from '../../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  @Input() Movie: Movie | undefined;
}
