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
    show: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: null,
      },
    },
    entryCount: {
      type: Number,
      default: 0,
    },
    pinned: {
      type: Boolean,
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
