import {templateIconContent} from "../views/template-hotel.js";
import {getHotelsFromStorage} from "./hotel-load.js";
import { roomsAddress } from "../module/rooms-address.js";

export const placeMarksHotel = () => {
    const hotelList = getHotelsFromStorage(),
        placeMarksList = [];

    const Hotels = Object.keys(hotelList["hotels"]);
    Hotels.forEach(id => {
        let hotel = hotelList["hotels"][id];
        let placeMark = {
            id: id,
            name: hotel.name,
            address: hotel.address,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            iconContent: templateIconContent('loader'),
            width: 100,
            roomTypes: hotel.rooms
        };

        placeMarksList.push(placeMark);

    });

    return placeMarksList;
}


export const placeMarksApart = () => {

    let roomsAddressList = roomsAddress();

    let placemarksList = [];


    roomsAddressList.forEach((mark, index) => {

        let rooms = [];

        mark.rooms.forEach((room) => {
            rooms.push(room.id);
        });

        let placemark = {
            id: 'marker-' + index,
            address: mark.address,
            latitude: mark.rooms[0].latitude,
            longitude: mark.rooms[0].longitude,
            iconContent: templateIconContent('loader'),
            width: 90,
            roomTypes: rooms.join(',')
        };
        placemarksList.push(placemark);
    })

    return placemarksList;
}

