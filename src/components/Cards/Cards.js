import React from "react";
import styles from "./Cards.module.css";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

function Cards(props) {
    if (!props.data.confirmed) {
        return <h1>Loading!!!</h1>;
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={4} justify="center">
                <Grid
                    item
                    xs={12}
                    md={3}
                    component={Card}
                    className={cx(styles.card, styles.infected)}
                >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Infected
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={props.data.confirmed}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(props.data.updated).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Total Number of Confirmed COVID-19 Cases
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                    component={Card}
                    className={cx(styles.card, styles.recovered)}
                >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Recoverd
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={props.data.recovered}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(props.data.updated).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Total Number of Recovered COVID-19 Cases
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={3}
                    component={Card}
                    className={cx(styles.card, styles.deaths)}
                >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Deaths
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={props.data.deaths}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(props.data.updated).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Total Number of Deaths from COVID-19
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cards;
