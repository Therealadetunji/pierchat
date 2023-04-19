import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import './styles/stream.css';

const Stream = ({ user }) => {
  const videoRef = useRef();

  useEffect(() => {
    user.videoTrack.play(videoRef.current);
  }, []);
  return (
    <>
      <div ref={videoRef} className="screen" />
    </>
  );
};

Stream.propTypes = {
  user: propTypes.shape({
    uid: propTypes.number,
    videoTrack: propTypes,
    audioTrack: propTypes,
  }).isRequired,
};

export default Stream;
