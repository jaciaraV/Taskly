import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@lib/mongodb";
import Task from "@models/Task";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "O título é obrigatório" });
    const task = await Task.create({ title });
    return res.status(201).json(task);
  }

  res.status(405).json({ message: "Método não permitido" });
}
