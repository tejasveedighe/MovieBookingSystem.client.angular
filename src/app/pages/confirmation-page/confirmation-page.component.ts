import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { url } from '../../constants';

@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-page.component.html',
  styleUrl: './confirmation-page.component.css',
})
export class ConfirmationPageComponent {
  success: boolean | undefined = false;
  cancel: boolean | undefined = false;
  bookingId: number | undefined;
  bookingData: any;
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.success = this.router.snapshot.queryParams['success'];
    this.cancel = this.router.snapshot.queryParams['cancelled'];
    this.bookingId = this.router.snapshot.queryParams['bookingId'];

    this.getBooking();
  }
  
  async getBooking() {
    try {
      const res = await axios.get(url + 'Bookings/' + this.bookingId);
      this.bookingData = res.data;
      this.updateBookingStatus();
    } catch (error) {
      console.log(error);
    }
  }

  async updateBookingStatus() {
    try {
      if (
        this.bookingData != null &&
        this.bookingData.payment.paymentStatus !== 6 &&
        this.bookingData.payment.paymentStatus !== 0
      ) {
        const payload = {
          bookingId: this.bookingId,
          paymentStatus: this.success ? 6 : 0,
        };

        const res = await axios.post(
          url +
            'Bookings/update-payment-status/' +
            this.bookingId +
            '?paymentStatus=' +
            payload.paymentStatus
        );

        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
