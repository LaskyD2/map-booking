export const minPrice = (hotels, adults) => {
    const resultMinPrices = {};

    const ageKey = String(adults);
    Object.keys(hotels).forEach((hotelId) => {
        const pricesForCurrentHotelAndAdults = [];
        Object.values(hotels[hotelId]).forEach((roomPrices) => {
            const price = roomPrices[ageKey];
            if (typeof price === 'number' && Number.isFinite(price)) {
                pricesForCurrentHotelAndAdults.push(price);
            }
        });
        if (pricesForCurrentHotelAndAdults.length > 0) {
            resultMinPrices[hotelId] = Math.min(...pricesForCurrentHotelAndAdults);
        }
    });

    return resultMinPrices;
};
