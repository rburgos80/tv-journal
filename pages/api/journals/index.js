import { getSession } from "next-auth/react";
import Journal from "../../../models/journal.model";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  try {
    const session = await getSession({ req });
    if (!session) {
      // Not Signed in
      return res.status(401).json({ message: "You are not signed in" });
    }

    const { method } = req;
    const userId = session.user.id;

    switch (method) {
      //Get all journals on account
      case "GET":
        const journals = await Journal.find({ userId }).sort({ updatedAt: -1 });
        res.json(journals);
        break;

      //Create new journal
      case "POST":
        const { show, entryCount } = req.body;

        if (
          userId == null ||
          show == null ||
          show.id == null ||
          show.name == null
        ) {
          res.status(400).json({ message: "Missing information" });
          break;
        }

        //Check to see if journal already exists
        const journalExists = await Journal.findOne({
          "show.id": show.id,
          userId,
        });

        if (journalExists) {
          res.json({ message: "A journal for this show already exists" });
          break;
        }

        //Save new journal to database
        const newJournal = new Journal({
          userId,
          show,
          entryCount,
        });

        const savedJournal = await newJournal.save();
        res.status(201).json(savedJournal);
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
