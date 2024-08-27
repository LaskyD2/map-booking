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

    <link rel="stylesheet" href="/map-booking/assets/src/css/style.css">
</head>
<body>

<div class="tl-container">
    <ul class="bookmarks">
        <li id="hotel-1" data-id="18115">
            <p class="hotel-class">Kravt Nevsky Hotel&nbsp;&&nbsp;SPA&nbsp;4*</p>
        </li>
        <li id="hotel-2" data-id="5128" class="active">
            <p class="hotel-class">Kravt Sadovaya Hotel&nbsp;3*</p>
        </li>

        <li id="hotel-3" data-id="11535">
            <p class="hotel-class">Albora Boutique Hotel&nbsp;5*</p>
        </li>
        <li id="hotel-4" data-id="21849">
            <p class="hotel-class">Kravt Hotel Kazan Airport&nbsp;4*</p>
        </li>
        <li id="hotel-5" data-id="45902">
            <p class="hotel-class">Kravt Hotel Innopolis</p>
        </li>
    </ul>


    <div class="map__wrapper ">
        <div class="map__mobile-text">Чтобы переместить карту, проведите по ней двумя пальцами</div>
        <div id="map-be" class="map map-show"></div>
    </div>
    <button class="accordion active">
              <span class="accordion-text">
                  Свернуть карту
              </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" transform="matrix(1 0 0 -1 0 24)" fill="white"/>
            <path d="M11.4143 7.05384L5.5 13.0321C5.18 13.3521 5.18 13.8641 5.5 14.2161L6.108 14.7601C6.428 15.0801 6.94 15.0801 7.26 14.7601L11.9903 9.96584L16.7206 14.7601C17.0406 15.0801 17.5526 15.0801 17.8726 14.7601L18.4486 14.1841C18.7686 13.8641 18.7686 13.3521 18.4486 13.0001L12.5663 7.02184C12.2463 6.73384 11.7343 6.73384 11.4143 7.05384Z" fill="#333333"/>
        </svg>
    </button>

    <div class="blocks ">
        <div class="blocks__booking-form"><select id="tl-hotel-select"></select>
            <div id="tl-booking-form"></div>
        </div>
    </div>
</div>


<script type="module" src="/map-booking/assets/src/js/main.js"></script>
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"
        type="text/javascript"></script>

</body>
</html>

