import {LANG_SETTING} from '../lang.js';

export const templateIconContent = (text, price, id, idActive) => {
    const langMap = LANG_SETTING[MAP_BOOKING_LANG];
    const getArrivalDate = localStorage.getItem('tl-arrivalDate');
    const loaderBlock = '<div class="loader"></div>'

    const content = {
        'loader': getArrivalDate ? loaderBlock : langMap.SelectDate,
        'price': price ? langMap.From + ' ' + price + ' ₽' : langMap.NoPlaces,
    }

    return (
        ` <div class="map__hint ${price ? '' : 'no-rooms'} ${idActive == id ? 'active' : '' } " id="${id}">
            <div class="map__hint-icon"></div>
            <div class="map__hint-price"> ${content[text]}</div>
          </div>`
    );
};

export const templateBalloonContent = (name, address, price) => {
    const langMap = LANG_SETTING[MAP_BOOKING_LANG];
    const nameHotel = name[MAP_BOOKING_LANG];
    const addressHotel = address[MAP_BOOKING_LANG];
    const priceHotel = price ? langMap.From + ' ' + price + ' ₽' : langMap.NoPlaces;
    return (
        `  <div class="map__balloon">
            <div class="balloon-hotel">${nameHotel}</div>
             <div class="balloon-address">${addressHotel}</div>
            <div class="balloon-price">${priceHotel}</div>
        </div`
    )
};

/*function templateBalloonContentRoom(rooms) {
    return rooms.length ?
        rooms.map((room) =>
            ` <div class="map__balloon-room">
                     <div class="map__balloon-room-name">${room.room[MAP_BOOKING_LANG]}</div>
                     <div class="map__balloon-room-status ${!!room.price}">${room.price ? LANG_SETTING[MAP_BOOKING_LANG].From + ' ' + room.price + ' ₽' : LANG_SETTING[MAP_BOOKING_LANG].Busy}</div>
                </div>`
        ).join('') :
        ` <div class="map__balloon-room">
             <div class="map__balloon-room-name">${LANG_SETTING[MAP_BOOKING_LANG].NoPlaces}</div>
        </div>`
}*/

export const templateClusterContent = (length) => {
    length = length ? length : '';
    return ymaps.templateLayoutFactory.createClass(
        `  <div class="map__cluster">
                <div class="map__cluster-in">${length}</div>
            </div
        `
    )
};
