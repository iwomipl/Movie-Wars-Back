import {appendFile} from "fs/promises";
import {MoviesFromOMDBAPI, NotAddedMovie, TopMoviesInterface} from "../types";
import {TopMovie} from "../records/topMovies.record";
import {fetchFunction} from "./fetchFunction";


export const updateMoviesListInDb = async (topMovies: TopMoviesInterface[] )=>{

  /**---------- map the list of movies ------------*/
  await Promise.all(topMovies.map(async (movie) => {
      const {position, origTitle, polTitle, year, imgOfMovie} = movie;
      /**---------- check if movie is in my DB ------------*/
      const movieFromDB = year && (origTitle || polTitle) ? await TopMovie.checkIfItIsInDataBase(new Date(year), origTitle, polTitle): null;
      /**---------- if it is, update only the position  ------------*/
      if(movieFromDB){
        return movieFromDB.position !== Number(position) ?
          await TopMovie.updateMoviePosition(movieFromDB.id, Number(position), movieFromDB.origTitle) :
          origTitle;
      } else {

        /**---------- if movie is not in DB fetch movie data from OMDB API ------------*/
        let movieFromOMDB = (await fetchFunction('GET', `${encodeURIComponent(movie.origTitle || movie.polTitle)}`, `${movie.year}`) as unknown as MoviesFromOMDBAPI);

        /**---------- if movie is in OMDB DB ------------*/
        if (movieFromOMDB !== null) {
          const {
            Title: title, //lacking of title usage from this source, I'm going to use it to check if data from OMDBAPI is correct
            Rated: rated,
            Genre: genre,
            Director: director,
            Actors: actors,
            Plot: plot,
            Poster: poster
          } = movieFromOMDB;

          /**---------- create instance of TomMovie class ------------*/
          const newMovie = new TopMovie({
            rated,
            genre,
            director,
            actors,
            plot,
            poster,
            position: Number(position),
            origTitle: origTitle || polTitle,
            polTitle: polTitle || origTitle,
            year: new Date(year),
            imgOfMovie,
          });

          /**---------- and save this instance on my DB and return the title or undefined if it is not saved ------------*/
          return await newMovie.addNewMovieToDataBase() as string | undefined;
        }

        /**---------- if above could not be returned add this movie to list of unsuccessful addings ------------*/
        await addUnsuccessfulMovieAddingToFile({
          origTitle: movie.origTitle,
          polTitle: movie.polTitle,
        } as NotAddedMovie);
        return;
      }
    }
  ));


}

const addUnsuccessfulMovieAddingToFile = async (movieToAddToListOfNotAdded: NotAddedMovie): Promise<void>=> {
const {origTitle, polTitle} = movieToAddToListOfNotAdded;
  await appendFile(__dirname+ '/badMovies.txt',
    `could not add movie:\n
                ${(origTitle || 'no orig title')}\n\n
                Polish title: \n
                ${polTitle || 'nie ma polskiego tytułu'}\n
            ******-----------------------******\n\n`, 'utf-8');
  return;
}