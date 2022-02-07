import { getSession } from "next-auth/react";
import Journal from "../../../models/journal.model";
import dbConnect from "../../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  try {
    const session = await getSession({ req });
    if (!session) {
      // Not Signed in
      res.status(401).json({ message: "You are not signed in" });
    }
    const { method } = req;
    const userId = session.user.id;

    switch (method) {
      case "GET":
        //All journals on account
        const journals = await Journal.find({ userId });
        res.status(200).json(journals);
        break;
      case "POST":
        //Create new journal
        const { showId, showName, showPicture } = req.body;

        if (userId == null || showId == null || showName == null) {
          res.status(400).json({ message: "Missing information" });
        }

        const journalExists = await Journal.findOne({ showId, userId });
        if (journalExists) {
          res
            .status(409)
            .json({ message: "A journal for this show already exists" });
          break;
        }

        const newJournal = new Journal({
          userId,
          showId,
          showName,
          showPicture,
        });
        const savedJournal = await newJournal.save();
        res.status(200).json(savedJournal);
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
