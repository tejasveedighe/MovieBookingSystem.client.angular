import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { Location, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { BookTicketsModalComponent } from '../../components/book-tickets-modal/book-tickets-modal.component';
import { url } from '../../constants';
import { HallDto, Movie, Show } from '../../types';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
  standalone: true,
  imports: [DialogModule, BookTicketsModalComponent, NgIf],
})
export class SeatSelectionComponent {
  movieId: string | undefined;
  showTimeId: string | undefined;
  hallId: string | undefined;

  hallData: HallDto | undefined;
  movieData: Movie | undefined;
  showData: Show | undefined;
  bookedSeatsData: any;
  selectedSeats: any = [];
  totalPrice: number = 0;

  totalRows: number = 0;

  groupedByRowType: { [key: string]: any[] } = {};
  groupedEntries: [string, any[]][] = [];

  dialog = inject(Dialog);

  constructor(private location: Location, private route: ActivatedRoute) {
    this.movieId = this.route.snapshot.params['movieId'];
    this.hallId = this.route.snapshot.params['hallId'];
    this.showTimeId = this.route.snapshot.params['showId'];

    this.getHallData()
      .then(() => this.groupRowsByType())
      .then(() => this.getTotalRows());
    this.getShowData();
    this.getBookedSeatsData();
  }

  getTotalRows(): void {
    this.totalRows = this.hallData?.rows.length ?? 0;
  }

  groupRowsByType(): void {
    if (this.hallData) {
      this.groupedByRowType = this.hallData.rows.reduce(
        (acc: { [key: string]: any[] }, row: any) => {
          const rowTypeName = row.rowType.name;
          if (!acc[rowTypeName]) {
            acc[rowTypeName] = [];
          }
          acc[rowTypeName].push(row);
          return acc;
        },
        {}
      );

      this.groupedEntries = Object.entries(this.groupedByRowType);
      this.groupedEntries = this.groupedEntries.reverse();
    }
  }

  async getHallData() {
    try {
      const res = await axios.get(url + 'Halls/' + this.hallId);
      this.hallData = res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getShowData() {
    try {
      const res = await axios.get(url + 'Shows/' + this.showTimeId);
      this.showData = res.data;
      this.movieData = this.showData?.movie;
    } catch (error) {
      console.error(error);
    }
  }

  async getBookedSeatsData() {
    try {
      const res = await axios.get(
        url + 'Bookings/get-booking-for-show/' + this.showTimeId
      );
      this.bookedSeatsData = res.data;
    } catch (error) {
      console.error(error);
    }
  }

  toggleSeat(
    seatId: number,
    seatType: string,
    price: number,
    quantity: number,
    seatNumber: string
  ) {
    if (this.isSeatBooked(seatId)) return;

    if (
      this.selectedSeats.find(
        (seat: { seatId: number }) => seat.seatId === seatId
      )
    ) {
      this.totalPrice -= price;
      this.selectedSeats = this.selectedSeats.filter(
        (seat: { seatId: number }) => seat.seatId !== seatId
      );
    } else {
      this.totalPrice += price;
      this.selectedSeats = [
        ...this.selectedSeats,
        { seatId, seatType, price, quantity, seatNumber },
      ];
    }
  }

  getSeatImage(seat: any): string {
    if (this.isSeatBooked(seat.seatId)) {
      return 'assets/images/movie/seat01-free.png';
    }
    return this.selectedSeats?.some(
      (s: { seatId: any }) => s.seatId === seat.seatId
    )
      ? 'assets/images/movie/seat01-booked.png'
      : 'assets/images/movie/seat01.png';
  }

  isSeatBooked(seatId: number): boolean {
    return this.bookedSeatsData?.some(
      (bookedSeat: any) => bookedSeat.seatId === seatId
    );
  }

  getRowLabel(rowNumber: number): string {
    return String.fromCharCode(64 + rowNumber).toUpperCase();
  }

  goBack() {
    this.location.back();
  }

  bookTickets() {
    this.dialog.open(BookTicketsModalComponent, {
      data: {
        selectedSeats: this.selectedSeats,
        movie: this.movieData,
        hall: this.hallData,
        show: this.showData,
        totalPrice: this.totalPrice,
      },
    });
  }
}
