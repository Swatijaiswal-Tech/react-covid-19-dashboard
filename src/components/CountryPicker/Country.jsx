import React , {useState , useEffect}from 'react';
import {NativeSelect , FormControl} from '@material-ui/core'; 
import { FetchCountries } from "../../api";
import styles from './Country.module.css';
const CountryPicker = ({handleCountryChange}) => {

    const [countryList , setCountryList] = useState([]);

    useEffect(() => {
        const fetchCountryList = async () => {
            setCountryList(await FetchCountries());
        }
       
        fetchCountryList();
       
    }, [setCountryList]);

    return (
        <FormControl className= {styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => {handleCountryChange(e.target.value)}}>
                <option value=""> Global</option>
                {countryList.map((country, i) => <option key={i} value={country}>{country} </option>)}
             </NativeSelect>
         </FormControl>   
    )
}

export default CountryPicker;