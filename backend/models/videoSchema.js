import mongoose from 'mongoose';

const VideoSchema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  shares: String,
  description: String,
  messages: String,
});

const Video = mongoose.model('Video', VideoSchema);

export default Video;
