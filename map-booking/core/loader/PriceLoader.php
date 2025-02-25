<?php

function getPriceLoader($hotelIds, $startDate, $endDate, $adults) {
    $prices = [];
    foreach ($hotelIds as $id) {
        $host = 'https://ibe.tlintegration.com/ibe/RegionMap/host?hotel_code=' . $id;
        $hostUrl = json_decode(requestHotel($host));

        $url = "https://". $hostUrl->host  ."/ChannelDistributionApi/BookingForm/hotel_availability?include_rates=true&include_transfers=false&include_all_placements=true&include_promo_restricted=false&language=ru-ru&criterions[0].hotels[0].code="
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

                if (!isset($prices[$hotelId][$roomType][$capacity]) || $price < $prices[$hotelId][$roomType][$capacity]) {
                    $prices[$hotelId][$roomType][$capacity] = $price;
                }
            }
        }
    }


    fillEmptyCapacities($prices);

    return $prices;
}


function fillEmptyCapacities($prices)
{
    foreach ($prices as $hotelCode => $roomTypes) {
        foreach ($roomTypes as $roomType => $capacities) {
            $currentCapacity = 1;
            ksort($capacities);

            if (is_array($capacities)) {
                foreach ($capacities as $capacity => $price) {
                    $capacity = (int)$capacity;

                    if ($capacity !== $currentCapacity) {
                        for (
                            $index = $currentCapacity;
                            $index < $capacity;
                            $index++
                        ) {
                            $prices[$hotelCode][$roomType][$index] = $price;
                        }
                    }

                    $currentCapacity = $capacity + 1;
                }
            }

            ksort($prices[$hotelCode][$roomType]);
        }
    }
}

function deleteExpiredCacheFiles() {
    $CACHE_DIR = __DIR__ . '/../../cache/';

    $files = glob($CACHE_DIR . '*');
    foreach ($files as $file) {
        if (basename($file) !== "hotel_list.json") {
            if (is_file($file) && 3600 < time() - filemtime($file)) {
                unlink($file);
            }
        }
    }
}
