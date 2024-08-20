import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketsModalComponent } from './book-tickets-modal.component';

describe('BookTicketsModalComponent', () => {
  let component: BookTicketsModalComponent;
  let fixture: ComponentFixture<BookTicketsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTicketsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTicketsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
