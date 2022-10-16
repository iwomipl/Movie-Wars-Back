import {pool} from "../utils/db";
import {FieldPacket} from "mysql2/promise";
import {GenresType, MoviesInDataBase, RatingType} from "../types";
import {queryRatingsSwitch} from "../utils/dbQueryGenerator";


type MovieResults = [MoviesInDataBase[], FieldPacket[]];

export class MovieResponseToFront implements MoviesInDataBase {
    id?: string;
    readonly origTitle: string;
    position: number;
    readonly year: Date;
    readonly imgOfMovie: string;
    readonly polTitle: string;
    readonly genre: string;
    readonly poster: string;
    readonly actors: string;
    readonly plot: string;
    readonly rated: string;
    readonly director: string;


    constructor(obj: MoviesInDataBase) {
        const {
            id,
            origTitle,
            position,
            year,
            imgOfMovie,
            polTitle,
            genre,
            poster,
            actors,
            plot,
            rated,
            director
        } = obj as MoviesInDataBase;
        this.id = id;
        this.origTitle = origTitle;
        this.position = position;
        this.year = year;
        this.imgOfMovie = imgOfMovie;
        this.polTitle = polTitle;
        this.genre = genre;
        this.poster = poster;
        this.actors = actors;
        this.plot = plot;
        this.rated = rated;
        this.director = director;
    }


    static async getMoviesFromDataBaseAndShuffle(numberOfMovies: number, genre: GenresType, startYear: number, endYear: number, rating: RatingType): Promise<MovieResponseToFront[]>{
        const [results] = await pool.execute('SELECT * FROM `top-movies` WHERE (`genre` LIKE :genre AND `year`>=:startYear AND `year`<=:endYear AND `Rated` REGEXP :rating) ORDER BY `position` ASC LIMIT 0, :numberOfMovies', {
            genre: genre === 'Various' ? '%': `%${genre}%`,
            startYear: startYear,
            endYear: endYear,
            rating: queryRatingsSwitch(rating),
            numberOfMovies,
        }) as MovieResults;

        return results.sort(()=> Math.random()-0.5).map(obj => new MovieResponseToFront(obj));
    }

}
