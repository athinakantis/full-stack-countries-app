export interface CityWeather {
    weather: [
        {
            description: string;
            icon: string;
        }
    ];
    wind: {
        speed: number;
    };
    main: {
        temp: number;
        feels_like: number;
        humitidy: number;
    };
}
