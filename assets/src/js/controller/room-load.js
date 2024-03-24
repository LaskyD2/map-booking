import { fetchRooms,getRoomsFromStorage, saveRoomToStorage} from '../model/room-load.js';

const FETCH_PRICES_ERROR = 'RoomLoad load error:';

export class RoomLoad {
    constructor() {
        this._cacheRooms = getRoomsFromStorage();
    }

    isLoadNeeded() {
        return !this._cacheRooms;
    }

    load() {
        return fetchRooms()
            .then((prices) => {
                saveRoomToStorage(JSON.stringify(prices));
                return prices;
            })
            .catch((error) => {
                console.log(FETCH_PRICES_ERROR);
                console.log(error);
            });
    }

    getFromCache() {
        console.log(this._cacheRooms)
        return JSON.parse(this._cacheRooms);
    }
}
