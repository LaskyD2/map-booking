import {init} from './map.js';
import {accordion} from './module/module.js';
import {setHotelsStorage} from './model/hotel-load.js';
import {setModuleLanguage} from "./module/module-language.js";
import {tabsBookingForm} from './booking-form.js';

import {HotelLoad as HotelLoadController} from './controller/hotel-load.js';

window.setTlHotel = () => {
    const hotelLoadController = new HotelLoadController();

    hotelLoadController.load()
        .then(() => {
            setModuleLanguage();
            accordion();
            setHotelsStorage();
            tabsBookingForm();
            ymaps.ready(init);
        });
};

document.addEventListener('DOMContentLoaded', () => {
    window.setTlHotel();
});
