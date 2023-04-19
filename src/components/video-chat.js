import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import Stream from './stream';
import Message from './message';
import './styles/stream.css';

const APP_ID = 'e73d9720a2034852b8e53f492c46288b';
const TOKEN = '007eJxTYPBXDZjzr6Jg/pmsvSxL2iy/m7zfLyD8/Oa6OQ+WV6pGnmlQYEg1N06xNDcySDQyMDaxMDVKskg1NU4zsTRKNjEzsrBIqlhll9IQyMjA8nYLEyMDBIL4HAwFmalFyRmJJQwMAB0/IcY=';
const CHANNEL_NAME = 'pierchat';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

const VideoChat = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const Joineduser = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === 'video') {
      setUsers((prev) => [...prev, user]);
    }

    if (mediaType === 'audio') {
      console.log('User joined with audio');
    }
  };

  const Leftuser = (user) => {
    setUsers((prev) => prev.filter((prevUser) => prevUser.uid !== user.uid));
  };

  useEffect(() => {
    // to listen when a user joins the channel
    client.on('user-published', Joineduser);
    client.on('user-left', Leftuser);

    // tell broswer to join the agora server

    client.join(APP_ID, CHANNEL_NAME, TOKEN, null)
      .then((uid) => Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]))
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        // play the local video track
        setLocalTracks(tracks);
        setUsers((prev) => [...prev, { uid, videoTrack, audioTrack }]);
        client.publish(tracks);
      });

    // clean up function

    return () => {
      localTracks.forEach((track) => track.stop());
      localTracks.forEach((track) => {
        track.close();
      });

      client.off('user-published', Joineduser);
      client.off('user-left', Leftuser);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="the-screen">
            {users.map((user) => (
              <Stream key={user.uid} user={user} />
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="chat">
            <Message />
          </div>
        </div>
      </div>
    </div>

  );
};

export default VideoChat;
