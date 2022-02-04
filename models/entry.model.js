const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema(
  {
    version: {
      type: Number,
      default: 1.0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: () => Date.now(),
    },
    showId: {
      type: Number,
      required: true,
    },
    showName: {
      type: String,
      required: true,
    },
    episodeId: Number,
    episodeSeason: Number,
    episodeNumber: Number,
    episodeName: String,
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

module.exports = Entry;
