import {LANG_SETTING} from '../lang.js';

export const templateIconContent = (text, price, id, idActive) => {
    const langMap = LANG_SETTING[MAP_BOOKING_LANG];
    const getArrivalDate =  localStorage.getItem('tl-arrivalDate');
    const loaderBlock = '<div class="loader"></div>'

    const content = {
        'loader': getArrivalDate ? loaderBlock : langMap.SelectDate,
        'price': price ? langMap.From + ' ' + price + ' ₽' : langMap.NoPlaces,
    }

    return (
        ` <div class="map__hint ${idActive == id ? 'active' : ''} ${price ? '' : 'no-rooms '}" id="${id}">
            <div class="map__hint-icon"></div>
            <div class="map__hint-price"> ${content[text]}</div>
          </div>`
    );
};

export const templateBalloonContent = (name, address, price, hotelId, idActive) => {
    const langMap = LANG_SETTING[MAP_BOOKING_LANG];

    const nameHotel = name[MAP_BOOKING_LANG];
    const addressHotel = address[MAP_BOOKING_LANG];
    const priceHotel = price ? langMap.From + ' ' + price + ' ₽' : langMap.NoPlaces;
    const ballonButton = `
        <div class="balloon-button">
                <a href="/booking/?hotel_id=${hotelId}&date=${new Date().toISOString().slice(0, 10)}&nights=1&adults=1" class="balloon-button__link">${langMap.Booking}</a>
        </div>`;
    return (
        `  <div class="map__balloon">
            <div class="balloon-hotel">${nameHotel}</div>
             <div class="balloon-address">${addressHotel}</div>
            <div class="balloon-price">${priceHotel}</div>
            ${(!idActive) ? ballonButton : ''}
        </div`
    )
};
