<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <link rel="stylesheet" href="./css/style.css"

</head>
<body>


    <div class="tl-container">
        <select class="tl-city-select">
            <option value="spb">Санкт-Петербург</option>
            <option value="msk">Москва</option>
        </select>
        <ul class="bookmarks" >
            <li id="hotel-1" class="hidden active" data-id="spb" data-city="spb">Все объекты</li>
            <li id="hotel-2" class="hidden" data-id="spb_studio" data-city="spb">Студии</li>
            <li id="hotel-3" class="hidden" data-id="sbp_1-bedroom" data-city="spb">1 спальня</li>
            <li id="hotel-4" class="hidden" data-id="sbp_2-bedroom" data-city="spb">2 спальни</li>
            <li id="hotel-5" class="hidden" data-id="sbp_3-bedroom" data-city="spb">3 спальни</li>
            <li id="hotel-6" class="hidden" data-id="spb_breakfast" data-city="spb">Можно заказать завтрак</li>
            <li id="hotel-7" class="hidden" data-id="spb_pet" data-city="spb">Проживание с питомцами</li>
            <li id="hotel-8" class="hidden" data-id="spb_parking" data-city="spb">Есть парковка</li>
            <li id="hotel-9" class="hidden" data-id="spb_conditioner" data-city="spb">Кондиционер</li>
            <li id="hotel-10" class="hidden" data-id="spb_elevator" data-city="spb">Лифт</li>
            <li id="hotel-11" class="hidden" data-id="msk" data-city="msk">Москва</li>
        </ul>


        <div class="map__wrapper">
            <div class="map__mobile-text">Чтобы переместить карту, проведите по ней двумя пальцами</div>
            <div id="map" class="map"></div>
        </div>

        <button class="accordion">Развернуть карту</button>

        <div class="blocks">
            <div class="blocks__booking-form">
                <select id="tl-hotel-select"></select>
                <div id="tl-booking-form"></div>
            </div>
        </div>
    </div>

    <script type="module" src="/js/main.js"></script>
   <!-- <script src="https://api-maps.yandex.ru/2.1/?apikey=d2905f6d-3e1c-4841-b651-5790cd49c349&lang=ru_RU" type="text/javascript"></script>-->
<!--    <script src="https://api-maps.yandex.ru/2.1/?lang=en_RU" type="text/javascript"></script>-->
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>



</body>
</html>

