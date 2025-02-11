<?php

require_once(__DIR__  . '/PriceLoader.php');

function createFileCache($startDate = '', $endDate = '') {
    return __DIR__ . '/../../cache/' . $startDate . '_' . $endDate . '.json';
}

function isCacheTimeout($startDate, $endDate) {
    return !file_exists(createFileCache($startDate, $endDate)) ||
        3600 < time() - filemtime(createFileCache($startDate, $endDate));
}

function send($hotelIds, $startDate, $endDate, $adults) {

    deleteExpiredCacheFiles();

    if (isCacheTimeout($startDate, $endDate)) {
        file_put_contents(createFileCache($startDate, $endDate), json_encode(getPriceLoader($hotelIds, $startDate, $endDate, $adults)));
        return file_get_contents(createFileCache($startDate, $endDate));
    } else {
        return file_get_contents(createFileCache($startDate, $endDate));
    }
}


