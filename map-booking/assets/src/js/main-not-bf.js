import {init} from './map.js';
import {accordion} from './module/module.js';
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
            changeDate(new Date().toISOString().slice(0, 10), 1, 1, false);
        });

};

document.addEventListener('DOMContentLoaded', () => {
    window.setTlHotel();
});
