export type MovieThumbnail = {
  movieThumbnailId: number;
  title: string;
  photo: string;
};

export type Movie = {
  movieId: number;
  movieTitle: string;
  genre: string;
  duration: string; // ISO 8601 duration format (e.g., "01:30:00")
  releaseDate: string; // ISO 8601 date format (e.g., "2001-09-05T00:00:00")
  description: string;
  movieThumbnailId: number;
  movieThumbnail: MovieThumbnail;
};

export type PagedRepsonse = {
  data: any[];
  totalMovies: Number;
};

export type Theater = {
  theaterId: number;
  address: string;
  phone: number;
  name: string;
};

export type Seat = {
  seatId: number;
  row: Row;
  seatNumber: number;
};

export type Row = {
  rowId: number;
  hall: Hall;
  rowNumber: number;
  rowType: RowType;
  seats: Seat[];
};

export type RowType = {
  rowTypeId: number;
  name: string;
  price: number;
};

export type Hall = {
  hallId: number;
  hallNumber: number;
  theater: Theater;
  numberOfRows: number;
  capacityPerRow: number;
  rows: Row[];
};

export type Show = {
  showTimeId: number;
  hall: Hall;
  movie: Movie;
  dateTime: Date;
  isDeleted: boolean;
};

export type HallDto = {
  hallId: number;
  hallNumber: number;
  theater: TheaterDto;
  numberOfRows: number;
  capacityPerRow: number;
  rows: RowDto[];
};

export type RowDto = {
  rowId: number;
  rowNumber: number;
  rowType: RowType;
  seats: SeatDto[];
};

export type SeatDto = {
  seatId: number;
  seatNumber: number;
};

export type TheaterDto = {
  theaterId: number;
  theaterName: string;
};

export type TheaterListDTOItem = Theater & {
  NumberOfHalls: number;
};
