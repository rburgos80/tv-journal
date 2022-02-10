import { getSession } from "next-auth/react";
import Entry from "../../../models/entry.model";
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
      //Return all entries on account
      case "GET":
        const entries = await Entry.find({ userId });
        res.status(200).json(entries);
        break;

      //Post a new entry
      case "POST":
        try {
          const { date, show, episode, text } = req.body;

          if (show == null || text == null) {
            return res.status(400).json({ message: "Missing information" });
          }
          const newEntry = new Entry({
            userId,
            date,
            show,
            episode,
            text,
          });
          const savedEntry = await newEntry.save();

          //Update corresponding journal's entry count
          await Journal.updateOne(
            { userId, "show.id": show.id },
            { $inc: { entryCount: 1 } }
          );

          console.log("Successfully saved new entry");
          return res.json(savedEntry);
        } catch (err) {
          console.log("Failed to add new entry");
          res.status(500).json({ message: err });
        }
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
