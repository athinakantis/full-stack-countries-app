export interface CityWeather {
    weather: [
        {
            description: string;
            icon: string;
            main: string
        }
    ];
    wind: {
        speed: number;
    };
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
}
