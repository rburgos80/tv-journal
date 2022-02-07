const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema(
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
    showId: {
      type: Number,
      required: true,
    },
    showName: {
      type: String,
      required: true,
    },
    showPicture: String,
    entryCount: {
      type: Number,
      default: 0,
    },
    pinned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Journal =
  mongoose.models.Journal || mongoose.model("Journal", journalSchema);

module.exports = Journal;
