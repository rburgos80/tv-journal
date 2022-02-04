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
        //All journals on account
        const journals = await Journal.find({ userId });
        res.status(200).json(journals);
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
