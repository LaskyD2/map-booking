import {init, map} from './map.js';
import {accordion, getParameterByName, diffDates} from './module/module.js';
import {setHotelsStorage} from './model/hotel-load.js';
import {setModuleLanguage} from "./module/module-language.js";
import {changeURLDate, tabsBookingForm} from './booking-form.js';
import {changeDate} from "./model/price-load.js";
import {roomsList} from "./module/rooms-list.js";

import {HotelLoad as HotelLoadController} from './controller/hotel-load.js';

let isCheck = false;

window.setTlHotel = () => {
    const hotelLoadController = new HotelLoadController();
     hotelLoadController.load()
        .then(() => {
            setModuleLanguage();
            accordion();
            setHotelsStorage();
            tabsBookingForm();
            ymaps.ready(init);
            isCheck = true;
        });
};

document.addEventListener('DOMContentLoaded', () => {
    window.setTlHotel();
});

window.mapBookingHotel = (arrival, nights, adults, idHotel) => {
    function checkFunctionStatus() {
        if (isCheck) {
            changeDate(arrival, nights, adults, idHotel);
            map.balloon.close();
            if (getParameterByName('date')) {
                let date = "date";
                let regexDate = new RegExp(/date=[A-Za-z0-9_-]+/g);
                changeURLDate(date, regexDate, arrival)

                let nightsUrl = "nights";
                let regexNights = new RegExp(/nights=\d+/g);
                changeURLDate(nightsUrl, regexNights, nights);
            }

        } else {
            setTimeout(checkFunctionStatus, 300);
        }
    }
    checkFunctionStatus();
}

window.mapBookingApart = (roomsFb, arrival, departure) => {
    function checkFunctionStatus() {
        if (isCheck) {

            map.balloon.close();

            roomsList(roomsFb);

            if (getParameterByName('date')) {
                let date = "date";
                let regexDate = new RegExp(/date=[A-Za-z0-9_-]+/g);
                changeURLDate(date, regexDate, arrival)

                let nights = diffDates(new Date(departure),  new Date(arrival));
                let nightsUrl = "nights";
                let regexNights = new RegExp(/nights=\d+/g);
                changeURLDate(nightsUrl, regexNights, nights);
            }

        } else {
            setTimeout(checkFunctionStatus, 300);
        }
    }
    checkFunctionStatus();
}



