export interface MoviesResponse {
    id?: string;
    title: string;
    position: number;
    year: Date;
}

export interface MoviesListResponse {
    listOfMovies: MoviesResponse[];
}