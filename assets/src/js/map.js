import {coordinatesCity} from './const.js';
import {placeMarks} from './model/placemarks.js';
import {handleButtonClick} from './module/module.js';
import {bookingForm, changeURL, firstActiveTab} from './booking-form.js';
import {getHotelsFromStorage} from "./model/hotel-load.js";
import {hotelsList} from "./module/hotels-list.js";
// import {templateClusterContent} from './views/template.js';

export let geoObjects = [];
export let cluster;
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
                id: placeMarksList[i].id,
                name: placeMarksList[i].name,
                address: placeMarksList[i].address,
                roomTypes: placeMarksList[i].roomTypes,
                price: null
            },
            {
                iconLayout: 'default#imageWithContent',
                iconImageSize: [placeMarksList[i].width, 30],
                iconImageOffset: [0, -15],
                iconImageClipRect: [[415, 0], [461, 57]],
                hideIconOnBalloonOpen: false,
                balloonOffset: [20, -15]
            }
        );

        geoObjects[i].events.add('click', function (e) {
            let placeMark = e.get('target');
            let id = placeMark.properties.get('id');

            if (document.getElementById(id) == null) {
                handleButtonClick();
            } else if (!document.getElementById(id).classList.contains('active')) {
                changeURL(id);

                firstActiveTab();

                // bookingForm();
            }

            document.querySelectorAll('.map__hint').forEach((item) => {
                item.classList.remove('active');
            });

            if (document.getElementById(id)) {
                // document.getElementById(id).classList.add('active-check');
                document.getElementById(id).classList.add('active');
            }


            e.stopPropagation();
        });

        geoObjects[i].events.add('balloonopen', function () {
            let balloonRoom = document.querySelectorAll(".map__balloon-room");
            let bookingFormBlock = document.getElementById("tl-booking-form");


            let handleButtonClick = () => {
                bookingFormBlock.scrollIntoView({block: "end", behavior: "smooth"});
            }

            balloonRoom.forEach((balloon) => {
                balloon.addEventListener("click", handleButtonClick);
            })

        });

        geoObjects[i].events.add('balloonclose', function (e) {
            let placeMark = e.get('target');
            let id = placeMark.properties.get('id');

            if (document.getElementById(id)) {
                // document.getElementById(id).classList.add('active-check')
                document.getElementById(id).classList.remove('active');
            }

        });
    })

    cluster = new ymaps.Clusterer({
        gridSize: 95,
        clusterIconColor: '#7F7165',
    });

    map.geoObjects.add(cluster);
    cluster.add(geoObjects);


    hotelsList(getHotelsFromStorage());

}

export function init() {

    map = new ymaps.Map('map', {
        center: coordinatesCity['spb'], // Доделать выбранный город
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: isMobile ? ['dblClickZoom', 'multiTouch'] : ['drag', 'scrollZoom'],

    });

    fillPoint(placeMarks());

}

