import {templateIconContent} from "../views/template.js";
import {getHotelsFromStorage} from "./hotel-load.js";

export const placeMarks = () => {
    const hotelList = getHotelsFromStorage(),
        placeMarksList = [];

    const Hotels = Object.keys(hotelList);
    Hotels.forEach(id => {
        let hotel = hotelList[id];
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

