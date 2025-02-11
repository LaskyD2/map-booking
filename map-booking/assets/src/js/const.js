export const coordinatesCity = {
    "spb": [59.931429, 30.325081],
    "msk": [55.758905, 37.627425],
    "estosadok": [43.685014, 40.258632]
}

export const TYPE_SELECT = 'select' // select или tabs

export const PROFILE_BOOKING =  Object.keys(JSON.parse(localStorage.getItem("tl:storage:puid")))[0];

export const CENTER_MAP = coordinatesCity['spb'];
export const ZOOM_MAP = 13;

export const MODULE_NAME = 'hotels-list';
export const LOCAL_STORAGE_EXPIRE_ITEM = `${MODULE_NAME}:expire`;
export const LOCAL_STORAGE_ROOMS_ITEM = `${MODULE_NAME}:prices`;

export const PRICE_NAME = 'price-list';
export const LOCAL_STORAGE_EXPIRE_PRICE_ITEM = `${PRICE_NAME}:expire`;
export const LOCAL_STORAGE_PRICES_ITEM = `${PRICE_NAME}:prices`;

export const LOCAL_STORAGE_CACHE_VALUE = 1440;
export const LOCAL_STORAGE_CACHE_MEASURE = 'minute';
export const LOCAL_STORAGE_EMPTY_CACHE = '';
