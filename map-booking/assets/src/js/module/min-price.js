export const minPrice = (hotels, adults) => {
    let minPrice = [];
    let priceRoom = [];

    Object.keys(hotels).map((hotel) => {
        priceRoom = [];
        Object.values(hotels[hotel]).map((room) => {
            priceRoom.push(room[adults]);
        })
        minPrice[hotel] = Math.min.apply(null, priceRoom)
    })
    return minPrice;
}
