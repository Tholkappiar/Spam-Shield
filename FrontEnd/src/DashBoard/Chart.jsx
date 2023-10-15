import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';
import axios from 'axios';

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [showDayWise, setShowDayWise] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/spamdata/byuid/${localStorage.getItem('UID')}`)
      .then((response) => {
        const rawData = response.data;

        const multipleDays = rawData.some((item, index, array) => {
          if (index > 0) {
            return new Date(item.date).toLocaleDateString() !== new Date(array[index - 1].date).toLocaleDateString();
          }
          return false;
        });

        const chartData = rawData.map((item) => ({
          time: showDayWise ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : new Date(item.date).toLocaleTimeString(),
          Safe: item.notSpamCount,
          Spam: item.spamCount,
        }));
        setData(chartData);
        setShowDayWise(multipleDays);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [showDayWise]);

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #ccc',
              padding: '8px',
            }}
            labelStyle={{
              fontWeight: 'bold',
            }}
            formatter={(value, name) => [`${name}: ${value}`, '']}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="Safe"
            stroke={theme.palette.primary.main}
            dot={false}
          >
            <Label
              content={({ value }) => `Safe : ${value}`
              }
              position="top"
            />
          </Line>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="Spam"
            stroke="red"
            dot={false}
          >
            <Label
              content={({ value }) => `Spam : ${value}`
              }
              position="top"
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
