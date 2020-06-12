import axios from "axios";

const diseaseShApi = axios.create({
    baseURL: "https://disease.sh/v2/",
    timeout: 1000,
});

const mathdroApi = axios.create({
    baseURL: "https://covid19.mathdro.id/api/",
    timeout: 1000,
});

const getTodaysDataUrl = "all?yesterday=false&allowNull=true";
const getDailyDataUrl = "daily";
const getCountriesUrl = "countries";

const fetchTodaysData = async () => {
    try {
        let {
            data: { cases, recovered, deaths, updated },
        } = await diseaseShApi.get(getTodaysDataUrl);
        return {
            confirmed: cases,
            recovered,
            deaths,
            updated,
        };
    } catch (error) {
        console.log(error);
    }
};

const fetchDailyData = async () => {
    try {
        const dailyData = await (await mathdroApi.get(getDailyDataUrl)).data;
        return dailyData.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
    } catch (error) {
        console.log(error);
    }
};

const fetchCountryNames = async () => {
    try {
        let countries = (await mathdroApi.get(getCountriesUrl)).data.countries;
        return countries.map(({ name }) => name);
    } catch (error) {
        console.log(error);
    }
};

const fetchCountryData = async (countryName) => {
    try {
        let data = (await mathdroApi.get(`${getCountriesUrl}/${countryName}`))
            .data;
        return {
            confirmed: data.confirmed.value,
            recovered: data.recovered.value,
            deaths: data.deaths.value,
            updated: data.lastUpdate,
        };
    } catch (error) {}
};

export { fetchTodaysData, fetchDailyData, fetchCountryNames, fetchCountryData };
