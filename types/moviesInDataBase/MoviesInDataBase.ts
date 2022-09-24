export interface MoviesInDataBase {
    id?: string;
    readonly origTitle: string;
    readonly polTitle: string;
    position: number;
    readonly year: Date;
    readonly imgOfMovie: string;
    readonly genre: string;
    readonly poster: string;
    readonly actors: string;
    readonly plot: string;
    readonly rated: string;
    readonly director: string;
}
export interface MoviesFromOMDBAPI {
    Title: string;
    Genre: string;
    Poster: string;
    Actors: string;
    Plot: string;
    Rated: string;
    Director: string;
}