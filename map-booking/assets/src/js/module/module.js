import {LANG_SETTING} from "../lang.js";
import { map } from '../map.js';

export const getParameterByName = (name, url) => {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


export const accordion = () => {

    let accText = document.querySelector(".accordion-text");

    const acc = document.querySelector(".accordion-map");
    const mapBooking = document.querySelector(".map-booking");
    const mapMobileText = document.querySelector(".map__mobile-text");

    if (mapBooking.classList.contains('map-show')) {
        accText.innerText = LANG_SETTING[MAP_BOOKING_LANG].MapClose;
    } else {
        accText.innerText = LANG_SETTING[MAP_BOOKING_LANG].MapShow;
    }

    acc.addEventListener("click", function() {
        mapBooking.classList.toggle("map-show");

        if (mapBooking.classList.contains('map-show')) {
            accText.innerText = LANG_SETTING[MAP_BOOKING_LANG].MapClose;
        } else {
            accText.innerText = LANG_SETTING[MAP_BOOKING_LANG].MapShow;
        }

    });

    mapMobileText.addEventListener("click", function() {
        this.style.display = 'none';
    });

    /* скроллинг к фб */
    let balloonRoom = document.querySelectorAll(".map__balloon-room");

    balloonRoom.forEach((btn) => {
        btn.addEventListener("click", handleButtonClick);
    })

}

export const diffDates = (day_one, day_two) => {
    return (day_one - day_two) / (60 * 60 * 24 * 1000);
};

export const handleButtonClick = () => {
    let bookingForm = document.getElementById("tl-booking-form");
    bookingForm.scrollIntoView({ block: "start", behavior: "smooth" });
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

export function declensionKvartira(number) {

    number = Math.abs(Math.floor(number));


    const lastDigit = number % 10;

    const lastTwoDigits = number % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${number} квартира`;
    }

    else if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
        return `${number} квартиры`;
    }

    else {
        return `${number} квартир`;
    }
}
