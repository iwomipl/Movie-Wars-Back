import {QueryObjectInterface} from "../types";
import {QueryObject} from "../records/queryObject";

export const genresArray = ['Various','Drama','Action','Crime','Adventure','Comedy','Biography','Thriller','Romance','Mystery','Animation','Fantasy','Sci-Fi','Family','Music','War','History','Horror','Short','Sport','Documentary','Musical','Western','Adult'];

export const ratingsArray = ['PG','PG-13','R'];

export const dbQueryGenerator = async (objectFromFrontend: QueryObjectInterface): Promise<QueryObject>=>{
  const newQueryBody = new QueryObject(objectFromFrontend);
  await newQueryBody.getNumberOfRecords();
  return newQueryBody;
}

export const validateYear = (year: number): boolean=> {
  return (year < 1901 || year > Number(new Date().getFullYear()) || !Number.isInteger(year));
}

export const queryRatingsSwitch = (nameOfGenre: string): string=>{

  switch (nameOfGenre) {
    case 'PG':
      return 'PG';
    case 'PG-13':
      return 'PG-13';
    case 'R':
      return 'R'
  }
  return '';
}
