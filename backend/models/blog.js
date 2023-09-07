const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  url: {
    type: String,
    required: true,
  },
  likes: [ {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      comment: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    },
  ]
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
