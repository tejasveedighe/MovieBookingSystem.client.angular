import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { title: 'Home', path: '', component: HomeComponent },
      {
        title: 'Movie Detail',
        path: 'movie/:id',
        component: MovieDetailsComponent,
        
      },
    ],
  },
];
