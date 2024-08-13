import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import axios from 'axios';
import { url } from '../../constants';
import { MovieComponent } from '../movie/movie.component';
import { Movie } from '../../types';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-movies-search',
  standalone: true,
  imports: [MovieComponent, NgFor],
  templateUrl: './movies-search.component.html',
  styleUrl: './movies-search.component.css',
})
@Injectable({ providedIn: 'root' })
export class MoviesSearchComponent {
  movies$: Movie[] | undefined;
  total: number = 0;
  moviesPerPage: number = 10; // Number of movies per page
  currentPage: number = 1; // Current page
  totalPages: number = 0;

  ngOnInit() {
    this.getAllMovies();
  }

  async getAllMovies(page: number = this.currentPage) {
    try {
      const res = await axios.get(
        `${url}Movies?page=${page}&limit=${this.moviesPerPage}`
      );
      this.movies$ = res.data.data;
      this.total = res.data.totalMovies;
      this.totalPages = Math.ceil(this.total / this.moviesPerPage);
    } catch (error) {
      console.log(error);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getAllMovies(page);
  }
}
