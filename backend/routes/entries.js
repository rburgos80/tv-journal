const router = require("express").Router();
const Entry = require("../models/entry.model");
const auth = require("../middleware/auth");

//Get all entries on account
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Entry.find({
      userId: req.user.id,
    });
    res.json(entries);
    console.log("Returned all entries");
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to return all entries");
  }
});

//Get one entry
router.get("/:entryId", async (req, res) => {
  try {
    const { entryId } = req.params;
    const entry = await Entry.findById(entryId);
    res.json(entry);
    console.log(`Returned entry ${entryId}`);
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to return specific entry");
  }
});

//Get all entries for one show
router.get("/show/:showId", auth, async (req, res) => {
  try {
    const { showId } = req.params;
    const entries = await Entry.find({ userId: req.user.id, showId: showId });
    res.json(entries);
    console.log(`Return entries for show ${showId}`);
  } catch (err) {
    res.status(500).json({ message: err });
    console.log("Failed to return all entries for a specific show");
  }
});

//Get all entries for one episode
router.get("/episode/:episodeId", auth, async (req, res) => {
  try {
    const { episodeId } = req.params;
    const entries = await Entry.find({
      userId: req.user.id,
      episodeId: episodeId,
    });
    res.json(entries);
    console.log(`Return entries for episode ${episodeId}`);
  } catch (err) {
    res.status(500).json({ message: err });
    console.log("Failed to return all entries for a specific episode");
  }
});

//Add new entry
router.post("/", auth, async (req, res) => {
  try {
    const { showId, text, episodeId, episodeName } = req.body;

    if (showId == null || text == null) {
      res.status(400).json({ message: "Missing information" });
    }

    const newEntry = new Entry({
      userId: req.user.id,
      showId,
      text,
      episodeId,
      episodeName,
    });
    const savedEntry = await newEntry.save();
    console.log("Successfully saved new entry");
    return res.json(savedEntry);
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to add new entry");
  }
});

//Update journal entry
router.patch("/", auth, async (req, res) => {
  try {
    const { entryId, text } = req.body;
    if (entryId == null || text == null) {
      res.status(400).json({ message: "Missing information" });
    }

    // const entryToUpdate = await Entry.findById(entryId);
    // if (entryToUpdate.userId !== Mongoose.Types.ObjectId(req.user.id)) {
    //   res
    //     .status(401)
    //     .json({ message: "You are not authorized to update this entry" });
    // }

    const savedEntry = await Entry.findByIdAndUpdate(entryId, {
      $set: { text: text },
    });

    console.log(`Successfully updated entry ${entryId}`);
    return res.json(savedEntry);
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to update entry");
  }
});

//Delete entry
router.delete("/:entryId", auth, async (req, res) => {
  try {
    const { entryId } = req.params;
    if (entryId == null) {
      res.status(400).json({ message: "Missing information" });
    }

    // const entryToRemove = await Entry.findById(entryId);
    // console.log(entryToRemove.userId, req.user.id);
    // if (entryToRemove.userId !== Mongoose.Types.ObjectId(req.user.id)) {
    //   res
    //     .status(401)
    //     .json({ message: "You are not authorized to delete this entry" });
    // }

    const removedEntry = await Entry.findByIdAndRemove(entryId);

    console.log(`Successfully removed entry ${entryId}`);
    return res.json(removedEntry);
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to remove entry");
  }
});

module.exports = router;
