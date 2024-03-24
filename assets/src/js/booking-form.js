import { coordinatesCity, scenariosHotel } from './const.js'
import { getParameterByName, diffDates } from './module/module.js'
import { roomsList } from './module/rooms-list.js'
import { getRoomsFromStorage } from './model/room-load.js'
import { map, fillPoint } from './map.js'
import { placemarks } from "./model/placemarks.js";


export function tabsBookingForm() {
    let scenariosListHotel = scenariosHotel;
    let citySelector = document.querySelector('select.tl-city-select');
    let listElement = document.querySelectorAll('.bookmarks li[id ^="hotel-"]');

    const changeURL = (value) => {
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

    const selectCity = () => {
        let citySelector = document.querySelector('select.tl-city-select').value;
        let hotels = document.querySelectorAll('.tl-container .bookmarks li[id^="hotel-"]');

        hotels.forEach((hotel) => {
            let hotelCity = hotel.getAttribute('data-city');
            hotelCity === citySelector ? hotel.classList.remove('hidden') : hotel.classList.add('hidden');
            hotel.classList.remove('active')
        });

        document.querySelector(`[data-city="${citySelector}"]`).classList.add('active')

        bookingForm(scenariosListHotel[citySelector]);


    };


    selectCity();

    document.querySelectorAll('.bookmarks li').forEach(function (elem) {
        let prov = getParameterByName('hotel_id');
        let el = elem.getAttribute('id');

        if (document.getElementById(el).getAttribute('data-id') === prov) {
            document.getElementById(el).classList.add('active');
            citySelector.value = document.getElementById(el).getAttribute('data-city');
            bookingForm(scenariosListHotel[prov]) ;
        } else {
            document.getElementById(el).classList.remove('active');
        }

        if ((prov === 0) || (prov === '0') || (prov == null) || (prov === '')) {
            document.getElementById("hotel-1").classList.add('active');
        }
    });
    document.querySelectorAll('.bookmarks li').forEach(function (elem) {
        citySelector.value === document.getElementById(elem.getAttribute('id')).getAttribute('data-city') ?
            elem.classList.remove('hidden') : elem.classList.add('hidden');
    })

    listElement.forEach(function (elem) {
        elem.addEventListener("click", function () {
            let listActiveElement = document.querySelector('.bookmarks li.active'),
                data_id = document.getElementById(elem.getAttribute('id')).getAttribute('data-id');

            if (data_id === listActiveElement.getAttribute('data-id')) {
                return false;
            }
            listActiveElement.classList.remove('active');
            document.getElementById(elem.getAttribute('id')).classList.add('active');

            changeURL(data_id);
            bookingForm(scenariosListHotel[data_id]);

            fillPoint(placemarks());
            map.setCenter(coordinatesCity[citySelector.value], 12, {duration: 300});
        });
    });

    citySelector.addEventListener('change', function () {
        changeURL(this.value);
        selectCity();
        fillPoint(placemarks());
        map.setCenter(coordinatesCity[citySelector.value], 12, {duration: 300});
    });

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


function trackUserAction(data) {
    let roomList = null;
    let roomsFb;

    if (getParameterByName('date'))    {
        if (data.action === 'change-dates') {

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
    }


    if (data.action === 'search-rooms') {
        roomsFb = data.rooms;
        roomList = getRoomsFromStorage();

        roomsList(roomsFb, roomList);
    }

}

function noAvailableRooms(data) {
    let roomsFb = data.rooms;
    let roomList = getRoomsFromStorage();
    roomsList(roomsFb, roomList);
}


export function bookingForm(roomTypes) {
    (function (w) {
        var q = [
            ['setContext', 'TL-INT-letyourflat_2023-02-28', `${MAP_BOOKING_LANG}`],
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

