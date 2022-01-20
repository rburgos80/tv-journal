const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Journal = require("../models/journal.model");
const auth = require("../middleware/auth");

//Get all journals
router.get("/", async (req, res) => {
  try {
    const journals = await Journal.find();
    res.json(journals);
    console.log("Returned all journals");
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to return all journals");
  }
});

//Get all journals
router.get("/:journalId", async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.journalId);
    res.json(journal);
    console.log("Returned specific journal");
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to return specific journal");
  }
});

//Add new journal
router.post("/", async (req, res) => {
  try {
    const { userId, showId } = req.body;
    if (userId == null || showId == null) {
      res.status(400).json({ message: "Missing information" });
    }
    const newJournal = new Journal({ userId, showId, entries: [] });
    const savedJournal = await newJournal.save();
    console.log("Successfully saved new journal");
    return res.json(savedJournal);
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to add new journal");
  }
});

//Add new journal entry
router.post("/entry", async (req, res) => {
  try {
    const { episodeId, text, printedDate, journalId } = req.body;
    if (
      episodeId == null ||
      text == null ||
      printedDate == null ||
      journalId == null
    ) {
      res.status(400).json({ message: "Missing information" });
    }

    const newEntry = { episodeId, text, printedDate };

    const savedEntry = await Journal.findByIdAndUpdate(journalId, {
      $push: { entries: newEntry },
    });

    console.log(`Successfully added entry to journal ${journalId}`);
    return res.json(savedEntry);
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to add new entry");
  }
});

//Update journal entry
router.patch("/entry", async (req, res) => {
  try {
    const { entryId, text } = req.body;
    if (entryId == null || text == null) {
      res.status(400).json({ message: "Missing information" });
    }

    // const newEntry = { episodeId, text, printedDate };

    const savedEntry = await Journal.findOneAndUpdate(
      { "entries.id": entryId },
      {
        $set: { "entries.$.text": text },
      }
    );

    console.log(`Successfully updated entry ${entryId}`);
    return res.json(savedEntry);
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to update entry");
  }
});

//Remove specific journal entry
router.delete("/entry", async (req, res) => {
  try {
    const { entryId } = req.body;
    if (entryId == null) {
      res.status(400).json({ message: "Missing information" });
    }

    const removedEntry = await Journal.findOneAndUpdate(
      { "entries.id": entryId },
      {
        $pull: { entries: { _id: entryId } },
      }
    );

    console.log(`Successfully removed entry ${entryId}`);
    return res.json(removedEntry);
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to remove entry");
  }
});

//Delete journal
router.delete("/:journalId", async (req, res) => {
  try {
    const removedJournal = await Journal.deleteOne({
      _id: req.params.journalId,
    });
    res.json(removedJournal);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
