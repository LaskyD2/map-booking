   function get_coords(address) {
        ymaps.geocode(address, { results: 1 }).then(function (res)
            {
                let firstGeoObject = res.geoObjects.get(0);
                let cords = firstGeoObject.geometry.getCoordinates();

                alert(cords[0]+' '+cords[1])
            },
            function (err)
            {
                alert(err.message);
            })

    }

    get_coords('Москва, Николоямский переулок, 3Ак3');
