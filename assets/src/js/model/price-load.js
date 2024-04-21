import dayjs from 'dayjs';
import { LOCAL_STORAGE_EXPIRE_PRICE_ITEM, LOCAL_STORAGE_PRICES_ITEM, LOCAL_STORAGE_CACHE_MEASURE, LOCAL_STORAGE_CACHE_VALUE, LOCAL_STORAGE_EMPTY_CACHE} from '../const.js';
import { minPrice } from "../module/min-price.js";
import { placeMarks } from './placemarks.js';
import { geoObjects } from "../map.js";
import { templateIconContent } from "../views/template.js";

export const changeDate = (date, nights, adults, providerIdActive) => {
    const url = `/core/price-api.php?date=${date}&nights=${nights}&adults=${adults}`;

    let  placeMarksRoster = placeMarks();

    placeMarksRoster.forEach((item, index) => {
        let hotelName = geoObjects[index].properties.get('name');
        let hotelAddress = geoObjects[index].properties.get('address');
        geoObjects[index].properties.set('iconContent', templateIconContent('loader'));
    })
    setPricesStorage(url, providerIdActive);
}

export const fetchPrices = async (url) => {
    const result = await fetch(url);
    if (!result.ok) {
        console.error('null');
    }
    return await result.json();
};

export const setPricesStorage = (url, providerIdActive) => {
        fetchPrices(url)
            .then((prices) => {
                savePriceToStorage(JSON.stringify(prices));

                let hotelsMinPrice = minPrice(prices),
                    placeMarksRoster = placeMarks();

                placeMarksRoster.forEach((item, index) => {
                    let hotelName = geoObjects[index].properties.get('name');
                    let hotelAddress = geoObjects[index].properties.get('address');
                    let hotelId = geoObjects[index].properties.get('id');
                    let hotelIdMinPrice = hotelsMinPrice[hotelId];

                    geoObjects[index].properties.set('iconContent', templateIconContent('price', hotelIdMinPrice, hotelId, providerIdActive));
                })
                return prices;
            })
            .catch(() => {
                console.log('not load');
            });
}

export const isStorageExpire = () => {
    return localStorage.getItem(LOCAL_STORAGE_EXPIRE_PRICE_ITEM) <= getNowTimeStamp();
};

export const getPricesFromStorage = () => {
    const storagePrices = localStorage.getItem(LOCAL_STORAGE_PRICES_ITEM);
    return storagePrices && !isStorageExpire() ? JSON.parse(storagePrices) : LOCAL_STORAGE_EMPTY_CACHE;
};

export const savePriceToStorage = (prices) => {
    localStorage.setItem(LOCAL_STORAGE_PRICES_ITEM, prices);
    localStorage.setItem(LOCAL_STORAGE_EXPIRE_PRICE_ITEM, getExpireTime().toString());
};

export const getExpireTime = () => {
    return dayjs().add(LOCAL_STORAGE_CACHE_VALUE, LOCAL_STORAGE_CACHE_MEASURE).unix();
};

export const getNowTimeStamp = () => {
    return dayjs().unix();
};

