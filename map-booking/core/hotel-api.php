<?php
require_once('./utils/Loader.php');
require_once('./utils/Utils.php');
require_once('./map-api/ya-api.php');

$settings = json_decode(file_get_contents(__DIR__ . '/settings/settings.json'), true);

$settingsHotelCode = implode(',',$settings['hotels']);
$settingsLanguages = implode(',',$settings['languages']);

$hotelsCode = explode(',', $settingsHotelCode);
$languages = explode(',', $settingsLanguages);

function getHotel($hotelData, $addressInfo, $lang) {
    $hotelsInfo['name'][$lang] = $hotelData['name'];
    $hotelsInfo['cityName'][$lang] = $addressInfo['city_name'];
    $hotelsInfo['address'][$lang] = $addressInfo['address_line'][0];

    return $hotelsInfo;
}

function getRoom($roomDate, $lang) {
    $room = [];

    $room['room'][$lang] = $roomDate['name'];
    $room['id'] = $roomDate['code'];
//    $room['city'] = $roomDate['contact_info']['addresses'][0]['city_name'];
//    $room['address'][$lang] = $roomDate['contact_info']['addresses'][0]['city_name'] . ', ' .  $roomDate['contact_info']['addresses'][0]['address_line'][0];
    $room['price'] = null;

    /* Адреса номеров */
/*    $room['longitude'] = $roomDate['contact_info']['addresses'][0]['longitude'];
    $room['latitude'] = $roomDate['contact_info']['addresses'][0]['latitude'];*/

    return $room;
}

function getRoomLang($roomDate, $lang) {
    $room = [];
    $room['room'][$lang] = $roomDate['name'];
//    $room['address'][$lang] = $roomDate['contact_info']['addresses'][0]['city_name'] . ', ' .  $roomDate['contact_info']['addresses'][0]['address_line'][0];

    return $room;
}

function getRoomList($hotelsList, $responseMas, $lang, $value) {
    $hotelInfo = $responseMas['hotels']['0']['room_types'];

    foreach ($hotelInfo as $i => $currHotelData) {
       if ($value == 0) {
           $hotelsList[$i] = getRoom($currHotelData, $lang);
       } else {
           $hotelsList[$i]['room'] += array_merge($hotelsList[$i]['room'], getRoomLang($currHotelData, $lang)['room']);
//           $hotelsList[$i]['address'] += array_merge($hotelsList[$i]['address'], getRoomLang($currHotelData, $lang)['address']);
       }
    }


    return $hotelsList;
}
$result = [];
foreach ($hotelsCode as $hotel) {
    $host = 'https://ibe.tlintegration.com/ibe/RegionMap/host?hotel_code=' . $hotel;
    $hostUrl = json_decode(requestHotel($host));
    $hotelsList= [];
    foreach ($languages as $value => $language) {
        $longLanguages = correctLanguages($language)[0];
        $url = "https://" . $hostUrl->host . "/ChannelDistributionApi/BookingForm/hotel_info?language=" . $longLanguages . "&hotels[0].code=" . $hotel;
        $response = requestHotel($url);
        $responseMas = json_decode($response, true);

        $hotelData = $responseMas['hotels']['0'];
        $addressInfo = $hotelData['contact_info']['addresses'][0];

        $hotelsList = array_merge_recursive($hotelsList, getHotel($hotelData, $addressInfo, $language));

        $hotelsList['latitude'] = $addressInfo['latitude'];
        $hotelsList['longitude'] = $addressInfo['longitude'];

//        $hotelsList['rooms'] = getRoomList($hotelsList['rooms'], $responseMas, $language, $value);
    }
   $result[$hotel] = $hotelsList;
}

$fileCache = __DIR__ . '/../cache/hotel_list.json';
file_put_contents($fileCache, json_encode($result));


echo "<pre>";
var_dump($result);
echo "</pre>";





