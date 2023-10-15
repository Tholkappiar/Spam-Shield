import React from 'react';

const FAQSection = () => {
  return (
    <div className='d-flex justify-content-center'>
    <section className="my-4 py-4 w-75 p-3 "> {/* Add margin (my-4) and padding (py-4) */}
      <h3 className="text-center mb-4 pb-2 text-primary fw-bold">FAQ</h3>
      <p className="text-center mb-5">
        Find the answers for the most frequently asked questions below
      </p>

      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
          <h6 className="mb-3 text-primary"><i className="far fa-paper-plane text-primary pe-2"></i> Is this a safe service?</h6>
          <p>
            <strong><u>Absolutely!</u></strong> We work with top payment companies which guarantees your safety and security. All billing information is stored on our payment processing partner , then we will sell it !
          </p>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <h6 className="mb-3 text-primary"><i className="fas fa-pen-alt text-primary pe-2"></i> How can I cancel my account?</h6>
          <p>
            <strong><u>Yes, it is possible!</u></strong> You can easily cancel your account by going to your profile settings.
          </p>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <h6 className="mb-3 text-primary"><i className="fas fa-user text-primary pe-2"></i>Can I update my email address?</h6>
          <p>
          Yes, you can update your email address in your account settings.
          </p>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <h6 className="mb-3 text-primary"><i className="fas fa-rocket text-primary pe-2"></i> What should I do if I forget my password?</h6>
          <p>
            If you forget your password, you can reset it by clicking the "Forgot Password" link on the login page.
          </p>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <h6 className="mb-3 text-primary"><i className="fas fa-home text-primary pe-2"></i> Do you offer customer support?</h6>
          <p>
            <strong><u>Yes , </u>.</strong> we provide customer support to assist you with any issues or questions you may have.
          </p>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <h6 className="mb-3 text-primary"><i className="fas fa-book-open text-primary pe-2"></i> Is there a free trial available?</h6>
          <p>
          Unfortunately, we do offer a free trial at the moment, but you can explore our features with a paid subscription it will be really helpfull to us.
          </p>
        </div>
      </div>
    </section>
    </div>
  );
};

export default FAQSection;
