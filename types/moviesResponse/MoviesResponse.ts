export interface MoviesResponse {
    id?: string;
    title: string;
    position: number;
    year: Date;
}

export interface GenresStatObject {
    [key: string]: number;
}

export interface GenresStatReturn {
    name: string;
    number: number;
}

export interface MoviesListResponse {
    listOfMovies: MoviesResponse[];
}