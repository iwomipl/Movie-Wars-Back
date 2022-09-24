import {GenresType, QueryObjectInterface, RatingType} from "../types";
import {ValidationError} from "../utils/errors";
import {genresArray, ratingsArray, validateYear} from "../utils/dbQueryGenerator";

export class QueryObject implements QueryObjectInterface {
  genre: GenresType;
  rating: RatingType;
  startYear: number;
  endYear: number;


  constructor(obj: QueryObjectInterface) {
    const {
      genre,
      rating,
      startYear,
      endYear,
    } = obj as QueryObjectInterface;

    if (!genre || !rating || !startYear || !endYear) {
      throw new ValidationError(`Query does not meet requirements. Genre, Rating, "Release from" or "Release to" not found.`);
    }
    if (!ratingsArray.includes(rating)) {
      throw new ValidationError(`Rating of movie must be one of following: 'PG','PG-13','R'. Now it's ${rating}.`);
    }

    if (!genresArray.includes(genre)) {
      throw new ValidationError(`Genre of movie is not suitable to our DB. No it's set to ${genre}.`);
    }
    if (validateYear(startYear) || validateYear(endYear) || startYear > endYear) {
      throw new ValidationError(`"Release from" and "Release to" must be between 1901 and ${new Date().getFullYear()}. "Release from" should be also earlier or equal to "Release to". Now it is set on: year of "Release from": ${startYear}, "Release to": ${endYear}.`);
    }

    this.genre = genre;
    this.rating = rating;
    this.startYear = Number(startYear);
    this.endYear = Number(endYear);

    // if (poster === '') {
    //   throw new ValidationError(`Movie ${origTitle} has no poster.`);
    // }
    // if (imgOfMovie === '') {
    //   throw new ValidationError(`Movie ${origTitle} has no polish poster.`);
    // }
    // if (genre.length < 1 || genre.length > 100) {
    //   throw new ValidationError(`Genre list of movie ${origTitle} is not proper.`);
    // }
    // this.id = id || uuid();
    // this.origTitle = origTitle;
    // this.position = position;
    // this.year = year;
    // this.imgOfMovie = imgOfMovie;
    // this.polTitle = polTitle;
    // this.genre = genre;
    // this.poster = poster;
    // this.actors = actors;
    // this.plot = plot;
    // this.rated = rated;
    // this.director = director;
  }


}
