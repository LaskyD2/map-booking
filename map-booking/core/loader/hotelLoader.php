<?php
function getHotel($hotelData, $addressInfo, $lang)
{
    $hotelsInfo['name'][$lang] = $hotelData['name'];
    $hotelsInfo['cityName'][$lang] = $addressInfo['city_name'];
    $hotelsInfo['address'][$lang] = $addressInfo['address_line'][0];

    return $hotelsInfo;
}

function getRoom($roomDate, $lang)
{
    $room = [];

    $room['id'] = $roomDate['code'];
    $room['name'][$lang] = $roomDate['name'];
    $room['cityName'][$lang] = $roomDate['contact_info']['addresses'][0]['city_name'];
    $room['address'][$lang] = $roomDate['contact_info']['addresses'][0]['city_name'] . ', ' .  $roomDate['contact_info']['addresses'][0]['address_line'][0];
    $room['price'] = null;


    $room['longitude'] = sprintf("%.4f", $roomDate['contact_info']['addresses'][0]['longitude']);
    $room['latitude'] = sprintf("%.4f", $roomDate['contact_info']['addresses'][0]['latitude']);

    return $room;
}

function getRoomLang($roomDate, $lang)
{
    $room = [];
    $room['name'][$lang] = $roomDate['name'];
    $room['address'][$lang] = $roomDate['contact_info']['addresses'][0]['city_name'] . ', ' .  $roomDate['contact_info']['addresses'][0]['address_line'][0];

    return $room;
}

function getRoomList($hotelsList, $responseMas, $lang, $value) {
    $hotelInfo = $responseMas['hotels']['0']['room_types'];

    foreach ($hotelInfo as $i => $currHotelData) {
        if ($value == 0) {
            $hotelsList[$i] = getRoom($currHotelData, $lang);
        } else {
            $hotelsList[$i]['name'] += array_merge($hotelsList[$i]['name'], getRoomLang($currHotelData, $lang)['name']);
            $hotelsList[$i]['address'] += array_merge($hotelsList[$i]['address'], getRoomLang($currHotelData, $lang)['address']);
        }
    }


    return $hotelsList;
}
