import React, {Component} from 'react';
import Color from 'color';
// import hotels from '../hotel.js';
import HotelList from './hotel-list';
import LangContext from '../context/lang';
import SettingsContext from '../context/settings';
import Preload from './preload';
import lang from '../lang'

class App extends Component {
    static defaultProps = {
        lang: 'ru'
    };

    constructor(props) {
        super(props);
        this.state = {
            ...props.settings,
            hotels: {},
            isLoaded: false,
            date: null,
            nights: 1
        };
    }

    changeLang = (lang) => {
        this.setState({lang});
    };

    changeDate = (date, nights) => {
        this.loaderData(date, nights, this.hotelIds);
    };

    getParams = () => {
        const queryString = window.location.search.slice(1);
        const parts = queryString.split('&');
        return parts.reduce(function (prev, curr) {
            if (curr) {
                const temp = curr.split('=');
                prev[temp[0]] = temp[1];
                return prev;
            }
        }, {});
    };

    getTodayDate() {
        const date = new Date();
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1; // месяц 1-12
        if (mm < 10) mm = '0' + mm;

        return `${date.getFullYear()}-${mm}-${dd}`;
    }

    componentDidMount() {
        const getParams = this.getParams();

        const date = getParams && 'date' in getParams ? getParams.date : this.getTodayDate();
        const nights = getParams && getParams.nights || 1;
        const hotelIds = this.state.hotelIds ? this.state.hotelIds.join(',') : '';
        this.hotelIds = hotelIds;
        this.loaderData(date, nights, hotelIds);
    }

    loaderData = (date, nights, hotelIds) => {
        const url = `/tl-hotel/hotel-api.php?date=${date}&nights=${nights}&hotelIds=${hotelIds}`;

        this.setState({
            isLoaded: false
        });

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    hotels: data.data.hotels,
                    isLoaded: true,
                    date,
                    nights
                });
            })
            .catch(err => {
                this.setState({
                    isLoaded: true
                });
                console.log(err)
            });
    };

    render() {
        const {hotels, isLoaded, lang: currLang, style} = this.state;

        if (!isLoaded) {
            return <Preload/>;
        }

        const hoverColor = Color(style.secondary).lighten(0.2);
        const styleCss = `
            .tl-hotel-price .tl-hotel__header {
                background-color: ${style.primary};
            }
            .tl-hotel-price  .tl-button {
                background-color: ${style.secondary};
            }
            .tl-hotel-price  .tl-button:hover {
                background-color: ${hoverColor};
            }
            .tl-hotel-price  .tl-button:hover {
                background-color: ${hoverColor};
            }
            .tl-hotel-price  .tl-room__price-num {
                color: ${style.secondary}
            }
            .tl-hotel-price  .tl-hotel {
                border: 1px solid ${style.border};
            }
            .tl-hotel-price  .tl-room:not(:last-child) {
                border-bottom: 1px solid ${style.border};
            }
        `;

        return (
            <LangContext.Provider value={lang[currLang]}>
                <SettingsContext.Provider value={{submitUrl:this.state.submitUrl}}>
                    <style>
                        {styleCss}
                    </style>
                    <div className="tl-hotel-price">
                        <HotelList hotels={hotels} date={this.state.date} nights={this.state.nights} submitUrl={this.state.submitUrl}/>
                    </div>
                </SettingsContext.Provider>
            </LangContext.Provider>
        );
    }
}

export default App;
