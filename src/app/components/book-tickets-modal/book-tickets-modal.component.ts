import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import axios from 'axios';
import { url } from '../../constants';

@Component({
  selector: 'app-book-tickets-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-tickets-modal.component.html',
  styleUrl: './book-tickets-modal.component.css',
})
export class BookTicketsModalComponent {
  dialog = inject(Dialog);
  data = inject(DIALOG_DATA);
  date = new Date(this.data.show.dateTime);

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.min(10),
      Validators.max(10),
    ]),
  });

  closeModal() {
    this.dialog.closeAll();
  }

  onSubmit($event: Event) {
    $event.preventDefault();

    this.closeModal();

    const body = {
      customerEmail: this.formGroup.value.email,
      movieTitle: this.data.movie?.movieTitle,
      seats: this.data.selectedSeats,
      customerName: this.formGroup.value.name,
      phoneNumber: this.formGroup.value.phone?.toString(),
      showTimeId: this.data.show.showTimeId,
      moveiTitle: this.data.movie.movieTitle,
    };

    this.createStripeSession(body);
  }

  async createStripeSession(body: any) {
    try {
      await axios
        .post(url + 'Bookings/create-booking-and-stripe-session', body)
        .then((res) => window.location.replace(res.data.redirectLink));
    } catch (error) {
      alert(error);
    }
  }
}
