export interface QueryObjectInterface {
  genre: GenresType;
  rating: RatingType;
  startYear: number;
  endYear: number;
}

export type GenresType = 'Various'|'Drama'|'Action'|'Crime'|'Adventure'|'Comedy'|'Biography'|'Thriller'|'Romance'|'Mystery'|'Animation'|'Fantasy'|'Sci-Fi'|'Family'|'Music'|'War'|'History'|'Horror'|'Short'|'Sport'|'Documentary'|'Musical'|'Western'|'Adult';

export type RatingType = 'PG'|'PG-13'|'R'|'PG-13-BEL'|'PG-13-ABO'|'R-EXT';