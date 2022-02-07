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
          res.json({ message: "A journal for this show does not exist" });
          break;
        }
        res.status(200).json(journal);
        break;

      case "DELETE":
        //Delete journal

        const journalToDelete = await Journal.findOne({ showId, userId });
        if (!journalToDelete) {
          res.status(400).json({ message: "This journal does not exist" });
        }
        if (journalToDelete.userId !== userId) {
          res
            .status(401)
            .json({ message: "You are not authorized to delete this journal" });
          break;
        }

        const deletedJournal = await Journal.findByIdAndDelete(journalId);
        res.status(200).json(deletedJournal);
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
