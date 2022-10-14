import {QueryObjectInterface} from "../types";
import {QueryObject} from "../records/queryObject";

export const genresArray = ['Various','Drama','Action','Crime','Adventure','Comedy','Biography','Thriller','Romance','Mystery','Animation','Fantasy','Sci-Fi','Family','Music','War','History','Horror','Short','Sport','Documentary','Musical','Western','Adult'];

export const ratingsArray = ['PG','PG-13','R','PG-13 and younger','PG-13 and older','All'];

export const dbQueryGenerator = async (objectFromFrontend: QueryObjectInterface): Promise<number>=>{
  const newQueryBody = new QueryObject(objectFromFrontend);
  
   return await newQueryBody.getNumberOfRecords();
}

export const validateYear = (year: number): boolean=> {
  return (year < 1901 || year > Number(new Date().getFullYear()) || !Number.isInteger(year));
}

export const queryRatingsSwitch = (nameOfGenre: string): any=>{

  switch (nameOfGenre) {
    case 'PG':
      return 'PG$';
    case 'PG-13':
      return 'PG-13$';
    case 'PG-13 and younger':
      return 'PG';
    case 'PG-13 and older':
      return 'PG-13$|R';
    case 'R':
      return 'R$';
    case 'All':
      return '';
  }
}
