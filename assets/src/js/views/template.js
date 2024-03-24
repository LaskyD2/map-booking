import { LANG_SETTING } from '../lang.js';

export const templateIconContent = (text, price, id, count) => {
    const content = {
        'loader' : localStorage.getItem('tl-arrivalDate') ? '<div class="loader"></div>' : LANG_SETTING[MAP_BOOKING_LANG].SelectDate,
        'price' : price ? LANG_SETTING[MAP_BOOKING_LANG].From + ' ' + price + ' ₽' : LANG_SETTING[MAP_BOOKING_LANG].NoPlaces,
    }
    return (
        ` <div class="map__hint ${price ? '' : 'no-rooms'}" id="${id}">
            <div class="map__hint-icon"></div>
            <div class="map__hint-price"> ${content[text]} ${count > 1 ? ' (' + count + ' ' + LANG_SETTING[MAP_BOOKING_LANG].Apartments + ')' : ''}</div>
          </div>`
    );
};


export const templateBalloonContent = (address, rooms) => {
    return (
        `  <div class="map__balloon">
            <div class="map__balloon-address">${address}</div>
            ${templateBalloonContentRoom(rooms)}
        </div`
    )
};

function templateBalloonContentRoom(rooms) {
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
}

export const templateClusterContent = (length) => {
    length = length ? length : '';
    return ymaps.templateLayoutFactory.createClass(
        `  <div class="map__cluster">
                <div class="map__cluster-in">${length}</div>
            </div
        `
    )
};
