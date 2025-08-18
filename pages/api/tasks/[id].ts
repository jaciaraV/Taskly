import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@lib/mongodb";
import Task from "@models/Task";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "PUT") {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(task);
  }

  if (req.method === "DELETE") {
    await Task.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).json({ message: "Method not allowed" });
}
