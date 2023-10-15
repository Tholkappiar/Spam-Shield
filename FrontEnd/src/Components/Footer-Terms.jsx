import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Footer_Terms() {
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
        Terms of Service
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white dark:bg-gray-800 w-96 mx-auto mt-20 p-6 rounded-lg shadow-lg">
          <Typography id="modal-modal-title" variant="h6" component="h2" className="text-black dark:text-white">
            Terms of Service
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-black dark:text-white">
            By using our services, you agree to our Terms of Service. These terms may be updated from time to time, and it is your responsibility to review them. If you do not agree with any of these terms, please do not use our services.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-black dark:text-white">
            <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
            <p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
          </Typography>
        </div>
      </Modal>
    </div>
  );
}
