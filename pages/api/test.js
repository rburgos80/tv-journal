import Journal from "../../models/journal.model";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        //All journals
        const journals = await Journal.find();
        res.status(200).json(journals);
        break;
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return;
}
