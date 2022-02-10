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
    date: String,
    show: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    episode: {
      id: Number,
      season: Number,
      number: Number,
      name: String,
    },
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
