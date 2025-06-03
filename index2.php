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
    <link rel="stylesheet" href="/map-booking/assets/src/css/style.css"
</head>
<body>
<div class="map-booking map-show">
    <div class="map__wrapper">
        <div class="map__mobile-text">Чтобы переместить карту, проведите по ней двумя пальцами</div>
        <div id="map-be" class="map "></div>
    </div>
</div>

<script type="module" src="/map-booking/assets/src/js/main-not-bf.js"></script>
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"
        type="text/javascript"></script>
</body>
</html>
