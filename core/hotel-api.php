<?php

$hotelCode = 15121;
$languages = ["ru", "en"];

function requestHotel($url) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);

    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Content-Type: application/json",
        "Accept: application/json, text/plain, */*",
        "X-TravelLine-ApiKey: ec36326b2ebf73789050fa91fbe041b6"
    ));

    $hostGet = curl_exec($ch);
    curl_close($ch);

    return $hostGet;
}

function getRoom($roomDate, $lang) {
    $room = [];
    $room['room'][$lang] = $roomDate['name'];
    $room['id'] = $roomDate['code'];
    $room['city'] = $roomDate['contact_info']['addresses'][0]['city_name'];
    $room['address'][$lang] = $roomDate['contact_info']['addresses'][0]['city_name'] . ', ' .  $roomDate['contact_info']['addresses'][0]['address_line'][0];
    $room['price'] = null;

    $coordinates = requestAddress($room['address'][$lang]);
    $room['longitude'] = $coordinates[0];
    $room['latitude'] = $coordinates[1];


    return $room;
}

function getRoomLang($roomDate, $lang) {
    $room = [];
    $room['room'][$lang] = $roomDate['name'];
    $room['address'][$lang] = $roomDate['contact_info']['addresses'][0]['city_name'] . ', ' .  $roomDate['contact_info']['addresses'][0]['address_line'][0];

    return $room;
}

function getRoomList($roomsList, $responseMas, $lang, $value) {

    $roomsInfo = $responseMas['hotels']['0']['room_types'];

    foreach ($roomsInfo as $i => $currRoomData) {
       if ($value == 0) {
           $roomsList[$i] = getRoom($currRoomData, $lang);
       } else {
           $roomsList[$i]['room'] += array_merge($roomsList[$i]['room'], getRoomLang($currRoomData, $lang)['room']);
           $roomsList[$i]['address'] += array_merge($roomsList[$i]['address'], getRoomLang($currRoomData, $lang)['address']);
       }
    }


    return $roomsList;
}

function correctLanguages($lang)
{
    $LANG_CODE_LONG = 4;
    $LANG_CODE_SHORT = 2;

    $languageCodes = [];

    if (strlen($lang) === $LANG_CODE_LONG) {
        $languageCodes[] = $lang;
    } else {
        if (strlen($lang) != $LANG_CODE_SHORT) {
            $lang = substr($lang, 0, $LANG_CODE_SHORT);
        }
        $languageCodes[] = strtolower($lang) . '-' . strtolower($lang);
    }

    return $languageCodes;
}

function requestAddress($address)
{

    $ch = curl_init('https://geocode-maps.yandex.ru/1.x/?apikey=d2905f6d-3e1c-4841-b651-5790cd49c349&format=json&geocode=' . urlencode($address));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, false);
    $addressList = curl_exec($ch);
    curl_close($ch);

    $res = json_decode($addressList, true);
    $coordinates = $res['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['Point']['pos'];
    $coordinates = explode(' ', $coordinates);
    return $coordinates;
}

$host = 'https://ibe.tlintegration.com/ibe/RegionMap/host?hotel_code=' . $hotelCode;
$hostUrl = json_decode(requestHotel($host));
$rooms = [];
$roomsList = [];
foreach ($languages as $value => $language) {
    $longLanguages = correctLanguages($language)[0];
    $url = "https://" . $hostUrl->host . "/ChannelDistributionApi/BookingForm/hotel_info?language=" . $longLanguages . "&hotels[0].code=" . $hotelCode;
    $response = requestHotel($url);
    $responseMas = json_decode($response, true);
    $roomsList = getRoomList($roomsList, $responseMas, $language, $value);
}


$fileCache = __DIR__ . '/cache/room_list.json';
file_put_contents($fileCache, json_encode($roomsList));


echo "<pre>";
var_dump($roomsList);
echo "</pre>";





