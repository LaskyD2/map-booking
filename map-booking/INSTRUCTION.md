# Модуль карты к форме бронирования

## Установка <a name="install"></a>

1. Скопируйте папку `map-booking` в корень сайта
2. Установите настройки модуля в файле [settings.json](core\settings\settings.json)

   Параметры:

* `hotels`: _array\<integer\>_ - отели, для которых необходимо метки на карте
* `apart`: _array\<integer\>_ - апартаменты/квартиры, для которых необходимо метки на карте
* `languages`: _array\<string\>_ - языка, на которых нужно выгрузить название отелей, адресов
* `currency`: _array\<string\>_ - валюта выгружаемых цен

```
Заполнять можно либо параметр hotels, либо apart. Одновременно оба параметра работать не будут.
```

3. Запускаем скрипт `\map-booking\core\hotel-api.php` для выгрузки информации об отелях и их номеров с ЛК.

   Запустить можно через командную строку в Open Server, либо сначала залить папку `map-booking` на сайт, и в поисковой
   строке прописать путь к файлу `www.домен.ru\map-booking\core\hotel-api.php`

4. После запуска скрипта проверяем файл `\map-booking\cache\hotel_list.json`, в ней хранится информация об отеле и
   номерах.

## Настройка цветовой темы и способа переключения между объктами

1. Настраиваем цветовую тему. В файле `map-booking\assets\src\css\style-setting.css` прописываем в переменную `--basic`
   основной используемый цвет. Метки на карте и заголовки будут отображаться данным цветом. Если нужны дополнительные
   стили, то можно просмотреть другие переменные, либо менять цвета в файле со
   стилями `map-booking\assets\src\css\style.css`

2. В файле `map-booking\assets\src\js\const.js` в переменной `TYPE_SELECT` прописываем тип переключения между объектами

* `tabs` - Переключение объектов с помощью кастомных табов
* `select` - Переключение объектов с помощью кастомного селекта
* `inner` - Переключение объектов с помощью встроенных внутрь формы бронирования табов или селекта

3. Далее скрипты нужно собрать в один файл. Для этого в папке `map-booking\assets\src` устанавливаем `node_modules` с помощюю команды `npm i`. Версии node `14.17.0`. 
Для сборки использовать команду `npm run build`.

## Подключеник карты к форме бронирования

1. В профиле интеграции включить работу с событиями
2. На страницу бронирования прописываем блок кода, где будет выводиться карта.
   1. Класс `map-show` оставляем, если нужна карта изначально открытой
   2. Класс `map-show` убираем, если нужна карта изначально закрытой
```
 <div class="map-booking map-show">
     <div class="map__wrapper">
         <div class="map__mobile-text">Чтобы переместить карту, проведите по ней двумя пальцами</div>
         <div id="map-be" class="map "></div>
     </div>
     <button class="accordion-map">
           <span class="accordion-text"></span>
     </button>
 </div>
```
3. Прописываем внизу скрипта формы бронирования скрипт подключения стилей, скрипта карты ФБ и Яндекс карты 
```  
        ......
        ......
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

<script type="module" src="/map-booking/assets/public/map-booking.js"></script>
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
```

4. Подключаем события в скрипте формы бронирования 
   

4.1. Если это отели, не апартаменты, то используем событие `onSearchRooms` и подключаем функцию
```
    let arrival, nights, adults, idHotel;
    function searchRooms(data) {
        arrival = data.arrivalDate;
        nights = data.nights;
        adults = data.guests[0].adults;
        idHotel = data.providerId;

        mapBookingHotel(arrival, nights, adults, idHotel);
    }
```

4.2. Если это апартаменты, то используем событие `onTrackUserAction` и подключаем функцию
```
    function trackUserAction(data) {
        if (data.action === 'search-rooms') {
            let roomsFb = data.rooms;
            let arrival = data.arrival;
            let departure = data.departure;

            mapBookingApart(roomsFb, arrival, departure);
        }
    }
```
5. Если `табы или селект встроенный`, и это `отели`, то прописываем дополнительно событие `onScenarioChanged` и подключаем функцию.
 Если `апартаменты`, то скрипт в процессе написания.
```
    function scenarioChanged(data) {
        mapBookingHotel(arrival, nights, adults, data.scenario, 'inner');
    }
```
