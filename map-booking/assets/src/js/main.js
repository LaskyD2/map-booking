import {init, map} from './map.js';
import {accordion, getParameterByName, diffDates, changeURLDate} from './module/module.js';
import {setHotelsStorage} from './model/hotel-load.js';
import {setModuleLanguage} from "./module/module-language.js";
import {changeURL, onChangeMark, tabsBookingForm} from './booking-form.js';
import {changeDate} from "./model/price-load.js";
import {roomsList} from "./module/rooms-list.js";
import {TYPE_SELECT} from "./const.js";

import {HotelLoad as HotelLoadController} from './controller/hotel-load.js';


let isCheck = false, isCheckInner = true;

window.setTlHotel = () => {
    const hotelLoadController = new HotelLoadController();
     hotelLoadController.load()
        .then(() => {
            setModuleLanguage();
            accordion();
            setHotelsStorage();

            ymaps.ready(init);
            isCheck = true;
        });
};

document.addEventListener('DOMContentLoaded', () => {
    window.setTlHotel();
});

window.mapBookingHotel = (arrival, nights, adults, idHotel, type) => {

    if (TYPE_SELECT === 'inner') {
        if (isCheckInner) {
            checkFunctionStatus();
            tabsBookingForm(idHotel);
            isCheckInner = false;
        } else {
            if (type === 'inner') {
                onChangeMark(idHotel);
            }
        }
    } else {
        checkFunctionStatus();
        tabsBookingForm(idHotel);
    }

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

}

window.mapBookingApart = (roomsFb, arrival, departure) => {
    checkFunctionStatus();


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

}



