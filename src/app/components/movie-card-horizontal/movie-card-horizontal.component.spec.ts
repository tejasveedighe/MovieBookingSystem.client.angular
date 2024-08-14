import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardHorizontalComponent } from './movie-card-horizontal.component';

describe('MovieCardHorizontalComponent', () => {
  let component: MovieCardHorizontalComponent;
  let fixture: ComponentFixture<MovieCardHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
