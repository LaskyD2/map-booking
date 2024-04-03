<?php

function getPriceLoader($hotelIds, $startDate, $endDate, $adults) {
    $prices = [];
    foreach ($hotelIds as $id) {
        $host = 'https://ibe.tlintegration.com/ibe/RegionMap/host?hotel_code=' . $id;
        $hostUrl = json_decode(requestHotel($host));

        $url = "https://". $hostUrl->host  ."/ChannelDistributionApi/BookingForm/hotel_availability?include_rates=true&include_transfers=true&include_all_placements=true&include_promo_restricted=true&language=ru-ru&criterions[0].hotels[0].code="
            . $id ."&criterions[0].dates="
            . $startDate ."%3B". $endDate
            ."&criterions[0].adults=" . $adults;

        $data = json_decode(requestHotel($url), true);

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

                if ((!isset($prices['hotels'][$hotelId][$roomType]) && !isset($prices[$hotelId][$roomType])) || $price < $prices['hotels'][$hotelId][$roomType]) {
                    $prices[$hotelId][$roomType] = $price;
                }
            }
        }
    }
    return $prices;
}

