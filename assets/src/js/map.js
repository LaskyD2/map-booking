import {coordinatesCity} from './const.js';
import {placeMarks} from './model/placemarks.js';
import { handleButtonClick } from './module/module.js';
import {bookingForm} from './booking-form.js';
// import {templateClusterContent} from './views/template.js';

export let geoObjects = [];
export let clusterer;
export let map;
let isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

export let fillPoint = (placeMarksList) => {
    map.geoObjects.removeAll();
    geoObjects.length = 0;
    map.setZoom(10);
    placeMarksList.forEach((point, i) => {
        geoObjects[i] = new ymaps.Placemark([placeMarksList[i].latitude, placeMarksList[i].longitude],
            {
                iconContent: placeMarksList[i].iconContent,
                roomTypes: placeMarksList[i].roomTypes,
                address: placeMarksList[i].address,
                id: placeMarksList[i].id,
                price: null
            },
            {
                iconLayout: 'default#imageWithContent',
                iconImageSize: [placeMarksList[i].width, 30],
                iconImageOffset: [0, -15],
                iconImageClipRect: [[415, 0], [461, 57]],
                hideIconOnBalloonOpen: false,
                balloonOffset:[20, -15]
            }
        );

        geoObjects[i].events.add('click', function (e) {
            let placeMark = e.get('target');
            let rt = placeMark.properties.get('roomTypes');
            let id = placeMark.properties.get('id');

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
            let placeMark = e.get('target');
            let id = placeMark.properties.get('id');

            if (document.getElementById(id)) {
                document.getElementById(id).classList.add('active-check')
                document.getElementById(id).classList.remove('active');
            }

        });
    })

    clusterer = new ymaps.Clusterer({
        gridSize: 95,
        clusterIconColor: '#7F7165',
    });

    let uniqueIds = new WeakMap();
    let lastUniqueId = 0;

    function getUniqueId(geoObject) {
        if (!uniqueIds.has(geoObject)) {
            uniqueIds.set(geoObject, lastUniqueId++);
        }
        return uniqueIds.get(geoObject);
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

    // let cooCity = document.querySelector('.tl-city-select').value;

    map = new ymaps.Map('map', {
        center: coordinatesCity['spb'], // Доделать выбранный город
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: isMobile ? ['dblClickZoom', 'multiTouch'] : ['drag', 'scrollZoom'],

    });

    fillPoint(placeMarks());

}

