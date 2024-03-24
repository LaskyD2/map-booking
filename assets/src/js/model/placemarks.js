import { roomsAddress } from "../module/rooms-address.js";
import { templateIconContent } from "../views/template.js";

export const placemarks = () => {

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

