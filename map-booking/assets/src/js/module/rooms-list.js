import { templateIconContent, templateBalloonContent } from "../views/template-apart.js";
import {placeMarksApart} from '../model/placeMarks.js';
import { getPricesFromStorage } from '../model/price-load.js';
import { changeColorClusters } from './color-clusters.js';
import { geoObjects, map } from '../map.js';


export const roomsList = (roomsFb) => {

    let minPriceMarker,
        roomList = getPricesFromStorage(),
        placeMarksRoster = placeMarksApart();


    if (!roomsFb) {
        geoObjects.forEach((item) => {
            item.properties.set('iconContent', templateIconContent('price', undefined));
        })
        return;
    }

    roomsFb.forEach((roomfb) => {
        geoObjects.forEach((item) => {
            console.log(item)
            if (item.properties.get('roomTypes').includes(roomfb.id)) {
                item.properties._data.price = roomfb.price;
            }
        })
    })

    placeMarksRoster.forEach((item, index) => {
        let roomPrice = [], roomsObj = [], roomsMarker;
            roomsMarker = item.roomTypes;

        roomList.forEach((room) => {
            if (roomsMarker.indexOf(room.id) !== -1) {
                roomsObj.push(room);
            }
        })

        if (roomsFb) {
            roomsFb.forEach((roomfb) => {
                roomsObj.forEach((roomObj) => {
                    if (roomfb.id === roomObj.id) {
                        roomPrice.push(roomfb.price);
                        roomObj.price = roomfb.price;
                    }
                })
            })
        }


        roomsObj.sort((a, b) => {
            if (a.price == null)
                return '1';
            else if (b.price == null)
                return '-1';
            else
                return a.price - b.price;
        });

        minPriceMarker = roomPrice.length ? Math.min.apply(null, roomPrice) : null;

        let address = geoObjects[index].properties.get('address');
        let idElement = geoObjects[index].properties.get('id');




        geoObjects[index].properties.set('iconContent', templateIconContent('price', minPriceMarker, idElement, roomsObj.length));
        geoObjects[index].properties.set('balloonContent', templateBalloonContent(address, roomsObj));

    })


    changeColorClusters();
    map.events.add('boundschange', function(event) {
        if (event.get('newZoom') !== event.get('oldZoom')) {
            changeColorClusters()
        }
    });

}
