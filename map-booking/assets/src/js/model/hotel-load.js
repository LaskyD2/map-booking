import dayjs from 'dayjs';
import { LOCAL_STORAGE_EXPIRE_ITEM, LOCAL_STORAGE_ROOMS_ITEM, LOCAL_STORAGE_CACHE_MEASURE, LOCAL_STORAGE_CACHE_VALUE, LOCAL_STORAGE_EMPTY_CACHE} from '../const.js';


export const fetchHotels = async () => {
    const result = await fetch('/map-booking/cache/hotel_list.json');
    if (!result.ok) {
        console.error('null');
    }
    return await result.json();
};

export const setHotelsStorage = () => {
    if (!localStorage.getItem(LOCAL_STORAGE_ROOMS_ITEM)) {
        fetchHotels()
            .then((hotels) => {
                saveHotelToStorage(JSON.stringify(hotels));
                return hotels;
            })
            .catch(() => {
                console.log('not load');
            });
    }
}

export const isStorageExpire = () => {
    return localStorage.getItem(LOCAL_STORAGE_EXPIRE_ITEM) <= getNowTimeStamp();
};

export const getHotelsFromStorage = () => {
    const storagePrices = localStorage.getItem(LOCAL_STORAGE_ROOMS_ITEM);
    return storagePrices && !isStorageExpire() ? JSON.parse(storagePrices) : LOCAL_STORAGE_EMPTY_CACHE;
};

export const saveHotelToStorage = (hotels) => {
    localStorage.setItem(LOCAL_STORAGE_ROOMS_ITEM, hotels);
    localStorage.setItem(LOCAL_STORAGE_EXPIRE_ITEM, getExpireTime().toString());
};

export const getExpireTime = () => {
    return dayjs().add(LOCAL_STORAGE_CACHE_VALUE, LOCAL_STORAGE_CACHE_MEASURE).unix();
};

export const getNowTimeStamp = () => {
    return dayjs().unix();
};

