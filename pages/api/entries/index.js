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
      case "GET":
        //All entries on account
        const entries = await Entry.find({ userId });
        res.status(200).json(entries);
        break;
      case "POST":
        try {
          const {
            date,
            showId,
            showName,
            episodeId,
            episodeSeason,
            episodeNumber,
            episodeName,
            text,
          } = req.body;

          if (showId == null || showName == null || text == null) {
            res.status(400).json({ message: "Missing information" });
          }

          const newEntry = new Entry({
            userId,
            date,
            showId,
            showName,
            episodeId,
            episodeSeason,
            episodeNumber,
            episodeName,
            text,
          });

          const savedEntry = await newEntry.save();
          await Journal.findOneAndUpdate(
            { showId, userId },
            {
              $inc: { entryCount: 1 },
            }
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
