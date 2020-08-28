import  React , { useState , useEffect } from 'react';
import { Line , Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';
import {fetchedDailyData} from '../../api';

const Chart = ({data: {confirmed , deaths , recovered}, country}) => {

   const [dailyData , setDailyData] = useState({});
   useEffect(() => {
       const fetchedApi = async () => {
        setDailyData(await fetchedDailyData());
       }
       fetchedApi();
       //console.log('dailyData', JSON.stringify(dailyData));
   }, [])  

   const LineChart = (
       dailyData.length ? ( <Line
       data = {{
           labels: dailyData.map(({date}) => date),
           datasets: [{
               data: dailyData.map(({confirmed}) => confirmed),
               label: 'Infected',
               borderColor: '#3333ff',
               fill: true
           }, {
            data: dailyData.map(({deaths}) => deaths),
            label: 'Deaths',
            backgroundColor: 'red',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            fill: true
           }]
       }}/>) : <h1>Data not exist </h1>
   )

   const barChart = (
       
       confirmed ? (
           <Bar
           data = {{
               labels: ['Infected', 'Recoverd', 'Deaths'],
               datasets: [{
                   label: 'People',
                   backgroundColor: [
                       'rgba(0, 0, 255, 0.5)',
                       'rgba(0, 255, 0, 0.5)',
                       'rgba(255, 0, 0, 0.5);'
                ],
                data: [confirmed.value , recovered.value , deaths.value]
               }]
           }} 
           options= {{
               legend: {display: false},
               title:{display: true , text: `Current state in ${country}`}
           }}/>
       ): null
   )
    return (
        <div  className={styles.container}> 
        {country ? barChart : LineChart}
        </div>
    )
}

export default Chart;