import {GenresType, QueryObjectInterface, RatingType} from "../types";
import {ValidationError} from "../utils/errors";
import {genresArray, queryRatingsSwitch, ratingsArray, validateYear} from "../utils/dbQueryGenerator";
import {pool} from "../utils/db";

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
  }

  async getNumberOfRecords(): Promise<void>{

    const [numberOfRecords] = await pool.execute('SELECT COUNT(*) FROM `top-movies` WHERE (`genre` LIKE :genre AND `year`>=:startYear AND `year`<=:endYear AND `Rated`=:rating)', {
      genre: `%${this.genre}%`,
      startYear: this.startYear,
      endYear: this.endYear,
      rating: queryRatingsSwitch(this.rating),
    });

    return;
  }


}
