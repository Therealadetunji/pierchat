import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../images/images.png';

const Hero = () => {
  const navigate = useNavigate();

  const [room, setRoom] = useState(false);

  const onClick = () => {
    // When butto is clicked, redirect to Room

    navigate('/room');
  };

  return (
    // herro section with image
    <section className="hero">
      <div className="container-fluid p-5 d-flex align-items-center justify-content-center">
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-success">PierChat</h1>
            <p className="h3">
              A video chat app that allows you to connect with your friends and
              family.
            </p>

            {!room && (
            <button
              className="btn btn-success"
              onClick={() => setRoom(true)}
              type="button"
            >
              Join Room
            </button>
            )}

            {room && (
              onClick()
            )}

          </div>
          <div className="col-md-6 mt-4">
            <img
              src={img}
              alt="hero-img"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
