import express from 'express';
import prisma from '../database.js';

const router = express.Router();

router.get('/listar-usuarios', async (req, res) => {
  try {
    const users = await prisma.User.findMany(); 
    res.status(200).json(users);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

export default router;