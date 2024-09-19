import { ZOOM_MAP } from './const.js'
import { getParameterByName } from './module/module.js'
import {map, geoObjects, cluster} from './map.js'
import { YM_COUNTER } from './settings.js'
import { placeMarks } from "./model/placemarks.js";

export function tabsBookingForm() {
    let listElement = document.querySelectorAll('.bookmarks li[id ^="hotel-"]');
    let selector = document.getElementById('tl-hotel-select');
    const bookmarksBlock = document.querySelector('.bookmarks');
    bookmarksBlock.scrollIntoView({ block: "start", behavior: "smooth" });

    // firstActiveTab();

    let placeMarksRoster = placeMarks();

    let selectorHotels = document.getElementById('tl-hotel-select');
    selectorHotels.addEventListener('change', function () {

        map.balloon.close();

        placeMarksRoster.forEach((item, i) => {
            let hotelId = geoObjects[i].properties.get('id');
            if (hotelId === this.value) {
                let iconContent =  geoObjects[i].properties.get('iconContent').replace('class="map__hint', 'class="map__hint active')
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

    listElement.forEach(function (elem, i) {
        elem.addEventListener("click", function () {
            let data_id = document.getElementById(elem.getAttribute('id')).getAttribute('data-id');


            map.balloon.close();
            // ym(YM_COUNTER,'reachGoal','click_on_tab');
            // console.log('click_on_tab');

            placeMarksRoster.forEach((item, i) => {
                let hotelId = geoObjects[i].properties.get('id');
                if (hotelId === data_id) {
                    let iconContent =  geoObjects[i].properties.get('iconContent').replace('class="map__hint', 'class="map__hint active')
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

export function firstActiveTab() {
    let prov = getParameterByName('hotel_id');
    let selector = document.getElementById('tl-hotel-select');

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

export function changeURLDate(param, regex, value) {
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

export function fireEvent(element, event) {
    if (document.createEventObject) {
        var ieEvt = document.createEventObject();
        return element.fireEvent('on' + event, ieEvt);
    }
    else {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    }
}

