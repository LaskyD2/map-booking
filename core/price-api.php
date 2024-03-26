<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once('./utils/Loader.php');

$params = $_GET;

$settings = json_decode(file_get_contents(__DIR__ . '\settings\settings.json'), true);

$settingsHotelCode = implode(',', $settings['hotels']);

$hotelIds = explode(',', $settingsHotelCode);

$currency = $settings['currency'];

$startDate = isset($params['date']) && !empty($params['date']) ? $params['date'] : date('Y-m-d');
$nights = isset($params['nights']) && !empty($params['nights']) ? $params['nights'] : 1;
$endDate = date('Y-m-d', strtotime($startDate) + $nights * 24 * 3600);

$adults = isset($params['$adults']) && !empty($params['$adults']) ? $params['$adults'] : 2;

foreach ($hotelIds as $id) {
    $host = 'https://ibe.tlintegration.com/ibe/RegionMap/host?hotel_code=' . $id;
    $hostUrl = json_decode(requestHotel($host));

    $url = "https://ru-ibe.tlintegration.ru/ChannelDistributionApi/BookingForm/hotel_availability?include_rates=true&include_transfers=true&include_all_placements=true&include_promo_restricted=true&language=ru-ru&criterions[0].hotels[0].code="
        . $id ."&criterions[0].dates="
        . $startDate ."%3B". $endDate
        ."&criterions[0].adults=" . $adults;

    $data = json_decode(requestHotel($url), true);

    $prices = [];

    foreach ($data as $hotelInfo) {
        $hotelId = $hotelInfo[0]["hotel_ref"]["code"];

        foreach ($hotelInfo as $placement) {
            if (!isset($placement['room_types'][0]['placements'][0])) {
                continue;
            }

            $priceInfo = $placement['room_types'][0]['placements'][0];
            $price = $priceInfo['price_before_tax'];
            $roomType = $placement['room_types'][0]['code'];
            $capacity = $priceInfo['capacity'];

            if (!isset($prices['hotels'][$hotelId][$roomType][$capacity]) || $price < $prices['hotels'][$hotelId][$roomType][$capacity]) {
                $prices[$hotelId][$roomType][$capacity] = $price;
            }
        }
    }


    return $prices;

}


