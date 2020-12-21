import React, { useState, useEffect } from 'react';
import styles from './Chart.module.css';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../../api/index';

export default function Chart({ data: { confirmed, recovered, deaths }, country }) {

   // { data: { confirmed, recovered, deaths }, country }
   const [dailyData, setDailyData] = useState({});

   useEffect(() => {
      const fetchDataFromAPI = async () => {
         const initialDailyData = await fetchDailyData();
         setDailyData(initialDailyData);
         console.log(initialDailyData);
      }
      fetchDataFromAPI();

   }, []);

   const barChart = (
      confirmed ? (
         <Bar
            data={{
               labels: ['Infected', 'Recovered', 'Deaths'],
               datasets: [
                  {
                     label: 'People',
                     backgroundColor: ['rgba(113, 13, 114, 0.8)', 'rgba(32, 116, 67, 0.8)', 'rgba(224, 27, 27, 0.8)'],
                     data: [confirmed.value, recovered.value, deaths.value],
                  },
               ],
            }}
            options={{
               legend: { display: false },
               title: { display: true, text: `Current state in ${country}` },
            }}
         />
      ) : null
   );

   const lineChart = (
      dailyData[0] ? (
         <Line
            data={{
               labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
               datasets: [{
                  data: dailyData.map((data) => data.confirmed),
                  label: 'Infected',
                  borderColor: '#710D72',
                  fill: true,
               }, {
                  data: dailyData.map((data) => data.recovered),
                  label: 'Recovered',
                  borderColor: 'green',
                  backgroundColor: 'rgba(32, 116, 67, 0.8)',
                  fill: true,
               }, {
                  data: dailyData.map((data) => data.deaths),
                  label: 'Deaths',
                  borderColor: 'red',
                  backgroundColor: 'rgba(224, 27, 27, 0.8)',
                  fill: true,
               },
               ],
            }}
         />
      ) : null
   );

   return (
      <div className={styles.container}>
         {lineChart}
         {/* {country ? barChart : lineChart} */}
      </div>
   );
};
