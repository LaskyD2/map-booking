export const getParameterByName = (name, url) => {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


export const accordion = () => {
    /* свернуть/развернуть карту */
    let acc = document.querySelector(".accordion");
    let mapWrapper = document.querySelector(".map__wrapper");
    let map = document.getElementById("map");
    let mapMobileText = document.querySelector(".map__mobile-text");

    acc.addEventListener("click", function() {
        this.classList.toggle("active");
        if (this.classList.contains('active')) {
            mapWrapper.classList.remove('map-show');
            map.classList.remove('map-show');
            this.innerText = 'Развернуть карту'

        } else {
            mapWrapper.classList.add('map-show');
            map.classList.add('map-show');
            this.innerText = 'Свернуть карту';


        }

    });

    mapMobileText.addEventListener("click", function() {
        this.style.display = 'none';
    });

    /* скроллинг к фб */
    let btns = document.querySelectorAll(".map__balloon-room");

    btns.forEach((btn) => {
        btn.addEventListener("click", handleButtonClick);
    })

}

export const diffDates = (day_one, day_two) => {
    return (day_one - day_two) / (60 * 60 * 24 * 1000);
};

export const handleButtonClick = () => {
    let bookingForm = document.getElementById("tl-booking-form");
    bookingForm.scrollIntoView({ block: "start", behavior: "smooth" });
}
