export const fetchPrices = async () => {
    const result = await fetch('./cache/room_list.json');
    if (!result.ok) {
        console.error('null');
    }
    return await result.json();
};

export const setRoomsStorage = () => {
    if (!localStorage.getItem('room-list')) {
        fetchPrices()
            .then((rooms) => {
                localStorage.setItem('room-list', JSON.stringify(rooms));
            })
            .catch(() => {
                console.log('not load');
            });
    }
}

export const isStorageExpire = () => {
    return JSON.parse(localStorage.getItem('room-list'))
};
