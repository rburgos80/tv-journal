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
      //Get specific journal
      case "GET":
        const journal = await Journal.findOne({ showId, userId });

        if (!journal) {
          res.status(404).json({ message: "This journal does not exist" });
          break;
        }
        res.json(journal);
        break;

      //Delete journal
      case "DELETE":
        //Check if journal exists and user is authorized to delete it
        const journalToDelete = await Journal.findOne({
          "show.id": showId,
          userId,
        });
        if (!journalToDelete) {
          res.status(404).json({ message: "This journal does not exist" });
        }
        if (journalToDelete.userId !== userId) {
          res
            .status(401)
            .json({ message: "You are not authorized to delete this journal" });
          break;
        }

        const deletedJournal = await Journal.findOneAndDelete({
          "show.id": showId,
          userId,
        });
        res.json(deletedJournal);
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
