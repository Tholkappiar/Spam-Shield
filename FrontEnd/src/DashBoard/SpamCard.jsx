import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

function SpamCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/spamdata/byuid/${localStorage.getItem('UID')}`)
      .then((response) => {
        setData(response.data);

        // Calculate the total spam and not spam counts
        const totalSpamCount = response.data.reduce((total, item) => total + item.spamCount, 0);
        const totalNotSpamCount = response.data.reduce((total, item) => total + item.notSpamCount, 0);

        // Update the state with the total counts
        setData({ totalSpamCount, totalNotSpamCount });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>TOTAL SAFE COUNT</Title>
      <Typography component="p" variant="h4">
        {data.totalNotSpamCount}
      </Typography>
      <Title>TOTAL SPAM COUNT</Title>
      <Typography component="p" variant="h4">
        {data.totalSpamCount}
      </Typography>
    </React.Fragment>
  );
}

export default SpamCard;
