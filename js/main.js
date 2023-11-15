import { init } from './map.js';
import { accordion } from './module/module.js';
import { setRoomsStorage } from './model/room-load.js';
import { setModuleLanguage } from "./module/module-language.js";
import { startScenariosHotel } from './const.js';
import { tabsBookingForm } from './booking-form.js';

setModuleLanguage();
accordion();
setRoomsStorage();
startScenariosHotel();
tabsBookingForm();

ymaps.ready(init);