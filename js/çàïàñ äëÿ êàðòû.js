import { coordinatesCity } from './const.js';
import { placemarks } from './model/placemarks.js';
import { bookingForm } from './booking-form.js';

export let geoObjects = [];
export let map;

export let fillPoint = (placemarksList) => {
    map.geoObjects.removeAll();
    geoObjects.length = 0;
    map.setZoom(12);
    placemarksList.forEach((point, i) => {
        geoObjects[i] = new ymaps.Placemark([placemarksList[i].latitude, placemarksList[i].longitude],
            {
                iconContent: placemarksList[i].iconContent,
                roomTypes: placemarksList[i].roomTypes,
                address: placemarksList[i].address,
                id: placemarksList[i].id

            },
            {
                iconLayout: 'default#imageWithContent',
                iconImageSize: [placemarksList[i].width, 30],
                iconImageOffset: [-50, 0],
                iconImageClipRect: [[415, 0], [461, 57]],
                hideIconOnBalloonOpen: false
            }
        );

        geoObjects[i].events.add('click', function (e) {

            let placemark = e.get('target');
            let rt = placemark.properties._data.roomTypes;
            let id = placemark.properties._data.id;

            if (!document.getElementById(id).classList.contains('active'))
                bookingForm(rt);

            document.querySelectorAll('.map__hint').forEach((item) => {
                item.classList.remove('active');
            });

            if (document.getElementById(id))
                document.getElementById(id).classList.add('active');



            e.stopPropagation();
        });

        geoObjects[i].events.add('balloonopen', function (e) {
            let bookingFormBlock = document.getElementById("tl-booking-form");
            let btns = document.querySelectorAll(".map__balloon-room");


            function handleButtonClick() {
                bookingFormBlock.scrollIntoView({ block: "end", behavior: "smooth" });
            }
            btns.forEach((btn) => {
                btn.addEventListener("click", handleButtonClick);
            })

        });

        geoObjects[i].events.add('balloonclose', function (e) {
            let placemark = e.get('target');
            let id = placemark.properties._data.id;

            if (document.getElementById(id))
                document.getElementById(id).classList.remove('active');
        });
    })
    var clusterer = createVisitedClusterer({
        clusterIconColor: '#E58F3D',
        clusterOpenBalloonOnClick: false ,
        clusterDisableClickZoom: true,

        clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFF; font-weight: bold;">$[properties.geoObjects.length]</div>'
        )
    }, {
        iconColor: '#C87A31'
    });

    // let clusterer = new ymaps.Clusterer({
    //     /* clusterIcons: [
    //          {
    //              size: [100, 100],
    //              offset: [-50, -50]
    //          }
    //      ],*/
    //     preset: 'islands#invertedDarkorangeClusterIcons',
    // });


    var uniqueIds = new WeakMap();
    var lastUniqueId = 0;
    function getUniqueId(geoObject) {
        if (!uniqueIds.has(geoObject)) {
            uniqueIds.set(geoObject, lastUniqueId++);
        }
        return uniqueIds.get(geoObject);
    }
    function createVisitedClusterer(options, visitedClusterOptions) {
        var clusterer = new ymaps.Clusterer(options);
        var defaultCreateCluster = clusterer.createCluster.bind(clusterer);
        var visitedClusters = {};

        clusterer.createCluster = function(center, geoObjects) {
            var cluster = defaultCreateCluster(center, geoObjects);

            var ids = geoObjects.map(function(x) { return getUniqueId(x); });
            ids.sort(function(lhs, rhs) { return lhs - rhs; });

            var clusterId = ids.join(',');

            if (visitedClusters[clusterId]) {
                cluster.options.set(visitedClusterOptions);
            } else {
                cluster.events.add('click', function() {
                    visitedClusters[clusterId] = true;

                    cluster.options.set(visitedClusterOptions);
                });
            }

            return cluster;
        };

        return clusterer;
    }


    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);


}

export function init() {

    let cooCity = document.querySelector('.tl-city-select').value;

    map = new ymaps.Map('map', {
        center: coordinatesCity[cooCity],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    fillPoint(placemarks());

}

