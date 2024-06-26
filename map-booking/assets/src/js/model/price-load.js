import dayjs from 'dayjs';
import { LOCAL_STORAGE_EXPIRE_PRICE_ITEM, LOCAL_STORAGE_PRICES_ITEM, LOCAL_STORAGE_CACHE_MEASURE, LOCAL_STORAGE_CACHE_VALUE, LOCAL_STORAGE_EMPTY_CACHE} from '../const.js';
import { minPrice } from "../module/min-price.js";
import { placeMarks } from './placemarks.js';
import {geoObjects, map} from "../map.js";
import {templateBalloonContent, templateIconContent} from "../views/template.js";

export const changeDate = (date, nights, adults, providerIdActive) => {
    const url = `/map-booking/core/price-api.php?date=${date}&nights=${nights}&adults=${adults}`;

    let  placeMarksRoster = placeMarks();

    if (geoObjects.length !== 0) {
        placeMarksRoster.forEach((item, index) => {
            geoObjects[index].properties.set('iconContent', templateIconContent('loader'));
        })
    }

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
                    placeMarksRoster = placeMarks(),
                    listElement, activeHotelTab;


                if (providerIdActive) {
                    listElement = document.querySelector('.bookmarks li.active');
                    activeHotelTab = listElement.getAttribute('data-id');
                }

                placeMarksRoster.forEach((item, index) => {
                    let hotelName = geoObjects[index].properties.get('name');
                    let hotelAddress = geoObjects[index].properties.get('address');
                    let hotelId = geoObjects[index].properties.get('id');
                    let hotelIdMinPrice = hotelsMinPrice[hotelId];

                    geoObjects[index].properties.set('iconContent', templateIconContent('price', hotelIdMinPrice, hotelId, providerIdActive));
                    geoObjects[index].properties.set('balloonContent', templateBalloonContent(hotelName, hotelAddress, hotelIdMinPrice, hotelId, providerIdActive));

                    if (providerIdActive) {
                        if (hotelId === activeHotelTab) {
                            try {
                                geoObjects[index].balloon.open();
                            } catch (err) {
                                let coords = geoObjects[index].geometry.getCoordinates();
                                map.setCenter(coords, 16, {duration: 300});
                                setTimeout(() => geoObjects[index].balloon.open(), 350);
                            }
                        }
                    }
                })

                return prices;
            })
            .catch((err) => {
                console.log(err);
                console.log('not load price');
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

