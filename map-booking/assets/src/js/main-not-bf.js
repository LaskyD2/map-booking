import {init} from './map.js';
import {accordion, getParameterByName} from './module/module.js';
import {setHotelsStorage} from './model/hotel-load.js';
import {setModuleLanguage} from "./module/module-language.js";
import {changeDate} from "./model/price-load.js";

import {HotelLoad as HotelLoadController} from './controller/hotel-load.js';

window.setTlHotel = () => {
    const hotelLoadController = new HotelLoadController();

    hotelLoadController.load()
        .then(() => {
            setModuleLanguage();
            setHotelsStorage();
            ymaps.ready(init);

            let date = getParameterByName('date') ? getParameterByName('date'): new Date().toISOString().slice(0, 10);
            let nights = getParameterByName('nights') ? getParameterByName('nights'): 1;
            let adults = getParameterByName('adults') ? getParameterByName('adults'): 1;
            changeDate(date, nights, adults, false);
        });

};

document.addEventListener('DOMContentLoaded', () => {
    window.setTlHotel();
});
