import {ZOOM_MAP, TYPE_SELECT, PROFILE_BOOKING} from './const.js'
import {changeURLDate, diffDates, getParameterByName} from './module/module.js'
import {map, geoObjects} from './map.js'
import { getPricesFromStorage } from './model/price-load.js';
import {placeMarksHotel} from "./model/placeMarks.js";
import {roomsList} from "./module/rooms-list.js";


export function tabsBookingForm() {

    let selector = document.getElementById('tl-hotel-select');

    let placeMarksRoster = placeMarksHotel();

    if (TYPE_SELECT === 'select') {
        selector.addEventListener('change', function () {

            map.balloon.close();

            placeMarksRoster.forEach((item, i) => {
                let hotelId = geoObjects[i].properties.get('id');
                if (hotelId === this.value) {
                    let iconContent = geoObjects[i].properties.get('iconContent').replace('class="map__hint', 'class="map__hint active')
                    let coords = geoObjects[i].geometry.getCoordinates();
                    map.setCenter(coords, ZOOM_MAP, {duration: 300})
                    geoObjects[i].properties.set('iconContent', iconContent);
                    setTimeout(() => geoObjects[i].balloon.open(), 350);

                } else {
                    let iconContentDisabled = geoObjects[i].properties.get('iconContent').replace('class="map__hint active', 'class="map__hint');
                    geoObjects[i].properties.set('iconContent', iconContentDisabled);
                }
            })
            changeURL(this.value);
        });
    }
    else if (TYPE_SELECT === 'tabs') {
        let listElement = document.querySelectorAll('.bookmarks li[id ^="hotel-"]');
        let bookmarksBlock = document.querySelector('.bookmarks');

        bookmarksBlock.scrollIntoView({block: "start", behavior: "smooth"});

        listElement.forEach(function (elem, i) {
            elem.addEventListener("click", function () {
                let data_id = document.getElementById(elem.getAttribute('id')).getAttribute('data-id');
                map.balloon.close();
                placeMarksRoster.forEach((item, i) => {
                    let hotelId = geoObjects[i].properties.get('id');
                    if (hotelId === data_id) {
                        let iconContent = geoObjects[i].properties.get('iconContent').replace('class="map__hint', 'class="map__hint active')
                        let coords = geoObjects[i].geometry.getCoordinates();

                        map.setCenter(coords, ZOOM_MAP, {duration: 300})
                        geoObjects[i].properties.set('iconContent', iconContent);
                        setTimeout(() => {
                                try {
                                    geoObjects[i].balloon.open()
                                } catch (err) {
                                    map.setCenter(coords, ZOOM_MAP, {duration: 300})
                                    geoObjects[i].balloon.open()
                                }
                            }
                            , 350);


                    } else {
                        let iconContentDisabled = geoObjects[i].properties.get('iconContent').replace('class="map__hint active', 'class="map__hint');
                        geoObjects[i].properties.set('iconContent', iconContentDisabled);
                    }
                })
                changeURL(data_id);
                selector.value = data_id;
                fireEvent(selector[0], 'change')
            });
        });
    }

}

export function firstActiveTab() {
    let prov = getParameterByName('hotel_id');
    let selector = document.getElementById('tl-hotel-select');

    if (TYPE_SELECT === 'tabs') {
        document.querySelectorAll('.bookmarks li').forEach(function (elem) {
            let el = elem.getAttribute('id');
            if (document.getElementById(el).getAttribute('data-id') === prov) {
                document.getElementById(el).classList.add('active');
            } else {
                document.getElementById(el).classList.remove('active');
            }

            selector.value = prov;
            fireEvent(selector[0], 'change')
            if ((prov === 0) || (prov === '0') || (prov == null) || (prov === '')) {
                document.getElementById("hotel-1").classList.add('active');
            }
        });
    } else if (TYPE_SELECT === 'select') {
        selector.value = prov;
        fireEvent(selector[0], 'change')
    }
}

export const changeURL = (value) => {
    var hotel_id = "hotel_id";
    var regex = new RegExp(/hotel_id=[A-Za-z0-9_-]+/g);
    var getParams = window.location.search;
    var params_str = hotel_id + "=" + value;
    var path = "";
    if (getParams.indexOf(hotel_id) != -1) {
        path = getParams.replace(regex, params_str);
    } else {
        if (getParams == "") {
            path = getParams + '?' + params_str;
        } else {
            path = getParams + '&' + params_str;
        }
    }
    window.history.pushState(false, false, path);
}


export function fireEvent(element, event) {
    if (document.createEventObject) {
        var ieEvt = document.createEventObject();
        return element.fireEvent('on' + event, ieEvt);
    } else {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    }
}


function trackUserAction(data) {
    let roomList = null;
    let roomsFb;

    if (data.action === 'search-rooms') {
        roomsFb = data.rooms;
        roomList = getPricesFromStorage();

        if (getParameterByName('date'))    {
            let arrival = data.arrival;
            let departure = data.departure;
            let nights = diffDates(new Date(departure),  new Date(arrival));

            let date = "date";
            let regexDate = new RegExp(/date=[A-Za-z0-9_-]+/g);
            changeURLDate(date, regexDate, arrival)

            let nightsUrl = "nights";
            let regexNights = new RegExp(/nights=\d+/g);
            changeURLDate(nightsUrl, regexNights, nights)
        }

        roomsList(roomsFb, roomList);

    }

}
function noAvailableRooms(data) {
    let roomsFb = data.rooms;
    let roomList = getPricesFromStorage();
    roomsList(roomsFb, roomList);
}

export function bookingForm(roomTypes) {
    (function (w) {
        var q = [
            ['setContext', PROFILE_BOOKING, `${MAP_BOOKING_LANG}`],
            ['embed', 'booking-form', {
                container: 'tl-booking-form',
                roomType: roomTypes,
                autoScroll: 'none',
                onTrackUserAction: trackUserAction,
                onNoAvailableRooms: noAvailableRooms
            }]
        ];
        var h=["ru-ibe.tlintegration.ru","ibe.tlintegration.ru","ibe.tlintegration.com"];
        var t = w.travelline = (w.travelline || {}),
            ti = t.integration = (t.integration || {});
        ti.__cq = ti.__cq? ti.__cq.concat(q) : q;
        if (!ti.__loader) {
            ti.__loader = true;
            var d=w.document,c=d.getElementsByTagName("head")[0]||d.getElementsByTagName("body")[0];
            function e(s,f) {return function() {w.TL||(c.removeChild(s),f())}}
            (function l(h) {
                if (0===h.length) return; var s=d.createElement("script");
                s.type="text/javascript";s.async=!0;s.src="https://"+h[0]+"/integration/loader.js";
                s.onerror=s.onload=e(s,function(){l(h.slice(1,h.length))});c.appendChild(s)
            })(h);
        }
    })(window);

}
