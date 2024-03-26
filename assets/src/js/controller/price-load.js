
export const changeDate = (roomList) => {

    setRoomsStorage();


}


export const fetchPrices = async () => {

    // const url = `/map-booking/core/price-api.php?date=${date}&nights=${nights}&hotelIds=${hotelIds}`;
    const url = `/map-booking/core/price-api.php?date=2024-03-27nights=3&hotelIds=17997`;

    console.log(url)

    const result = await fetch(url);
    if (!result.ok) {
        console.error('null');
    }
    return await result.json();
};

export const setRoomsStorage = () => {
    if (!localStorage.getItem('price-list')) {
        console.log(fetchPrices())
        fetchPrices()
            .then((prices) => {
                localStorage.setItem('price-list', JSON.stringify(prices));
            })
            .catch(() => {
                console.log('not load');
            });
    }
}

export const isStorageExpire = () => {
    return JSON.parse(localStorage.getItem('price-list'))
};
