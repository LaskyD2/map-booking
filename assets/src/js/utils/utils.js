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
        } else {
            mapWrapper.classList.add('map-show');
            map.classList.add('map-show');
        }
        // map.style.display = map.style.display === "block" ? 'none' : 'block';
        // map.style.height = map.style.height === "500px" ? '0px' : '500px';
        acc.innerText = map.style.display === "block" ? 'Свернуть карту' : 'Развернуть карту'
    });

    mapMobileText.addEventListener("click", function() {
        this.style.display = 'none';
    });

    /* скроллинг к фб */
    let bookingForm = document.getElementById("tl-booking-form");
    let btns = document.querySelectorAll(".map__balloon-room");

    function handleButtonClick() {
        bookingForm.scrollIntoView({ block: "start", behavior: "smooth" });
    }

    btns.forEach((btn) => {
        btn.addEventListener("click", handleButtonClick);
    })

}
