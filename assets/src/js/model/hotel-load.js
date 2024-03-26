import dayjs from 'dayjs';
import { LOCAL_STORAGE_EXPIRE_ITEM, LOCAL_STORAGE_ROOMS_ITEM, LOCAL_STORAGE_CACHE_MEASURE, LOCAL_STORAGE_CACHE_VALUE, LOCAL_STORAGE_EMPTY_CACHE} from '../const.js';


export const fetchHotels = async () => {
    const result = await fetch('./cache/room_list.json');
    if (!result.ok) {
        console.error('null');
    }
    return await result.json();
};

export const setHotelsStorage = () => {
    if (!localStorage.getItem(LOCAL_STORAGE_ROOMS_ITEM)) {
        fetchHotels()
            .then((rooms) => {
                saveHotelToStorage(JSON.stringify(rooms));
                return rooms;
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

export const saveHotelToStorage = (rooms) => {
    localStorage.setItem(LOCAL_STORAGE_ROOMS_ITEM, rooms);
    localStorage.setItem(LOCAL_STORAGE_EXPIRE_ITEM, getExpireTime().toString());
};

export const getExpireTime = () => {
    return dayjs().add(LOCAL_STORAGE_CACHE_VALUE, LOCAL_STORAGE_CACHE_MEASURE).unix();
};

export const getNowTimeStamp = () => {
    return dayjs().unix();
};

