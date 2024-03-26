import { fetchHotels,getHotelsFromStorage, saveHotelToStorage} from '../model/hotel-load.js';

const FETCH_PRICES_ERROR = 'HotelLoad load error:';

export class HotelLoad {
    constructor() {
        this._cacheHotels = getHotelsFromStorage();
    }

    isLoadNeeded() {
        return !this._cacheHotels;
    }

    load() {
        return fetchHotels()
            .then((prices) => {
                saveHotelToStorage(JSON.stringify(prices));
                return prices;
            })
            .catch((error) => {
                console.log(FETCH_PRICES_ERROR);
                console.log(error);
            });
    }

    getFromCache() {
        console.log(this._cacheHotels)
        return JSON.parse(this._cacheHotels);
    }
}
