import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: 'User',
      required: true
    },
    username: {
      type: String,
      required: true
    }
  }
});

export default mongoose.model('Projects', ProjectSchema);
