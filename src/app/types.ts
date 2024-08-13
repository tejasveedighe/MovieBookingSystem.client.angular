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
