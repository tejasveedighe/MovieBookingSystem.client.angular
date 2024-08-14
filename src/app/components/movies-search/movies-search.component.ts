import { NgFor } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import axios from 'axios';
import { url } from '../../constants';
import { Movie } from '../../types';
import { MovieComponent } from '../movie/movie.component';
import { MovieCardHorizontalComponent } from '../movie-card-horizontal/movie-card-horizontal.component';

@Component({
  selector: 'app-movies-search',
  standalone: true,
  imports: [MovieComponent, NgFor, MovieCardHorizontalComponent],
  templateUrl: './movies-search.component.html',
  styleUrl: './movies-search.component.css',
})
@Injectable({ providedIn: 'root' })
export class MoviesSearchComponent {
  movies$: Movie[] | undefined;
  filteredMovies: Movie[] | undefined;
  total: number = 0;
  moviesPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;

  genres: string[] = [''];
  filter: { genres: string[] } = {
    genres: [],
  };

  clearFilter() {
    this.filter = {
      genres: [],
    };
    this.filteredMovies = this.movies$;
  }

  addGenreFilter(genre: string) {
    const normalizedGenre = genre.toLowerCase();

    if (
      this.filter.genres &&
      this.filter.genres?.length > 0 &&
      this.filter.genres.includes(normalizedGenre)
    ) {
      this.filter.genres = this.filter.genres.filter(
        (g) => g !== normalizedGenre
      );
    } else {
      this.filter.genres.push(normalizedGenre);
    }

    if (this.filter.genres.length > 0) {
      this.filteredMovies = this.movies$?.filter((movie) =>
        this.filter.genres.includes(movie.genre.toLowerCase())
      );
    } else {
      this.filteredMovies = this.movies$;
    }
  }

  ngOnInit() {
    this.getAllMovies().then(() => this.getGenresFromMovies());
  }

  getGenresFromMovies() {
    if (this.movies$ && this.movies$.length > 0) {
      this.genres = Array.from(
        new Set(this.movies$.map((movie) => movie.genre))
      );
    }
  }

  async getAllMovies(page: number = this.currentPage) {
    try {
      const res = await axios.get(
        `${url}Movies?page=${page}&limit=${this.moviesPerPage}`
      );
      this.movies$ = res.data.data;
      this.filteredMovies = res.data.data;
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
