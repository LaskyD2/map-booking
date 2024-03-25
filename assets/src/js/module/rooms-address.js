import {getRoomsFromStorage} from '../model/room-load.js'
import {getParameterByName} from "./module.js";
// import {scenariosHotel} from "../const.js";

export const roomsAddress = () => {

    let roomList = getRoomsFromStorage(),
        roomListCache = [],
        roomAddressList = [],
        roomAddressItem = [],
        rooms = [],
        prov = getParameterByName('hotel_id');
        // scenariosListHotel = scenariosHotel;

    if (prov) {
        roomList.forEach((room) => {
            if (scenariosListHotel[prov].toString().includes(room.id)) {
                roomListCache.push(room)
            }
        });
        roomList = roomListCache;
    }

    for (let i = 0; i < roomList.length; i++) {
        let check = true;
        roomAddressList.forEach((item) => {
            if (item.longitude === roomList[i].longitude && item.latitude === roomList[i].latitude) {
                check = false;
            }
        });

        if (check === false) {
            continue;
        }


        roomAddressItem.address = roomList[i].address[MAP_BOOKING_LANG];
        roomAddressItem.longitude = roomList[i].longitude;
        roomAddressItem.latitude = roomList[i].latitude;

        rooms.push(roomList[i]);
        for (let j = i + 1; j < roomList.length - 1; j++) {
            if (roomList[i].longitude === roomList[j].longitude && roomList[i].latitude === roomList[j].latitude) {
                rooms.push(roomList[j]);
            }
        }

        roomAddressItem.rooms = rooms;
        roomAddressList.push(roomAddressItem);

        roomAddressItem = [];
        rooms = [];
    }

    return roomAddressList;
}
