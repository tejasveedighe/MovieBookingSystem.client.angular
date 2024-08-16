import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import axios from 'axios';
import { url } from '../../constants';
import { Movie } from '../../types';
import { filter } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  standalone: true,
  imports: [RouterLink],
})
export class BookingsComponent implements OnInit {
  movieId: number = -1;
  movie: Movie | undefined;
  showTimesData: any;
  allShowDates: string[] | any = [];
  selectedDate: string | undefined;
  selectedDateShows: any[] = [];
  filteredShows: any[] | undefined;

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.movieId = this.router.snapshot.params['movieId'];
    this.getMovieDetails();
    this.getShowsByMovieId();
  }

  changeDate(date: string) {
    this.selectedDate = date;
  }

  async getMovieDetails(): Promise<void> {
    try {
      const res = await axios.get(`${url}Movies/${this.movieId}`);
      this.movie = res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getShowsByMovieId(): Promise<void> {
    try {
      const res = await axios.get(
        `${url}Shows/get-shows-by-movieId/${this.movieId}`
      );
      this.showTimesData = res.data;

      this.allShowDates = [
        ...new Set(
          this.showTimesData.flatMap((d: { shows: any[] }) =>
            d.shows.map((show) => new Date(show.showDateTime).toDateString())
          )
        ),
      ];

      this.selectedDate = this.allShowDates[0];

    } catch (error) {
      console.error(error);
    }
  }

  filterShowsByDate(shows: any) {
    return shows.filter(
      (show: { showDateTime: string | number | Date; }) => new Date(show.showDateTime).toDateString() === this.selectedDate
    );
  }
}
