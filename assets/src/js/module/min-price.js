export const minPrice = (hotels) => {
    let minPrice = [];
    console.log(hotels)
    Object.keys(hotels).map((hotel) => {
        let priceRoom = [];
        Object.values(hotels[hotel]).map((rooms) => {
            priceRoom.push(rooms);
        })
        minPrice[hotel] = Math.min.apply(null,priceRoom)
    })
    return minPrice;
}
