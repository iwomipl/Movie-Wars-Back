import {pool} from "../utils/db";
import {FieldPacket, RowDataPacket} from "mysql2/promise";
import {v4 as uuid} from 'uuid';
import {ValidationError} from "../utils/errors";
import {GenresStatObject, MoviesInDataBase} from "../types";


type TopMovieResults = [TopMovie[], FieldPacket[]];

export class TopMovie implements MoviesInDataBase {
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
        if (origTitle.length < 1 || origTitle.length > 100) {
            throw new ValidationError(`Title of movie orig: ${origTitle}, pol: ${polTitle} must be between 1 and 100 letters long. Now it is ${origTitle.length} letters long.`);
        }
        if (position < 1 || position > 500) {
            throw new ValidationError(`Position of movie ${origTitle} must be between 1 and 500. Now it is ${position}.`);
        }
        if (Number(year.getFullYear()) < 1901 || Number(year.getFullYear()) > 2155 || year > new Date()) {
            throw new ValidationError(`Year of movies ${origTitle} creation  must be between 1901 and ${new Date().getFullYear()}. Now it is set on ${year.getFullYear()}.`);
        }
        if (poster === '') {
            throw new ValidationError(`Movie ${origTitle} has no poster.`);
        }
        if (imgOfMovie === '') {
            throw new ValidationError(`Movie ${origTitle} has no polish poster.`);
        }
        if (genre.length < 1 || genre.length > 100) {
            throw new ValidationError(`Genre list of movie ${origTitle} is not proper.`);
        }
        this.id = id || uuid();
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

    static async checkIfItIsInDataBase(year: Date, origTitle: string, polTitle: string): Promise<TopMovie> {
        const [[results]] = await pool.execute('SELECT * FROM `top-movies` WHERE `year`=:year AND (`origTitle`=:origTitle OR `polTitle`=:polTitle OR `origTitle`=:polTitle)', {
            year,
            origTitle,
            polTitle,
        }) as TopMovieResults;

        return results as TopMovie;
    }

    static async updateMoviePosition(id: string, position: number, origTitle: string): Promise<string> {
        await pool.execute('UPDATE `top-movies` SET `position` = :position WHERE `id` = :id', {
            position,
            id,
        });
        return origTitle;
    }

    static async setGenresList(){
        const [results] = await pool.execute('SELECT `genre` FROM `top-movies`') as RowDataPacket[];

        const genreSet: GenresStatObject = {};
        results.map((movie: RowDataPacket)=> movie.genre.split(',').forEach((genre: string) => genreSet[genre.trim()] ?
          genreSet[genre.trim()]= genreSet[genre.trim()]+1 :
          genreSet[genre.trim()] = 1));
        delete genreSet['N/A'];
        const [dbGenres] =  await pool.execute('SELECT * FROM `movie-stats`') as RowDataPacket[];
        const genreFromDBNames = dbGenres.map((obj: {id: string, name: string, number: number }) => obj.name);
        Object.entries(genreSet).map(async ([key, value])=> {
            genreFromDBNames.includes(key) ?
            await pool.execute('UPDATE `movie-stats` SET `number` = :number WHERE `name` = :name', {
                name: key,
                number: value,
            }) :
              await pool.execute('INSERT INTO `movie-stats`  VALUES(:id, :name, :number)', {
                id: uuid(),
              name: key,
              number: value,
        });
        })
    }
    static async getGenresList(): Promise<GenresStatObject>{
        const [dbGenres] =  (await pool.execute('SELECT `name`,`number` FROM `movie-stats` WHERE `number` > 7 ORDER BY `number` DESC') as RowDataPacket[]);
        const objOutOfArray = dbGenres.reduce((obj: object, item: {name:string, number:number})=> ({...obj, [item.name]: item.number}), {'Various': 256})
        return objOutOfArray as GenresStatObject;
    }
    async addNewMovieToDataBase(): Promise<string> {
        await pool.execute('INSERT INTO `top-movies` VALUES(:id, :origTitle, :polTitle, :position, :year, :imgOfMovie, :genre, :poster, :actors, :plot, :rated, :director)', {
            id: this.id,
            origTitle: this.origTitle,
            polTitle: this.polTitle,
            position: this.position,
            year: this.year,
            imgOfMovie: this.imgOfMovie,
            genre: this.genre,
            poster: this.poster,
            actors: this.actors,
            plot: this.plot,
            director: this.director,
            rated: this.rated,
        });
        return this.origTitle;
    }
}