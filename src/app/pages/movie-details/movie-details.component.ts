import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import axios from 'axios';
import { url } from '../../constants';
import { Movie } from '../../types';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movieId: number = -1;
  movie: Movie | undefined;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    this.getMovieDetails();
  }

  async getMovieDetails() {
    try {
      const res = await axios.get(url + 'Movies/' + this.movieId);
      this.movie = res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
