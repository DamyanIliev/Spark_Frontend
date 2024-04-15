import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3/search/trending";

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
});

export const CoinGecko = async () => {
    try {
        const res = await API.get(); 
         return res.data; 
    } catch (error) {
        console.log(error);
    }
}
