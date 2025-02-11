import { templateIconContent } from "../views/template-hotel.js";
import { placeMarksHotel } from '../model/placeMarks.js';
import { changeColorClusters } from './color-clusters.js';
import { geoObjects, map } from '../map.js';


export const hotelsList = () => {
    let minPriceMarker;
    let placeMarksRoster = placeMarksHotel();

    placeMarksRoster.forEach((item, index) => {
        let roomPrice = []
        minPriceMarker = roomPrice.length ? Math.min.apply(null, roomPrice) : null;
        geoObjects[index].properties.set('iconContent', templateIconContent('loader', minPriceMarker));
    })

    changeColorClusters();
    map.events.add('boundschange', function(event) {
        if (event.get('newZoom') !== event.get('oldZoom')) {
            changeColorClusters()
        }
    });

}
