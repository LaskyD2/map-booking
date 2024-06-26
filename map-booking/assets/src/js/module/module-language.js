import { LANG_SETTING } from '../lang.js';

const UNSUPPORTED_LANG = 'not-supported';
const LANGUAGE_CODE_STANDARD_LENGTH = 2;

const getModuleLanguage = () => {
    const pageLang = document.documentElement.lang;
    const settingLanguages = Object.keys(LANG_SETTING);

    const siteLang = pageLang.length === LANGUAGE_CODE_STANDARD_LENGTH
        ? pageLang.toLowerCase()
        : pageLang.substring(0, LANGUAGE_CODE_STANDARD_LENGTH);

    return (!settingLanguages.includes(siteLang))
        ? UNSUPPORTED_LANG
        : siteLang;
};

export const setModuleLanguage = () => {
    window.MAP_BOOKING_LANG = getModuleLanguage();
};
