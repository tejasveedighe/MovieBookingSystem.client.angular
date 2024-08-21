import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { SeatSelectionComponent } from './pages/seat-selection/seat-selection.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { title: 'Home', path: '', component: HomeComponent },
      {
        title: '',
        path: 'bookings/status',
        component: ConfirmationPageComponent,
        pathMatch: 'full',
      },
      {
        title: 'Movie Detail',
        path: 'movie/:id',
        component: MovieDetailsComponent,
        pathMatch: 'full',
      },
      {
        title: 'Move Bookings',
        path: 'bookings/:movieId',
        component: BookingsComponent,
      },
      {
        title: 'Seat Selection',
        path: 'bookings/:movieId/seat-selection/hall/:hallId/show/:showId',
        component: SeatSelectionComponent,
      },
    ],
  },
];
