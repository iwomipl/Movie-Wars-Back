import {appendFile} from "fs/promises";
import {NotAddedMovie} from "../types";




export const addUnsuccessfulMovieAddingToFIle = async (movieToAddToListOfNotAdded: NotAddedMovie): Promise<void>=> {
const {origTitle, polTitle} = movieToAddToListOfNotAdded;
  await appendFile(__dirname+ '/badMovies.txt',
    `could not add movie:\n
                ${(origTitle || 'no orig title')}\n\n
                Polish title: \n
                ${polTitle || 'nie ma polskiego tytułu'}\n
            ******-----------------------******\n\n`, 'utf-8');
  return;
}