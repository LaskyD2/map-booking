import {templateIconContent, templateBalloonContent} from "../views/template.js";
import { placeMarks } from '../model/placemarks.js';
import { geoObjects, clusterer, map } from '../map.js';


export const roomsList = (roomsFb, roomList) => {

    let minPriceMarker;
    let placemarksRoster = placeMarks();


    if (!roomsFb) {
        geoObjects.forEach((item) => {
            item.properties.set('iconContent', templateIconContent('price', undefined));
        })
        return;
    }

    roomsFb.forEach((roomfb) => {
        geoObjects.forEach((item) => {
            if (item.properties.get('roomTypes').includes(roomfb.id)) {
                item.properties._data.price = roomfb.price;
            }
        })
    })

    placemarksRoster.forEach((item, index) => {
        let roomPrice = [], roomsObj = [];
        let roomsMarker = item.roomTypes;

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
            if (a.price === null)
                return '1';
            else if (b.price === null)
                return '-1';
            else
                return a.price - b.price;
        });

        minPriceMarker = roomPrice.length ? Math.min.apply(null, roomPrice) : null;

        let address = geoObjects[index].properties.get('address');
        let idElement = geoObjects[index].properties.get('id');

        console.log(name);

        geoObjects[index].properties.set('iconContent', templateIconContent('price',minPriceMarker, idElement, roomsObj.length));
        geoObjects[index].properties.set('balloonContent', templateBalloonContent(address, roomsObj));

    })


    function changeColorClusters() {
        let clusters = clusterer.getClusters();

        clusters.forEach((cluster) => {
            let checkPrice = false;
            cluster.properties.get('geoObjects').forEach((item) => {
                if (item.properties.get('price') && checkPrice === false) {
                    checkPrice = true;
                    cluster.options.set('clusterIconColor', '#5a9b3b');
                }
            })
            // cluster.options.set('clusterIconLayout', templateClusterContent(cluster.properties.get('geoObjects').length));
        });
    }
    changeColorClusters();
    map.events.add('boundschange', function(event) {
        if (event.get('newZoom') !== event.get('oldZoom')) {
            changeColorClusters()
        }
    });

}
