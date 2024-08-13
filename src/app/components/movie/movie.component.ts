import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Movie } from '../../types';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: "./movie.component.css"
})
export class MovieComponent {
  @Input() Movie: Movie | undefined;
}
