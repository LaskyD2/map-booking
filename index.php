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








<div class="tl-container">
    <ul class="bookmarks">
        <li id="hotel-1" data-id="44557"  class="active">
            <p class="hotel-class">Kravt Nevsky Hotel&nbsp;&&nbsp;SPA&nbsp;4*</p>
        </li>
        <li id="hotel-2" data-id="23132">
            <p class="hotel-class">Kravt Sadovaya Hotel&nbsp;3*</p>
        </li>

        <li id="hotel-3" data-id="23301">
            <p class="hotel-class">Albora Boutique Hotel&nbsp;5*</p>
        </li>
        <li id="hotel-4" data-id="39928">
            <p class="hotel-class">Kravt Hotel Kazan Airport&nbsp;4*</p>
        </li>
    </ul>



    <div class="map-booking map-show">
        <div class="map__wrapper">
            <div class="map__mobile-text">Чтобы переместить карту, проведите по ней двумя пальцами</div>
            <div id="map-be" class="map "></div>
        </div>
        <button class="accordion-map">
            <span class="accordion-text"></span>
        </button>
    </div>
    <div class="blocks ">
        <div class="blocks__booking-form">
            <select id="tl-hotel-select"></select>
            <div id="tl-booking-form"></div>
        </div>
    </div>
</div>

<script>

    /* var select = document.getElementById("tl-hotel-select");
     select.addEventListener('change', function () {
         var hotel_id = "hotel_id";
         var regex = new RegExp(/hotel_id=\d+/g);
         var getParams = window.location.search;
         var params_str = hotel_id + "=" + this.value;
         var path = "";
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
     });*/

    document.addEventListener('DOMContentLoaded', function(){
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

        var bookmarksElements = document.querySelectorAll('.bookmarks li');
        if (bookmarksElements != null) {
            for (var i = bookmarksElements.length - 1; i >= 0; i--) {
                var elem = bookmarksElements[i];
                (function(elem){
                    var prov = getParameterByName('hotel_id');
                    var el = elem.getAttribute('id');
                    if(document.getElementById(el).getAttribute('data-id') === prov) {
                        document.getElementById(el).classList.add('active');
                    }
                    else {
                        document.getElementById(el).classList.remove('active');
                    }

                    if((prov === 0) || (prov == null) || (prov === '0')) {
                        document.getElementById("hotel-1").classList.add('active');
                    }
                })(elem)
            }
        };

        var selector = document.getElementById('tl-hotel-select'),
            listElement = document.querySelectorAll('.bookmarks li[id ^="hotel-"]');

        if (listElement != null) {

            for (var i = listElement.length - 1; i >= 0; i--) {
                var elem = listElement[i];
                (function(elem){
                    elem.addEventListener("click", function () {
                        var listActiveElement = document.querySelector('.bookmarks li.active'),
                            data_id = document.getElementById(elem.getAttribute('id')).getAttribute('data-id');

                        listActiveElement.classList.remove('active');
                        document.getElementById(elem.getAttribute('id')).classList.add('active');
                        selector.value = data_id;
                        fireEvent(selector[0], 'change');
                    });
                })(elem)
            }
        };

        function fireEvent(element, event) {
            if (document.createEventObject) {
                var ieEvt = document.createEventObject();
                return element.fireEvent('on' + event, ieEvt);
            }
            else {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent(event, true, true);
                return !element.dispatchEvent(evt);
            }
        }
    });



    function trackUserAction(data) {
        if (data.action === 'search-rooms') {
            let roomsFb = data.rooms;
            let arrival = data.arrival;
            let departure = data.departure;
            let hotelId = data.providerId;

            mapBookingApart(roomsFb, arrival, departure, hotelId);
        }
    }
    function noAvailableRooms(data) {
        console.log(data)
        let arrival = data.arrival;
        let departure = data.departure;
        let hotelId = data.providerId;
            mapBookingApart([], arrival, departure, hotelId);

    }

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

    function scenarioChanged(data) {
        mapBookingHotel(arrival, nights, adults, data.scenario, 'inner');
    }


    (function (w) {
        var q = [
            ['setContext', 'TL-INT-arenda-vesta-ru_2025-09-08', 'ru'],
            ['embed', 'booking-form', {
                container: 'tl-booking-form',
                autoScroll: 'none',
                onTrackUserAction: trackUserAction,
                // onNoAvailableRooms: noAvailableRooms
                // onSearchRooms: searchRooms,
                // onScenarioChanged: scenarioChanged
            }]
        ];
        var h=["ru-ibe.tlintegration.ru","ibe.tlintegration.ru","ibe.tlintegration.com"];
        var t = w.travelline = (w.travelline || {}),
            ti = t.integration = (t.integration || {});
        ti.__cq = ti.__cq? ti.__cq.concat(q) : q;
        if (!ti.__loader) {
            ti.__loader = true;
            var d=w.document,c=d.getElementsByTagName("head")[0]||d.getElementsByTagName("body")[0];
            function e(s,f) {return function() {w.TL||(c.removeChild(s),f())}}
            (function l(h) {
                if (0===h.length) return; var s=d.createElement("script");
                s.type="text/javascript";s.async=!0;s.src="https://"+h[0]+"/integration/loader.js";
                s.onerror=s.onload=e(s,function(){l(h.slice(1,h.length))});c.appendChild(s)
            })(h);
        }
    })(window);

    (function() {
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
