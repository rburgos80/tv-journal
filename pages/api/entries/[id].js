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
      return res.status(401).json({ message: "You are not signed in" });
    }

    const { method } = req;
    const userId = session.user.id;
    const entryId = req.query.id;

    switch (method) {
      //Update the text or tagged episode of an entry
      case "PATCH":
        try {
          const { episode, text } = req.body;

          if (text == null) {
            res.status(400).json({ message: "Missing information" });
          }

          const entryToUpdate = await Entry.findById(entryId);

          if (!entryToUpdate) {
            res.json({ message: "This entry does not exist" });
            break;
          }
          if (entryToUpdate.userId != userId) {
            res
              .status(401)
              .json({ message: "You are not authorized to modify this entry" });
            break;
          }

          const updatedEntry = await Entry.findByIdAndUpdate(
            entryId,
            {
              episode,
              text,
            },
            { new: true }
          );

          return res.json(updatedEntry);
        } catch (err) {
          res.status(500).json({ message: err });
        }
        break;
      case "DELETE":
        try {
          if (entryId == null) {
            res.status(400).json({ message: "Missing information" });
          }

          const entryToDelete = await Entry.findById(entryId);
          if (!entryToDelete) {
            res.json({ message: "This entry does not exist" });
            break;
          }
          if (entryToDelete.userId != userId) {
            res
              .status(401)
              .json({ message: "You are not authorized to delete this entry" });
            break;
          }

          const deletedEntry = await Entry.findByIdAndDelete(entryId);
          try {
            const updatedJournal = await Journal.findOneAndUpdate(
              { "show.id": deletedEntry.show.id, userId },
              {
                $inc: { entryCount: -1 },
              },
              { new: true }
            );
            if (updatedJournal.entryCount < 1) {
              await Journal.deleteOne({ _id: updatedJournal._id });
            }
          } catch (err) {
            res.json({
              message: `Failed to update Journal entryCount. ${err}`,
            });
            break;
          }
          return res.json(deletedEntry);
        } catch (err) {
          res.status(500).json({ message: err });
        }
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
