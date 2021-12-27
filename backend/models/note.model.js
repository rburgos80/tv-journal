const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    version: {
      type: Number,
      default: 1.0,
    },
    userId: Number,
    showId: Number,
    notes: [
      {
        episodeId: Number,
        content: String,
        date: { type: Date, default: () => Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
