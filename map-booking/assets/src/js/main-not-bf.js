import {init, map} from './map.js';
import {changeURLDate, getParameterByName} from './module/module.js';
import {setHotelsStorage} from './model/hotel-load.js';
import {setModuleLanguage} from "./module/module-language.js";
import {changeDate} from "./model/price-load.js";

import {HotelLoad as HotelLoadController} from './controller/hotel-load.js';

let isCheck = false;


window.setTlHotel = () => {
    const hotelLoadController = new HotelLoadController();
    hotelLoadController.load()
        .then(() => {
            setModuleLanguage();
            setHotelsStorage();
            ymaps.ready(init);
            isCheck = true;
            let date = getParameterByName('date') ? getParameterByName('date'): new Date().toISOString().slice(0, 10);
            let nights = getParameterByName('nights') ? getParameterByName('nights'): 1;
            let adults = getParameterByName('adults') ? getParameterByName('adults'): 2;

            checkFunctionStatus(date, nights, adults, isCheck);


        });

};

function checkFunctionStatus(date, nights, adults, isCheck) {
    if (isCheck) {
        changeDate(date, nights, adults, false);

    } else {
        setTimeout(checkFunctionStatus, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.setTlHotel();
});
