import {CENTER_MAP, ZOOM_MAP} from './const.js';
import {YM_COUNTER} from './settings.js';
import {placeMarks} from './model/placemarks.js';
import {handleButtonClick} from './module/module.js';
import {changeURL, firstActiveTab} from './booking-form.js';
import {getHotelsFromStorage} from "./model/hotel-load.js";
import {hotelsList} from "./module/hotels-list.js";

export let geoObjects = [];
export let cluster;
export let map;
let isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

export let fillPoint = (placeMarksList) => {
    map.geoObjects.removeAll();
    geoObjects.length = 0;
    map.setZoom(ZOOM_MAP);
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
            // ym(YM_COUNTER,'reachGoal','click_on_map')

            if (document.getElementById(id) == null) {
                handleButtonClick();
            } else if (!document.getElementById(id).classList.contains('active')) {
                changeURL(id);
                firstActiveTab();
            }

            let placeMarksRoster = placeMarks();
            placeMarksRoster.forEach((item, i) => {
                let hotelId = geoObjects[i].properties.get('id');
                if (hotelId === id) {
                    let iconContent = geoObjects[i].properties.get('iconContent').replace('class="map__hint', 'class="map__hint active')
                    geoObjects[i].properties.set('iconContent', iconContent);
                } else {
                    let iconContentDisabled = geoObjects[i].properties.get('iconContent').replace('class="map__hint active', 'class="map__hint');
                    geoObjects[i].properties.set('iconContent', iconContentDisabled);
                }
            })




            e.stopPropagation();
        });

        geoObjects[i].events.add('balloonopen', function () {
            let balloonHotel = document.querySelectorAll(".balloon-hotel");
            let bookingFormBlock = document.getElementById("tl-booking-form");


            let handleButtonClick = () => {
                // ym(YM_COUNTER,'reachGoal','click_on_balloon');
                bookingFormBlock.scrollIntoView({block: "end", behavior: "smooth"});
            }

            balloonHotel.forEach((balloon) => {
                balloon.addEventListener("click", handleButtonClick);
            })

        });

       /* geoObjects[i].events.add('balloonclose', function (e) {
            let placeMark = e.get('target');
            let id = placeMark.properties.get('id');

            if (document.getElementById(id)) {
                // document.getElementById(id).classList.add('active-check')
                // document.getElementById(id).classList.remove('active');
            }

        });*/
    })

    cluster = new ymaps.Clusterer({
        gridSize: 10,
        clusterIconColor: '#A40045',
    });



    map.geoObjects.add(cluster);
    cluster.add(geoObjects);

    map.setBounds(map.geoObjects.getBounds())

    hotelsList(getHotelsFromStorage());

}

export function init() {

    map = new ymaps.Map('map-be', {
        center: CENTER_MAP,
        zoom: ZOOM_MAP,
        controls: ['zoomControl'],
        behaviors: isMobile ? ['dblClickZoom', 'multiTouch'] : ['drag', 'scrollZoom'],

    });

    fillPoint(placeMarks());

}

