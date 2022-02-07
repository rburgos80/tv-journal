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
      case "PATCH":
        try {
          const { episodeId, episodeSeason, episodeNumber, episodeName, text } =
            req.body;

          if (text == null) {
            res.status(400).json({ message: "Missing information" });
          }

          const entryToUpdate = await Entry.findOne({
            _id: req.query.id,
          });

          if (!entryToUpdate) {
            res.status(400).json({ message: "This entry does not exist" });
            break;
          }
          if (entryToUpdate.userId !== userId) {
            res
              .status(401)
              .json({ message: "You are not authorized to modify this entry" });
            break;
          }

          const updatedEntry = await Entry.findByIdAndUpdate(req.query.id, {
            episodeId,
            episodeSeason,
            episodeNumber,
            episodeName,
            text,
          });

          console.log("Successfully updated entry");
          return res.json(updatedEntry);
        } catch (err) {
          console.log("Failed to update entry");
          res.status(500).json({ message: err });
        }
        break;
      case "DELETE":
        try {
          const { entryId } = req.body;

          if (entryId == null) {
            res.status(400).json({ message: "Missing information" });
          }

          const deletedEntry = await Entry.findByIdAndDelete(entryId);
          await Journal.findOneAndUpdate(
            { showId, userId },
            {
              $dec: { entryCount: 1 },
            }
          );
          console.log("Successfully deleted entry");
          return res.json(deletedEntry);
        } catch (err) {
          console.log("Failed to delete entry");
          res.status(500).json({ message: err });
        }
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
