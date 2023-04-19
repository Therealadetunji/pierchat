import React from 'react';
import { ImPhoneHangUp } from 'react-icons/im';
import { BsFillCameraVideoFill, BsFillMicFill } from 'react-icons/bs';
import './styles/footer.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const endCall = () => {
    // redirect to main page and reload the page
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-center">
            <div className="d-flex align-items-center icons">
              <button
                className="btn end-call-sidebar"
                type="button"
                onClick={endCall}
              >
                <ImPhoneHangUp />
              </button>
              <button className="btn on-off-camera icon" type="button">
                <BsFillCameraVideoFill />
              </button>

              <button className="btn on-off-mic icon" type="button">
                <BsFillMicFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
