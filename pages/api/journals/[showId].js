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
    const { showId } = req.query;
    const userId = session.user.id;

    switch (method) {
      case "GET":
        //Get specific journal
        const journal = await Journal.findOne({ showId, userId });

        if (!journal) {
          res.status(404).json({ message: "This journal does not exist" });
          break;
        }
        return res.json(journal);
        break;

      case "DELETE":
        //Delete journal

        const journalToDelete = await Journal.findOne({ showId, userId });
        if (!journalToDelete) {
          res.status(404).json({ message: "This journal does not exist" });
        }
        if (journalToDelete.userId !== userId) {
          res
            .status(401)
            .json({ message: "You are not authorized to delete this journal" });
          break;
        }

        const deletedJournal = await Journal.findByIdAndDelete(journalId);
        return res.json(deletedJournal);
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
