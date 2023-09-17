import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [isInvitationPopupOpen, setIsInvitationPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestSentPopupOpen, setIsRequestSentPopupOpen] = useState(false);
  const defaultRequestInfo = {
    name: '',
    email: '',
    confirmEmail: '',
    nameFilled: true,
    emailFilled: true,
    nameValid: true,
    emailValid: true,
    confirmEmailFilled: true,
    emailMatch: true
  };
  const [requestInfo, setRequestInfo] = useState(defaultRequestInfo);
  const [errorMessage, setErrorMessage] = useState(null);

  function openInvitationPopup() {
    setIsInvitationPopupOpen(true);
  }

  function dismissInvitationPopup() {
    setIsInvitationPopupOpen(false);
    setRequestInfo(defaultRequestInfo);
  }

  function dismissRequestSentPopup() {
    setIsRequestSentPopupOpen(false);
  }

  function validateAndSendRequest(e) {
    e.preventDefault();
    // validate inputs
    const isValid = validateInputs(requestInfo);
    if (isValid) {
      // send API to backend
      sendRequest();
    }
  }

  function validateInputs(requestInfo) {
    let nameFilled = true;
    let emailFilled = true;
    let confirmEmailFilled = true;
    let nameValid = true;
    let emailValid = true;
    let emailMatch = true;
    if (!requestInfo.name) {
      nameFilled = false;
    }
    if (!requestInfo.email) {
      emailFilled = false;
    }
    if (!requestInfo.confirmEmail) {
      confirmEmailFilled = false;
    }
    if (requestInfo.name && requestInfo.name.length < 3) {
      nameValid = false;
    }
    if (requestInfo.email && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(requestInfo.email)) {
      emailValid = false;
    }
    if (requestInfo.email && requestInfo.confirmEmail && requestInfo.email !== requestInfo.confirmEmail) {
      emailMatch = false;
    }
    setRequestInfo(
      {
        ...requestInfo,
        nameFilled,
        emailFilled,
        confirmEmailFilled,
        nameValid,
        emailValid,
        emailMatch
      }
    )
    if (!nameFilled || !emailFilled || !confirmEmailFilled || !nameValid || !emailValid || !emailMatch) {
      return false;
    }
    return true;
  }

  function requestInfoOnChange(field, value) {
    const newRequestInfo = {
      ...requestInfo,
      [field]: value
    };
    setRequestInfo(newRequestInfo);
    if (!newRequestInfo.nameFilled || !newRequestInfo.emailFilled || !newRequestInfo.confirmEmailFilled || !newRequestInfo.nameValid || !newRequestInfo.emailValid || !newRequestInfo.emailMatch) {
      validateInputs(newRequestInfo);
    }
  }

  function sendRequest() {
    setIsLoading(true);
    axios.post(`https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth`, {
      name: requestInfo.name,
      email: requestInfo.email
    })
    .then((response) => {
      console.log(response.data);
      setIsLoading(false);
      setIsInvitationPopupOpen(false);
      setIsRequestSentPopupOpen(true);
      setRequestInfo(defaultRequestInfo);
    })
    .catch((e) => {
      // usedemail@airwallex.com
      console.log(e.response.data);
      const error = e.response.data;
      setErrorMessage(error.errorMessage);
      setIsLoading(false);
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <p>
          BROCCOLI & CO.
        </p>
      </header>
      <div className="app-body">
        <div className="app-content">
          <h1 className="app-title-1">A better way</h1>
          <h1 className="app-title-2">to enjoy every day.</h1>
          <p className="sub-title">Be the first to know when we launch.</p>
          <button className="request-an-invite-button" onClick={openInvitationPopup}>Request an invite</button>
        </div>
      </div>
      <footer className="app-footer">
        <p>
          Made with ❤ in Melbourne.
          <br />
          © 2016 Broccoli & Co. All rights reserved.
        </p>
      </footer>
      <div className={`popup-wrapper fade-in-down ${isInvitationPopupOpen ? 'show' : 'hide'}`}>
        <div className="popup">
          <div className="popup-content">
            <h2 className="popup-title">Request an invite</h2>
            <button className="close-button" onClick={dismissInvitationPopup}>X</button>
            <form>
              <div className="form-control">
                <input className={`input ${!requestInfo.nameFilled || !requestInfo.nameValid ? 'error' : ''}`} type="text" placeholder="Full name" value={requestInfo.name} onChange={(e) => requestInfoOnChange('name', e.target.value)} />
                {!requestInfo.nameFilled ? <div className="required-error">Required</div> : ''}
                {!requestInfo.nameValid ? <div className="required-error">At least 3 characters</div> : ''}
              </div>
              <div className="form-control">
                <input className={`input ${!requestInfo.emailFilled || !requestInfo.emailValid ? 'error' : ''}`} type="text" placeholder="Email" value={requestInfo.email} onChange={(e) => requestInfoOnChange('email', e.target.value)} />
                {!requestInfo.emailFilled ? <div className="required-error">Required</div> : ''}
                {!requestInfo.emailValid ? <div className="required-error">Email not valid</div> : ''}
              </div>
              <div className="form-control">
                <input className={`input ${!requestInfo.confirmEmailFilled || !requestInfo.emailMatch ? 'error' : ''}`} type="text" placeholder="Confirm email" value={requestInfo.confirmEmail} onChange={(e) => requestInfoOnChange('confirmEmail', e.target.value)} />
                {!requestInfo.confirmEmailFilled ? <div className="required-error">Required</div> : ''}
                {!requestInfo.emailMatch ? <div className="required-error">Email not match</div> : ''}
              </div>
              <button type="submit" className="ok-button" onClick={(e) => validateAndSendRequest(e)} disabled={isLoading}>{isLoading ? `Sending, please wait...` : `Send`}</button>
              <div className="error-message">{errorMessage}</div>
            </form>
          </div>
        </div>
        <div className='popup-backdrop'></div>
      </div>
      <div className={`popup-wrapper fade-in-down ${isRequestSentPopupOpen ? 'show' : 'hide'}`}>
        <div className="popup">
          <div className="popup-content">
            <h2 className="popup-title">All done!</h2>
            <p>You will be one of the first to experience Broccoli & Co. when we launch.</p>
            <button className="ok-button" onClick={dismissRequestSentPopup}>OK</button>
          </div>
        </div>
        <div className='popup-backdrop'></div>
      </div>
    </div>
  );
}

export default App;
