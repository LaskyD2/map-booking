export const minPrice = (hotels, adults) => {
    console.log(hotels);
    console.log(adults);
    let minPrice = [];
    let priceRoom = [];
    Object.keys(hotels).map((hotel) => {
        priceRoom = [];
        console.log(hotel)
        Object.values(hotels[hotel]).map((rooms) => {
            Object.values(rooms).map((i) => {
                priceRoom.push(i[adults]);
            })
            console.log(priceRoom)
        })
        minPrice[hotel] = Math.min.apply(null,priceRoom)
    })
    return minPrice;
}
