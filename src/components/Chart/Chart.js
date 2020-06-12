import React, { useEffect, useState } from "react";
import styles from "./Chart.module.css";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyData } from "../../api";

function Chart(props) {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        (async () => {
            setDailyData(await fetchDailyData());
        })();
    }, []);

    const barChart = props.data.confirmed ? (
        <Bar
            data={{
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [
                    {
                        label: "People",
                        backgroundColor: [
                            "rgba(0, 0, 255, 0.5)",
                            "rgba(0, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)",
                        ],
                        data: [
                            props.data.confirmed,
                            props.data.recovered,
                            props.data.deaths,
                        ],
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: {
                    display: true,
                    text: `Current state in ${props.country}`,
                },
            }}
        />
    ) : null;

    const lineChart = dailyData.length ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: "Infected",
                        borderColor: "#3333ff",
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: "Deaths",
                        borderColor: "red",
                        backgroundColor: "rgba(255, 0, 0, 0.5)",
                        fill: true,
                    },
                ],
            }}
        />
    ) : null;

    return (
        <div className={styles.container}>
            {props.country ? barChart : lineChart}
        </div>
    );
}

export default Chart;
