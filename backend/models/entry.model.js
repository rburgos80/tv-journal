const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema(
  {
    version: {
      type: Number,
      default: 1.0,
    },
    userId: Number,
    showId: Number,
    seasonId: Number,
    text: String,
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

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
