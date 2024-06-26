<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require_once('./utils/Loader.php');
require_once('./loader/PriceLoaderCached.php');

$params = $_GET;

$settings = json_decode(file_get_contents(__DIR__ . '/settings/settings.json'), true);

$settingsHotelCode = implode(',', $settings['hotels']);
$hotelIds = explode(',', $settingsHotelCode);

$currency = $settings['currency'];
$startDate = isset($params['date']) && !empty($params['date']) ? $params['date'] : date('Y-m-d');
$nights = isset($params['nights']) && !empty($params['nights']) ? $params['nights'] : 1;
$endDate = date('Y-m-d', strtotime($startDate) + $nights * 24 * 3600);
$adults = isset($params['$adults']) && !empty($params['$adults']) ? $params['$adults'] : 2;

print_r(send($hotelIds, $startDate, $endDate, $adults));

