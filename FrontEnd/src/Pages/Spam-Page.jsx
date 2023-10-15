import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Paper } from '@mui/material';

const SpamDetectionApp = () => {
  const [messages, setMessages] = useState([]);
  const [spamMessages, setSpamMessages] = useState([]);
  const [nonSpamMessages, setNonSpamMessages] = useState([]);
  const [id, setId] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem('UID'));
  const [spamCount, setSpamCount] = useState(0);
  const [notSpamCount, setNotSpamCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3004/messages')
      .then(response => {
        setMessages(response.data);
        console.log("All Messages:", response.data);
        filterMessages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const spamKeywords = ['spam', 'hi'];

  const filterMessages = (messageArray) => {
    const spamMsgs = [];
    const nonSpamMsgs = [];
    let spamCount = 0;
    let notSpamCount = 0;

    messageArray.forEach((message) => {
      if (message.message) {
        let isSpam = false;
        for (const keyword of spamKeywords) {
          if (message.message.includes(keyword)) {
            isSpam = true;
            break;
          }
        }

        if (isSpam) {
          spamMsgs.push(message);
          spamCount++;
        } else {
          nonSpamMsgs.push(message);
          notSpamCount++;
        }
      }
    });

    setSpamMessages(spamMsgs);
    setNonSpamMessages(nonSpamMsgs);
    setSpamCount(spamCount);
    setNotSpamCount(notSpamCount);
  };

  const handleSubmit = async () => {
    const dataToPost = {
      id: id,
      uid: userId,
      spamCount: spamCount,
      notSpamCount: notSpamCount,
      date: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:8080/spamdata/post', dataToPost);
      console.log('Data sent to the backend:', dataToPost);

      toast.success('Data posted successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error sending data to the backend:', error);

      toast.error('Error posting data.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <Grid item xs={12}>
      <Paper className="p-4 flex flex-col">
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="container mx-auto">
        <ToastContainer />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Data
        </button>
        <div className="my-4">
          <h2 className="text-2xl font-semibold mb-2">Main Messages</h2>
          <div className="bg-white rounded p-4">
            {nonSpamMessages.map((message, index) => (
              <div
                key={index}
                className="mb-2 p-2 border border-gray-300 rounded"
              >
                {message.message}
              </div>
            ))}
          </div>
        </div>
        <div className="my-4">
          <h2 className="text-2xl font-semibold mb-2">Spam Messages</h2>
          <div className="bg-white rounded p-4">
            {spamMessages.map((message, index) => (
              <div
                key={index}
                className="mb-2 p-2 border border-gray-300 rounded bg-red-100"
              >
                {message.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </Paper>
    </Grid>
   

  );
};

export default SpamDetectionApp;
