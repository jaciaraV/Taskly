import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    res.status(200).json({ message: "Connection to MongoDB successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error connecting to MongoDB", error });
  }
}
