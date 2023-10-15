import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Footer_Policy() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography
        variant="body1"
        color="black" // You can adjust the color to your preference
        style={{ cursor: 'pointer' }}
        onClick={handleOpen}
      >
        Policy
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white dark:bg-gray-800 w-96 mx-auto mt-20 p-6 rounded-lg shadow-lg">
          <Typography id="modal-modal-title" variant="h6" component="h2" className="text-black dark:text-white">
            Policy
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-black dark:text-white">
          The Spam Filter App is designed to prevent and filter out spam, unsolicited messages, and unwanted content.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-black dark:text-white">
            <p>Users must use the Spam Filter App for legitimate purposes only and in compliance with all applicable laws and regulations.</p>
            <p>The Spam Filter App may not be used for any illegal, harmful, or malicious activities, including but not limited to phishing, identity theft, or sending harmful code or malware.</p>
          </Typography>
        </div>
      </Modal>
    </div>
  );
}
