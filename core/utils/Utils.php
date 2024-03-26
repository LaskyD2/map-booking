<?php

function correctLanguages($lang)
{
    $LANG_CODE_LONG = 4;
    $LANG_CODE_SHORT = 2;

    $languageCodes = [];

    if (strlen($lang) === $LANG_CODE_LONG) {
        $languageCodes[] = $lang;
    } else {
        if (strlen($lang) != $LANG_CODE_SHORT) {
            $lang = substr($lang, 0, $LANG_CODE_SHORT);
        }
        $languageCodes[] = strtolower($lang) . '-' . strtolower($lang);
    }

    return $languageCodes;
}
