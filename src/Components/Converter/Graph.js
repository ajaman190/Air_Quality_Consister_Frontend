import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const GraphComponent = ({ processedDataURL, unprocessedDataURL }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processedResponse = await axios.get(processedDataURL);
        const unprocessedResponse = await axios.get(unprocessedDataURL);

        const processedData = processedResponse.data;
        const unprocessedData = unprocessedResponse.data;

        
        const sampleData = {
          timestamp: processedData.timestamp,
          temperature_processed: processedData.temperature,
          humidity_processed: processedData.humidity,
          pm25_processed: processedData.pm25,
          pm10_processed: processedData.pm10,
          temperature_unprocessed: unprocessedData.temperature,
          humidity_unprocessed: unprocessedData.humidity,
          pm25_unprocessed: unprocessedData.pm25,
          pm10_unprocessed: unprocessedData.pm10,
        };

        setData(sampleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [processedDataURL, unprocessedDataURL]);

  return (
    <div>
      <Plot
        data={[
          {
            x: data.timestamp,
            y: data.temperature_processed,
            type: 'scatter',
            mode: 'lines',
            name: 'Temperature Processed',
          },
          {
            x: data.timestamp,
            y: data.temperature_unprocessed,
            type: 'scatter',
            mode: 'lines',
            name: 'Temperature Unprocessed',
          },
        ]}
        layout={{ width: 800, height: 400, title: 'Temperature Processed vs Unprocessed' }}
      />

      <Plot
        data={[
          {
            x: data.timestamp,
            y: data.humidity_processed,
            type: 'scatter',
            mode: 'lines',
            name: 'Humidity Processed',
          },
          {
            x: data.timestamp,
            y: data.humidity_unprocessed,
            type: 'scatter',
            mode: 'lines',
            name: 'Humidity Unprocessed',
          },
        ]}
        layout={{ width: 800, height: 400, title: 'Humidity Processed vs Unprocessed' }}
      />

      <Plot
        data={[
          {
            x: data.timestamp,
            y: data.pm25_processed,
            type: 'scatter',
            mode: 'lines',
            name: 'PM2.5 Processed',
          },
          {
            x: data.timestamp,
            y: data.pm25_unprocessed,
            type: 'scatter',
            mode: 'lines',
            name: 'PM2.5 Unprocessed',
          },
        ]}
        layout={{ width: 800, height: 400, title: 'PM2.5 Processed vs Unprocessed' }}
      />

      <Plot
        data={[
          {
            x: data.timestamp,
            y: data.pm10_processed,
            type: 'scatter',
            mode: 'lines',
            name: 'PM10 Processed',
          },
          {
            x: data.timestamp,
            y: data.pm10_unprocessed,
            type: 'scatter',
            mode: 'lines',
            name: 'PM10 Unprocessed',
          },
        ]}
        layout={{ width: 800, height: 400, title: 'PM10 Processed vs Unprocessed' }}
      />
    </div>
  );
};

export default GraphComponent;
