<?php

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

