import {getHotelsFromStorage} from '../model/hotel-load.js'
import {getParameterByName} from "./module.js";

export const roomsAddress = (hotelCode) => {

    let roomList = getHotelsFromStorage(),
        roomAddressList = [],
        roomAddressItem = [],
        rooms = [];


    roomList = roomList["apart"][hotelCode];

    for (let i = 0; i < roomList.length; i++) {

        if ((roomList[i].longitude === null && roomList[i].longitude === null) ||
            (roomList[i].longitude === "0.0000" && roomList[i].longitude === "0.0000")) {
            continue;
        }

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
