import {coordinatesCity} from './const.js';
import {placemarks} from './model/placemarks.js';
import { handleButtonClick } from './module/module.js';
import {bookingForm} from './booking-form.js';
import {templateClusterContent} from './views/template.js';

export let geoObjects = [];
export let clusterer;
export let map;
let isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

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
                id: placemarksList[i].id,
                price: null
            },
            {
                iconLayout: 'default#imageWithContent',
                iconImageSize: [placemarksList[i].width, 30],
                iconImageOffset: [0, -15],
                iconImageClipRect: [[415, 0], [461, 57]],
                hideIconOnBalloonOpen: false,
                balloonOffset:[20, -15]
            }
        );



        geoObjects[i].events.add('click', function (e) {
            let placemark = e.get('target');
            let rt = placemark.properties.get('roomTypes');
            let id = placemark.properties.get('id');

            if (document.getElementById(id) == null) {
                handleButtonClick();
            } else if (!document.getElementById(id).classList.contains('active')) {
                bookingForm(rt);
            }

            document.querySelectorAll('.map__hint').forEach((item) => {
                item.classList.remove('active');
            });

            if (document.getElementById(id)) {
                document.getElementById(id).classList.add('active-check');
                document.getElementById(id).classList.add('active');
            }


            e.stopPropagation();
        });

        geoObjects[i].events.add('balloonopen', function () {
            let bookingFormBlock = document.getElementById("tl-booking-form");
            let btns = document.querySelectorAll(".map__balloon-room");

            let handleButtonClick = () => {
                bookingFormBlock.scrollIntoView({block: "end", behavior: "smooth"});
            }

            btns.forEach((btn) => {
                btn.addEventListener("click", handleButtonClick);
            })

        });

        geoObjects[i].events.add('balloonclose', function (e) {
            let placemark = e.get('target');
            let id = placemark.properties.get('id');

            if (document.getElementById(id)) {
                document.getElementById(id).classList.add('active-check')
                document.getElementById(id).classList.remove('active');
            }

        });
    })
    let createIconShape = () => {
        return {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 25,
        };
    }

    clusterer = new ymaps.Clusterer({
        gridSize: 95,
        clusterIconColor: '#7F7165',
    });

    /*clusterer = createVisitedClusterer({
        gridSize: 95,
        clusterIconColor: '#7F7165',
        // clusterIconLayout: templateClusterContent(),
        // clusterIconShape: createIconShape(),
    }, {
        iconColor: '#D5AB83',


    });
*/
    let uniqueIds = new WeakMap();
    let lastUniqueId = 0;

    function getUniqueId(geoObject) {
        if (!uniqueIds.has(geoObject)) {
            uniqueIds.set(geoObject, lastUniqueId++);
        }
        return uniqueIds.get(geoObject);
    }

    function createVisitedClusterer(options, visitedClusterOptions) {
        let clusterer = new ymaps.Clusterer(options);
        let defaultCreateCluster = clusterer.createCluster.bind(clusterer);
        let visitedClusters = {};
        clusterer.createCluster = function (center, geoObjects) {
            let cluster = defaultCreateCluster(center, geoObjects);
            let ids = geoObjects.map(function (x) {
                return getUniqueId(x);
            });
            ids.sort(function (lhs, rhs) {
                return lhs - rhs;
            });
            let clusterId = ids.join(',');
            if (visitedClusters[clusterId]) {
                cluster.options.set(visitedClusterOptions);
            } else {
                cluster.events.add('click', function () {
                    visitedClusters[clusterId] = true;
                    cluster.options.set(visitedClusterOptions);

                });
            }
            return cluster;
        };
        return clusterer;
    }


    // эта штука должна менять масштаю при клики на кластер
    clusterer.events.add('click', (event) => {
        const needZoom = ymaps.util.bounds.containsBounds(map.getBounds(), clusterer.getBounds());
        if (needZoom) {
            clusterer.options.set('clusterDisableClickZoom', true)
            event.stopPropagation();
            const center = ymaps.util.bounds.getCenter(clusterer.getBounds());
            map.setCenter(center, map.getZoom() + 5);

        }
        clusterer.options.set('clusterDisableClickZoom', false)
    });


    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);

}

export function init() {

    let cooCity = document.querySelector('.tl-city-select').value;

    map = new ymaps.Map('map', {
        center: coordinatesCity[cooCity],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: isMobile ? ['dblClickZoom', 'multiTouch'] : ['drag', 'scrollZoom'],

    });

    fillPoint(placemarks());

}

