import axios from "axios";
import {config} from "../config/config";

export const fetchFunction = async (method: string, searchTerm: string, searchYear: string): Promise<[]> =>{
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${config.omdbApiKey}&t=${searchTerm}&y=${searchYear}`);
    if (response.data.Error) {
        return null;
    }
    return response.data;
}