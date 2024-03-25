import {roomsAddress} from "../module/rooms-address.js";
import {templateIconContent} from "../views/template.js";
import {getRoomsFromStorage} from "./room-load.js";

export const placeMarks = () => {

    // let roomsAddressList = roomsAddress();
    const hotelList = getRoomsFromStorage(),
        placeMarksList = [];

    /* Новая версия */
    const Hotels = Object.keys(hotelList);
    Hotels.forEach(id => {
        let hotel = hotelList[id];
        let placeMark = {
            id: 'marker-' + id,
            name: hotel.name,
            address: hotel.address,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            iconContent: templateIconContent('loader', hotel.name),
            width: 90,
            roomTypes: hotel.rooms
        };

        placeMarksList.push(placeMark);

    });


    /* Старая версия */
   /* hotelList.forEach((mark, index) => {

        let rooms = [];
        mark.rooms.forEach((room) => {
            rooms.push(room.id);
        });

        let placeMark = {
            id: 'marker-' + index,
            address: mark.address,
            latitude: mark.rooms[0].latitude,
            longitude: mark.rooms[0].longitude,
            iconContent: templateIconContent('loader'),
            width: 90,
            roomTypes: rooms.join(',')
        };
        placeMarksList.push(placeMark);
    })
*/

    return placeMarksList;
}

