<?php
{

    $ch = curl_init('https://geocode-maps.yandex.ru/1.x/?apikey=d2905f6d-3e1c-4841-b651-5790cd49c349&format=json&geocode=' . urlencode($address));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, false);
    $addressList = curl_exec($ch);
    curl_close($ch);

    $res = json_decode($addressList, true);
    $coordinates = $res['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['Point']['pos'];
    $coordinates = explode(' ', $coordinates);
    return $coordinates;
}
