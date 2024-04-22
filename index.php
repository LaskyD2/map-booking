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

    <link rel="stylesheet" href="assets/src/css/style.css"

</head>
<body>

<div class="tl-container">
    <ul class="bookmarks clearfix">
        <li id="hotel-1" data-id="17892" class="active">
            <p class="hotel-class">Vertical Петербург</p>
        </li>
        <li id="hotel-2" data-id="16579">
            <p class="hotel-class">We&I Петербург</p>
        </li>
        <li id="hotel-2472" data-id="31447">
            <p class="hotel-class">We&I Ramada Петербург</p>
        </li>
        <li id="hotel-3" data-id="17997">
            <p class="hotel-class">Vertical Boutique Москва</p>
        </li>
    </ul>

    <div class="map__wrapper ">
        <div class="map__mobile-text">Чтобы переместить карту, проведите по ней двумя пальцами</div>
        <div id="map" class="map map-show"></div>
    </div>

    <button class="accordion">Развернуть карту</button>
    <div class="blocks ">
        <div class="blocks__booking-form"><select id="tl-hotel-select"></select>
            <div id="tl-booking-form"></div>
        </div>
    </div>
</div>


<script type="module" src="/assets/src/js/main.js"></script>
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"
        type="text/javascript"></script>
<!--<script src="https://api-maps.yandex.ru/2.1/?apikey=d2905f6d-3e1c-4841-b651-5790cd49c349&lang=ru_RU"
        type="text/javascript"></script>-->


</body>
</html>

