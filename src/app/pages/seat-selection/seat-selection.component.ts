import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { url } from '../../constants';
import { Hall, HallDto, Movie, Show } from '../../types';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css',
})
export class SeatSelectionComponent {
  movieId: string | undefined;
  showTimeId: string | undefined;
  hallId: string | undefined;

  hallData: HallDto | undefined;
  movieData: Movie | undefined;
  showData: Show | undefined;

  selectedSeats: number[] = [];

  constructor(private location: Location, private route: ActivatedRoute) {
    this.movieId = this.route.snapshot.params['movieId'];
    this.hallId = this.route.snapshot.params['hallId'];
    this.showTimeId = this.route.snapshot.params['showId'];

    this.getHallData();
    this.getShowData();
  }

  goBack() {
    this.location.back();
  }

  async getHallData() {
    try {
      const res = await axios.get(url + 'Halls/' + this.hallId);
      this.hallData = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getShowData() {
    try {
      const res = await axios.get(url + 'Shows/' + this.showTimeId);
      this.showData = res.data;
      this.movieData = this.showData?.movie;
    } catch (error) {
      console.log(error);
    }
  }
}
