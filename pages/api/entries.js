import { getSession } from "next-auth/react";
import Entry from "../../models/entry.model";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    if (session) {
      // Signed in
      console.log("Session", JSON.stringify(session, null, 2));
    } else {
      // Not Signed in
      res.status(401).json({ message: "You are not signed in" });
    }
    const { method } = req;

    switch (method) {
      case "GET":
        const entries = await Entry.find();
        res.status(200).json(entries);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
