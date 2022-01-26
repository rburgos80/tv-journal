const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema(
  {
    version: {
      type: Number,
      default: 1.0,
    },
    userId: {
      type: Number,
      required: true,
    },
    showId: { type: Number, required: true },
    entries: [
      {
        episodeId: Number,
        text: String,
        printedDate: String,
        date: { type: Date, default: () => Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Journal =
  mongoose.models.Journal || mongoose.model("Journal", journalSchema);

module.exports = Journal;
