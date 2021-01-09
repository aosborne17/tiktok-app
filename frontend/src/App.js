import { useEffect, useState } from 'react';
import './App.css';
import Video from './components/Video';
import axios from 'axios';

function App() {
  const [videos, setVideos] = useState([]);
  console.log(videos);
  // empty dependency as we only want to run this once
  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get('/v2/api/posts');
      setVideos(data);
      return data;
    }
    fetchPosts();
  }, []);
  return (
    <div className='app'>
      <div className='app__videos'>
        {videos &&
          videos.map(
            ({ description, song, url, likes, messages, shares, channel }) => (
              <Video
                channel={channel}
                description={description}
                song={song}
                url={url}
                likes={likes}
                messages={messages}
                shares={shares}
              />
            )
          )}
      </div>
    </div>
  );
}

export default App;
