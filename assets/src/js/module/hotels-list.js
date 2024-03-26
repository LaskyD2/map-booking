import { templateIconContent, templateBalloonContent } from "../views/template.js";
import { placeMarks } from '../model/placemarks.js';
import { geoObjects, cluster, map } from '../map.js';
import {setRoomsStorage} from "../controller/price-load.js";


export const hotelsList = (roomList) => {

    let minPriceMarker;
    let placeMarksRoster = placeMarks();

    setRoomsStorage();


    placeMarksRoster.forEach((item, index) => {
        let roomPrice = []



        minPriceMarker = roomPrice.length ? Math.min.apply(null, roomPrice) : null;

        let name = geoObjects[index].properties.get('name');
        let address = geoObjects[index].properties.get('address');
        let idElement = geoObjects[index].properties.get('id');

        geoObjects[index].properties.set('iconContent', templateIconContent('price', name, address, minPriceMarker, idElement));

    })


    function changeColorClusters() {
        let clusters = cluster.getClusters();

        clusters.forEach((cluster) => {
            let checkPrice = false;
            cluster.properties.get('geoObjects').forEach((item) => {
                if (item.properties.get('price') && checkPrice === false) {
                    checkPrice = true;
                    cluster.options.set('clusterIconColor', '#5a9b3b');
                }
            })
        });
    }
    changeColorClusters();
    map.events.add('boundschange', function(event) {
        if (event.get('newZoom') !== event.get('oldZoom')) {
            changeColorClusters()
        }
    });

}
