import { getSession } from "next-auth/react";
import Entry from "../../../../models/entry.model";
import dbConnect from "../../../../lib/dbConnect";

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
    const episodeId = req.query.id;

    switch (method) {
      case "GET":
        const entries = await Entry.find({
          userId,
          "episode.id": episodeId,
        });
        res.json(entries);
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
