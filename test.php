<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <script type="importmap">
    {
      "imports": {
        "dayjs": "https://cdn.skypack.dev/dayjs@1.11.5"
      }
    }

    </script>

    <!--    <link rel="stylesheet" href="/map-booking/assets/src/css/style.css">-->
</head>
<body>






<style>
    #tl-block-select {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-bottom: 20px;
    }

    .be-block__select {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        max-width: 489px;
        width: 100%;
        -webkit-transition: box-shadow .3s, opacity .3s;
        transition: box-shadow .3s, opacity .3s;
        border: 1px solid rgba(114, 114, 114, 0.27);
        border-radius: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 12px 35px 12px 17px;
        font: 16px "Open Sans", sans-serif;
        color: #3D3D3D;
        line-height: 21px;
        background: rgb(255, 255, 255) url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTkiIHZpZXdCb3g9IjAgMCAxOCAxOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuNSA3LjcwMDAxTDkgMTMuMUwxMy41IDcuNzAwMDFINC41WiIgZmlsbD0iIzU4QkRDQSIvPgo8L3N2Zz4K") no-repeat right 12px top 12px;
        text-overflow: ellipsis;
        height: auto;
    }

    .be-block__select:hover,
    .be-block__select:focus {
        -webkit-appearance: none;
        outline: none;
    }

    select::-ms-expand {
        display: none;
    }

    .show {
        display: block !important;
    }

    .be-providers option {
        display: none;
    }
    @media (max-width: 768px) {
        #tl-block-select {
            flex-direction: column;
            align-items: center;
        }
    }
</style>
<!-- NEW booking start TL Booking form script -->
<div class="tl-block">
    <div id="tl-block-select">
        <select class="be-block__select be-city">
            <option value="moscow" class="show">Москва</option>
            <option value="spb" class="show">Санкт-Петербург</option>
            <option value="moscowRegion" class="show">Московская Область</option>
            <option value="adler" class="show">Адлер</option>
            <option value="altai" class="show">Алтай</option>
            <option value="astrakhan" class="show">Астрахань</option>
            <option value="vladikavkaz" class="show">Владикавказ</option>
            <option value="volgograd" class="show">Волгоград</option>
            <option value="voronezh" class="show">Воронеж</option>
            <option value="grozny" class="show">Грозный</option>
            <option value="dombai" class="show">Домбай</option>
            <option value="ekaterinburg" class="show">Екатеринбург</option>
            <option value="izhevsk" class="show">Ижевск</option>
            <option value="kazan" class="show">Казань</option>
            <option value="karelia" class="show">Карелия</option>
            <option value="kogalym" class="show">Когалым</option>
            <option value="murmansk" class="show">Мурманск</option>
            <option value="novosibirsk" class="show">Новосибирск</option>
            <option value="omsk" class="show">Омск</option>
            <option value="sochi" class="show">Сочи</option>
            <option value="ulanUde" class="show">Улан-Удэ</option>
            <option value="yaroslavl" class="show">Ярославль</option>
        </select>
        <select class="be-block__select be-providers">
            <option value="15937">Cosmos Selection Moscow Sheremetyevo Airport Hotel (5*)</option>
            <option value="15936">Cosmos Moscow Sheremetyevo Airpot Hotel (4*)</option>
            <option value="17226">Cosmos Moscow Paveletskaya Hotel 4*</option>
            <option value="3220">Intourist Hotel Kolomenskoe (4*)</option>
            <option value="100">Cosmos Moscow VDNH Hotel (3*)</option>
            <option value="17115">Cosmos Smart Moscow Dubininskaya Hotel (3*)</option>
            <option value="39932">Cosmos Smart Moscow Semenovskaya</option>
            <option value="14875">Cosmos Stay Moscow Profsoyuznaya Hotel</option>
            <option value="55531">Cosmos Selection Moscow Arbat</option>

            <option value="38366">Cosmos Selection Saint-Petersburg Italyanskaya Hotel (5*)</option>
            <option value="16125">Cosmos Selection Saint-Petersburg Nevsky Royal Hotel (5*)</option>
            <option value="16126">Cosmos Saint-Petersburg Nevsky Hotel (4*)</option>
            <option value="16124">Cosmos Saint-Petersburg Pribaltiyskaya Hotel (4*)</option>
            <option value="16127">Cosmos Saint-Petersburg Pulkovskaya Hotel (4*)</option>
            <option value="16128">Cosmos Saint-Petersburg Pulkovo Airport Hotel (4*)</option>
            <option value="28991">Cosmos Saint-Petersburg Olympia Garden Hotel (4*)</option>

            <option value="5881">Cosmos Collection Izumrudny Les (5*)</option>
            <option value="17135">Кампус СберУниверситета 5*</option>
            <option value="24047">PSB Patriot (4*)</option>

            <option value="149">Cosmos Collection Altay Resort (5*)</option>

            <option value="4761">Cosmos Astrakhan Hotel (4*)</option>

            <option value="4422">Cosmos Volgograd Hotel (4*)</option>

            <option value="17759">Cosmos Smart Voronezh Hotel (3*)</option>

            <option value="1502">Cosmos Selection Grozny City (5*)</option>

            <option value="47738">Cosmos Selection Dombay Diamond Hotel 5*</option>

            <option value="16122">Cosmos Ekaterinburg Hotel (4*)</option>

            <option value="1140">Cosmos Izhevsk Hotel (4*)</option>

            <option value="12041">Cosmos Kazan Hotel (4*)</option>

            <option value="607">Cosmos Petrozavodsk Hotel (4*)</option>
            <option value="22007">Cosmos Smart Segezha (3*)</option>
            <option value="13804">Cosmos Karelia</option>

            <option value="28125">Cosmos Smart Kogalym Hotel (3*)</option>

            <option value="16132">Cosmos Murmansk Hotel (4*)</option>

            <option value="4755">Cosmos Novosibirsk Hotel (4*)</option>

            <option value="32846">Cosmos Omsk Hotel (4*)</option>

            <option value="4760">Cosmos Sochi Hotel (4*)</option>
            <option value="28308">Cosmos Stay Le Rond Sochi (4*)</option>

            <option value="3808">Cosmos Selection Ulan-Ude (5*)</option>

            <option value="4763">Cosmos Yaroslavl Hotel (4*)</option>

            <option value="39193">Cosmos Adler Hotel</option>

            <option value="53373">Cosmos Vladikavkaz La Vallee Hotel</option>

        </select>
    </div>

    <div class="map-booking">
        <div class="map__wrapper">
            <div class="map__mobile-text">Чтобы переместить карту, проведите по ней двумя пальцами</div>
            <div id="map-be" class="map "></div>
        </div>
        <button class="accordion-map">
            <span class="accordion-text"></span>
        </button>
    </div>

    <div id="tl-booking-form"></div>
