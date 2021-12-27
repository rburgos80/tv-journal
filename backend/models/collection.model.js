const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema(
  {
    version: {
      type: Number,
      default: 1.0,
    },
    userId: Number,
    name: String,
    showCount: Number,
    shows: [
      {
        apiId: Number,
        name: String,
        image: String,
        lastUpdated: { type: Date, default: () => Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
