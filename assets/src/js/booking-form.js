import { getParameterByName } from './module/module.js'
import { changeDate } from './model/price-load.js'
import {map, geoObjects} from './map.js'
import { placeMarks } from "./model/placemarks.js";

export function tabsBookingForm() {
    let listElement = document.querySelectorAll('.bookmarks li[id ^="hotel-"]');

    firstActiveTab();

    let placeMarksRoster = placeMarks();

    listElement.forEach(function (elem, i) {
        elem.addEventListener("click", function () {
            let listActiveElement = document.querySelector('.bookmarks li.active'),
                data_id = document.getElementById(elem.getAttribute('id')).getAttribute('data-id');

            if (data_id === listActiveElement.getAttribute('data-id')) {
                return false;
            }
            listActiveElement.classList.remove('active');
            document.getElementById(elem.getAttribute('id')).classList.add('active');

            map.balloon.close();

            placeMarksRoster.forEach((item, i) => {
                let hotelId = geoObjects[i].properties.get('id');
                if (hotelId === data_id) {
                    let iconContent =  geoObjects[i].properties.get('iconContent').replace('class="map__hint', 'class="map__hint active')
                    let coords = geoObjects[i].geometry.getCoordinates();
                    map.setCenter(coords, 10, {duration: 300})
                    geoObjects[i].properties.set('iconContent', iconContent);
                    setTimeout(() => geoObjects[i].balloon.open(), 350);

                } else {
                    let iconContentDisabled = geoObjects[i].properties.get('iconContent').replace('class="map__hint active', 'class="map__hint');
                    geoObjects[i].properties.set('iconContent', iconContentDisabled);
                }
            })
            changeURL(data_id);
            bookingForm(data_id);
        });
    });
}

export function firstActiveTab() {
    let prov = getParameterByName('hotel_id');

    document.querySelectorAll('.bookmarks li').forEach(function (elem) {
        let el = elem.getAttribute('id');

        if (document.getElementById(el).getAttribute('data-id') === prov) {
            document.getElementById(el).classList.add('active');
        } else {
            document.getElementById(el).classList.remove('active');
        }

        bookingForm();
        if ((prov === 0) || (prov === '0') || (prov == null) || (prov === '')) {
            document.getElementById("hotel-1").classList.add('active');
        }
    });
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

function changeURLDate(param, regex, value) {
    var getParams = window.location.search;
    var params_str = param + "=" + value;
    var path = "";
    if (getParams.indexOf(param) != -1) {
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

let arrival;
function searchRooms(data) {
    if (arrival !== data.arrivalDate) {
        arrival = data.arrivalDate;
        let nights = data.nights;
        let adults = data.guests[0].adults;
        let idHotel = data.providerId;
        map.balloon.close();
        changeDate(arrival, nights, adults, idHotel);

        if (getParameterByName('date')) {
            let date = "date";
            let regexDate = new RegExp(/date=[A-Za-z0-9_-]+/g);
            changeURLDate(date, regexDate, arrival)

            let nightsUrl = "nights";
            let regexNights = new RegExp(/nights=\d+/g);
            changeURLDate(nightsUrl, regexNights, nights);
        }
    }
}

export function bookingForm() {
    (function (w) {
        var q = [
            ['setContext', `TL-INT-becar-group`, `${MAP_BOOKING_LANG}`],
            ['embed', 'booking-form', {
                container: 'tl-booking-form',
                autoScroll: 'none',
                onSearchRooms: searchRooms,
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