</div>


<script>



    let arrival, nights, adults, idHotel;
    function searchRooms(data) {
        if (arrival !== data.arrivalDate) {
            arrival = data.arrivalDate;
            nights = data.nights;
            adults = data.guests[0].adults;
            idHotel = data.providerId;

            mapBookingHotel(arrival, nights, adults, idHotel);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const PROVIDERS = {
            "moscow": [15937, 15936, 17226, 3220, 100, 17115, 39932, 14875, 55531],
            "spb": [38366, 16125, 16126, 16124, 16127, 16128, 28991],
            "moscowRegion": [5881, 24047, 17135],
            "adler": [39193],
            "altai": [149],
            "astrakhan": [4761],
            "volgograd": [4422],
            "voronezh": [17759],
            "grozny": [1502],
            "ekaterinburg": [16122],
            "izhevsk": [1140],
            "kazan": [12041],
            "karelia": [607, 22007, 13804],
            "kogalym": [28125],
            "murmansk": [16132],
            "novosibirsk": [4755],
            "omsk": [32846],
            "sochi": [4760, 28308, 39193],
            "ulanUde": [3808],
            "yaroslavl": [4763],
            "dombai": [47738],
            "vladikavkaz": [53373]
        };

        let beCities = document.querySelector('.be-city'),
            beBlockProviders = document.querySelector('.be-providers'),
            beProviders = document.querySelector('.be-providers').options,
            titleSelect;

        hotelUrl();

        beCities.addEventListener('change', function () {
            loadSelect(this.value);
            console.log(this.value);
        });

        beBlockProviders.addEventListener('change', function () {
            bookingForm(this.value);
            console.log(this.value);
        });


        function loadSelect(city, id = false) {
            for (let provider of beProviders) {
                provider.classList.remove('show');
            }
            PROVIDERS[city].forEach((cityProviders) => {
                for (let provider of beProviders) {
                    if (Number(provider.value) === cityProviders) {
                        if (!titleSelect)
                            titleSelect = provider.value;
                        provider.classList.add('show');
                        console.log('show');
                    }
                }
            });
            beBlockProviders.value = id ? id : titleSelect;
            titleSelect = '';
            bookingForm(beBlockProviders.value);
        }

        function bookingForm(id = PROVIDERS['moscow'][0]) {
            changeUrl(id);
            (function (w) {

                function onConnectHandler(app) {
                    app.updateGuestToken("");
                }

                var q = [
                    ['setContext', 'TL-INT-cosmosgroup.' + id, "ru"],
                    ['embed', 'booking-form', {
                        container: 'tl-booking-form',

                        onConnect: onConnectHandler,
                        onSearchRooms: searchRooms
                    }]
                ];
                var h = ["ru-ibe.tlintegration.ru", "ibe.tlintegration.ru", "ibe.tlintegration.com"];
                var t = w.travelline = (w.travelline || {}),
                    ti = t.integration = (t.integration || {});
                ti.__cq = ti.__cq ? ti.__cq.concat(q) : q;
                if (!ti.__loader) {
                    ti.__loader = true;
                    var d = w.document, c = d.getElementsByTagName("head")[0] || d.getElementsByTagName("body")[0];

                    function e(s, f) {
                        return function () {
                            w.TL || (c.removeChild(s), f())
                        }
                    }

                    (function l(h) {
                        if (0 === h.length) return;
                        var s = d.createElement("script");
                        s.type = "text/javascript";
                        s.async = !0;
                        s.src = "https://" + h[0] + "/integration/loader.js";
                        s.onerror = s.onload = e(s, function () {
                            l(h.slice(1, h.length))
                        });
                        c.appendChild(s)
                    })(h);
                }
            })(window);
        }

        function hotelUrl() {
            let hotelUrl = getParameterByName("hotel") ? getParameterByName("hotel") : 15937;
            let cityActive = getParameterByName("city");

            beBlockProviders.value = hotelUrl;

            if (!cityActive) {
                for (let city in PROVIDERS) {
                    if (PROVIDERS[city].includes(Number(hotelUrl)))
                        cityActive = city;
                }
            }

            beCities.value = cityActive;
            loadSelect(cityActive, hotelUrl);
        }

        function changeUrl(id) {
            let hotel_id = "hotel";
            let regex = new RegExp(/hotel=\d+/g);
            let getParams = window.location.search;
            let params_str = hotel_id + "=" + id;
            let path = "";
            if (getParams.indexOf(hotel_id) != -1) {
                path = getParams.replace(regex, params_str);
            } else {
                if (getParams == "") {
                    path = getParams + '?' + params_str;
                } else {
                    path = getParams + '&' + params_str;
                }
            }
            window.history.pushState(false, false, path);
        }

        function getParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    });

    (function () {
        var css = document.createElement("link");
        css.href = "/map-booking/assets/src/css/style.css?v=1.0.0";
        css.rel = "stylesheet";
        document.head.appendChild(css);

    })(window, document);

