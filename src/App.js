import React, { useState, useEffect } from "react";
import { Header, Cards, Chart, CountryPicker } from "./components";
import { fetchTodaysData, fetchCountryData } from "./api";
import "./App.css";

function App() {
    const [state, setState] = useState({ data: {}, country: "" });
    useEffect(() => {
        (async () => {
            let data = await fetchTodaysData();
            setState({ data, country: "" });
        })();
    }, []);

    const handelCountryChange = async (country) => {
        if (country === "global") {
            setState({
                data: await fetchTodaysData(),
                country: "",
            });
        } else {
            setState({
                data: await fetchCountryData(country),
                country: country,
            });
        }
    };

    return (
        <>
            <div className="container">
                <Header name="COVID-19 Tracker" />
                <Cards data={state.data} />
                <CountryPicker handelCountryChange={handelCountryChange} />
                <Chart data={state.data} country={state.country} />
            </div>
        </>
    );
}

export default App;
