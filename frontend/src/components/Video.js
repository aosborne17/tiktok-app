import React, { useRef, useState } from 'react';
import './Video.css';
import VideoFooter from './VideoFooter';
import VideoSidebar from './VideoSidebar';

const Video = ({
  url,
  channel,
  description,
  song,
  likes,
  messages,
  shares,
}) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPress = () => {
    // if the video is playing, stop it
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      //else if the video is stopped, play it
      videoRef.current.play();
      setPlaying(true);
    }
  };
  return (
    <div className='video'>
      <video
        className='video__player'
        loop
        // this gives us a way to target an individual video
        // this will be necessary to start/stop the videos
        ref={videoRef}
        onClick={handleVideoPress}
        src={url}
      ></video>
      <VideoFooter channel={channel} description={description} song={song} />
      <VideoSidebar likes={likes} shares={shares} messages={messages} />
    </div>
  );
};

export default Video;
