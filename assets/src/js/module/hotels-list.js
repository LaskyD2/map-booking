import { templateIconContent, templateBalloonContent } from "../views/template.js";
import { placeMarks } from '../model/placemarks.js';
import { geoObjects, cluster, map } from '../map.js';


export const hotelsList = () => {
    let minPriceMarker;
    let placeMarksRoster = placeMarks();

    placeMarksRoster.forEach((item, index) => {
        let roomPrice = []

        minPriceMarker = roomPrice.length ? Math.min.apply(null, roomPrice) : null;

        let name = geoObjects[index].properties.get('name');
        let address = geoObjects[index].properties.get('address');
        let idElement = geoObjects[index].properties.get('id');

        geoObjects[index].properties.set('iconContent', templateIconContent('loader', minPriceMarker, idElement));
        geoObjects[index].properties.set('balloonContent', templateBalloonContent(name, address, minPriceMarker));
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
