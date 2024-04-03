import {minPrice} from "../module/min-price.js";
import {placeMarks} from "./placemarks.js";
import {geoObjects} from "../map.js";
import {templateIconContent} from "../views/template.js";

export const updateTemplate = (type, data) => {
    let hotelsMinPrice = minPrice(data),
        placeMarksRoster = placeMarks();

    placeMarksRoster.forEach((item, index) => {
        let hotelName = geoObjects[index].properties.get('name');
        let hotelAddress = geoObjects[index].properties.get('address');
        let hotelId = geoObjects[index].properties.get('id');
        let hotelIdMinPrice = hotelsMinPrice[hotelId];

        geoObjects[index].properties.set('iconContent', templateIconContent(type, hotelName, hotelAddress, hotelIdMinPrice, hotelId, providerIdActive));
    })
}
