import { fetchPrices,getPricesFromStorage, savePriceToStorage} from '../model/price-load.js';

const FETCH_PRICES_ERROR = 'PriceLoad load error:';

export class PriceLoad {
    constructor() {
        this._cachePrices = getPricesFromStorage();
    }

    isLoadNeeded() {
        return !this._cachePrices;
    }

    load() {
        return fetchPrices()
            .then((prices) => {
                savePriceToStorage(JSON.stringify(prices));
                return prices;
            })
            .catch((error) => {
                console.log(FETCH_PRICES_ERROR);
                console.log(error);
            });
    }

    getFromCache() {
        console.log(this._cachePrices)
        return JSON.parse(this._cachePrices);
    }
}
