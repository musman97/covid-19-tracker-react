import React, { useEffect, useState } from "react";
import styles from "./CountryPicker.module.css";
import { FormControl, NativeSelect } from "@material-ui/core";
import { fetchCountryNames } from "../../api";

function CountryPicker(props) {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        (async () => {
            setCountries(await fetchCountryNames());
        })();
    }, []);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect
                defaultValue="global"
                onChange={(e) => props.handelCountryChange(e.target.value)}
            >
                <option value="global">Global</option>
                {countries.map((name, index) => (
                    <option key={index} value={name.toLowerCase()}>
                        {name}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;
