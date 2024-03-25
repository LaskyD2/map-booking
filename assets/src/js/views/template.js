import { LANG_SETTING } from '../lang.js';

export const templateIconContent = (text,name, price, id, count) => {
    const langMap = LANG_SETTING[MAP_BOOKING_LANG];
    const nameHotel = name[MAP_BOOKING_LANG]
    const getArrivalDate = localStorage.getItem('tl-arrivalDate');

    const content = {
        'loader' : getArrivalDate ? '<div class="loader"></div>' : langMap.SelectDate,
        'price' : price ? langMap.From + ' ' + price + ' ₽' : langMap.NoPlaces,
    }
    console.log(name[MAP_BOOKING_LANG])
    return (
        ` <div class="map__hint ${!price && 'no-rooms'}" id="${id}">
            <div class="map__hint-icon"></div>
            <div class="map__hint-name">${nameHotel}</div>

          </div>`
    );

    /*return (
        ` <div class="map__hint ${price ? '' : 'no-rooms'}" id="${id}">
            <div class="map__hint-icon"></div>
            <div class="map__hint-price"> ${content[text]} ${count > 1 ? ' (' + count + ' ' + langMap.Apartments + ')' : ''}</div>
          </div>`
    );*/
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
