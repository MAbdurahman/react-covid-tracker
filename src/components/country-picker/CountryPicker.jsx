import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountriesData } from './../../api/index';

export default function CountryPicker({ handleCountryChange }) {
   const [countries, setCountries] = useState([]);

   useEffect(() => {
      const fetchDataFromAPI = async () => {
         setCountries(await fetchCountriesData());
         console.log(await fetchCountriesData());
      };
      fetchDataFromAPI();

   }, []);

   return (
      <FormControl className={styles.formControl}>
         <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
            <option value="">United States</option>
            {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
         </NativeSelect>
      </FormControl>
   );
};
