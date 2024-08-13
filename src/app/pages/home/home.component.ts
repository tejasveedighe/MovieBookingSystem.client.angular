import { Component } from '@angular/core';
import { MoviesSearchComponent } from '../../components/movies-search/movies-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MoviesSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