</script>


<script type="module" src="/map-booking/assets/src/js/main.js"></script>
<!--<script type="module" src="/map-booking/assets/public/map-booking.js"></script>-->
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"
        type="text/javascript"></script>

</body>
</html>

<style>
    .tl-city-select {
        font-family: 'Montserrat', sans-serif !important;
        font-weight: 400 !important;
        font-size: 16px !important;
        line-height: 20px !important;
        color: #636261 !important;
        background: #fff url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDAuNTk5OTc2TDYgNy43OTk5N0wxMiAwLjU5OTk3NkgwWiIgZmlsbD0iI0U1OEYzRCIvPgo8L3N2Zz4K") no-repeat right/45px 9px !important;
        border: 1px solid #7F7165 !important;
        -webkit-appearance: none !important;
        appearance: none !important;
        padding: 15px 55px 15px 30px !important;
        width: 100% !important;
        margin-bottom: 15px;
    }
    .tl-city-select::-ms-expand {
        display: none;
    }
    .tl-container {
        max-width: 1440px;
        margin: 25px auto 0;
        position: relative;
        display: block;
    }

    .tl-container h4 {
        margin-bottom: 18px;
    }

    .bookmarks {
        width: 100%;
        padding: 0!important;
        margin: 0 0 10px 0!important;
        list-style: none !important;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 15px;
    }

    .bookmarks li.active {
        cursor: default;
        background-color: #7F7165;
        color: #FFFFFF;
    }

    .bookmarks li {
        background-color: #F9F5F1;
        cursor: pointer;
        padding: 15px;
        margin: 0;
        min-height: 26px;
        position: relative;
        z-index: 99;
        font-family: 'Montserrat', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #7F7165;
    }

    .bookmarks li:hover {
        background-color: #7F7165;
        color: #FFFFFF;
    }

    .bookmarks li.hidden {
        display: none;
    }

    /*#tl-hotel-select {*/
    /*    display: none !important;*/
    /*}*/

    @media (max-width: 710px) {
        .bookmarks {
            grid-template-columns: repeat(2, 1fr);
        }
    }


</style>
