<?php
require_once('./utils/Loader.php');
require_once('./utils/Utils.php');
require_once('./loader/HotelLoader.php');

$settings = json_decode(file_get_contents(__DIR__ . '/settings/settings.json'), true);

$settingsHotelCode = implode(',', $settings['hotels']);
$settingsApartCode = implode(',', $settings['apart']);
$settingsLanguages = implode(',', $settings['languages']);
$hotelSource = $settings['source'];


$hotelsCode = explode(',', $settingsHotelCode);
$apartCode = explode(',', $settingsApartCode);
$languages = explode(',', $settingsLanguages);

$result = [];

function getApart($hotelsCode, $languages, $hotelSource) {
    $result = [];
    foreach ($hotelsCode as $hotel) {
        $host = 'https://ibe.tlintegration.com/ibe/RegionMap/host?hotel_code=' . $hotel;
        $hostUrl = json_decode(requestHotel($host));
        $hotelsList = [];

        $sources = $hotelSource[$hotel];

        foreach ($languages as $value => $language) {
            $longLanguages = correctLanguages($language)[0];

            if (count($sources) > 0) {
                foreach ($sources as $source) {
                    $url = "https://" . $hostUrl->host . "/ChannelDistributionApi/BookingForm/hotel_info?language=" . $longLanguages . "&point_of_sale.source=" . $source . "&hotels[0].code=" . $hotel;
                    $response = requestHotel($url);
                    $responseMas = json_decode($response, true);

                    $hotelsList[$source] = getRoomList($hotelsList[$source], $responseMas, $language, $value);
                }
            } else {
                $url = "https://" . $hostUrl->host . "/ChannelDistributionApi/BookingForm/hotel_info?language=" . $longLanguages . "&hotels[0].code=" . $hotel;
                $response = requestHotel($url);
                $responseMas = json_decode($response, true);

                $hotelsList = getRoomList($hotelsList, $responseMas, $language, $value);
            }


        }

        $result = $hotelsList;
    }
    return $result;
}

function getHotels($hotelsCode, $languages) {

    echo $hotelsCode;
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

        }
        $result[$hotel] = $hotelsList;
    }

    return $result;
}

if (strlen($settingsHotelCode) > 0) {
    $result["hotels"] = getHotels($hotelsCode, $languages);
}
if (strlen($settingsApartCode) > 0) {
    $result["apart"] = getApart($apartCode, $languages, $hotelSource);
}


/*if ($settings['type'] === 'apart') {
    $result["apart"] = getApart($hotelsCode, $languages, $hotelSource);
} else if ($settings['type'] === 'hotels') {
    $result = getHotels($hotelsCode, $languages);
}*/

$fileCache = __DIR__ . '/../cache/hotel_list.json';
file_put_contents($fileCache, json_encode($result));

echo "<pre>";
var_dump($result);
echo "</pre>";





