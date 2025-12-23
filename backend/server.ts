import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "./node_modules/.prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
  res.send("Bem-vindo ao backend de Tasks!");
});

// Rota para listar todas as tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tasks" });
  }
});

// Rota para criar uma nova task
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "O título é obrigatório" });
  }

  try {
    const newTask = await prisma.task.create({
      data: { title },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar task" });
  }
});

// Rota para marcar task como feita / atualizada
app.put("/tasks/:id", async (req, res) => {
  const taskId = Number(req.params.id);
  const { done } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { done },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar task" });
  }
});

// Rota para deletar uma task
app.delete("/tasks/:id", async (req, res) => {
  const taskId = Number(req.params.id);

  try {
    await prisma.task.delete({ where: { id: taskId } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar task" });
  }
});

// Rodar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
