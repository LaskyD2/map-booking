<?php

require_once(__DIR__  . '/PriceLoader.php');

function createFileCache($startDate = '', $endDate = '') {
    return $fileCache = __DIR__ . '/../../cache/' . $startDate . '_' . $endDate . '.json';
}

function isCacheTimeout($startDate, $endDate) {
    return !file_exists(createFileCache($startDate, $endDate)) ||
        3600 < time() - filemtime(createFileCache($startDate, $endDate));
}

function send($hotelIds, $startDate, $endDate, $adults) {
    if (isCacheTimeout($startDate, $endDate)) {
        //загружаю
        file_put_contents(createFileCache($startDate, $endDate), json_encode(getPriceLoader($hotelIds, $startDate, $endDate, $adults)));
        return file_get_contents(createFileCache($startDate, $endDate));
    } else {
        //беру из кэша
        return file_get_contents(createFileCache($startDate, $endDate));
    }
}


