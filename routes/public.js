import express from "express";
import prisma from '../database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Cadastro
router.post('/cadastro', async (req, res) => {
    const user = req.body;
    try {
        //gera o "peso" da criptografia (Salt)
        const salt = await bcrypt.genSalt(10);

        //embaralhar a senha digitada usando salt
        const hashPassword = await bcrypt.hash(user.password, salt);
        
        // salva no banco de dados com a senha ja protegida (hashPassword)
        const userDB = await prisma.User.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword, //salvando a senha segura
            }
        });
        res.status(201).json(userDB);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

//login
router.post('/login', async (req,res)=>{
    const loginData = req.body;

    try{
        //buscar o usuario no banco pelo email digitado
        const user = await prisma.User.findUnique({
            where : {email: loginData.email}
        });

        // se nao encontrar o email, retorna erro
        if(!user){
            return res.status(404).json({mensagem:"Usuário não encontrado"});
        }

        //comparar a senha digitada com a senha criptografada do banco
        const passwordCorrect = await bcrypt.compare(loginData.password, user.password);

        //se a sneha estiver errada retorna erro de credencias invalidas
        if(!passwordCorrect){
            return res.status(400).json({mensagem: "Senha incorreta"});
        }

        //gerrar o token de acesso jwt
        // passanso o id do usuario para saber quem ele é depois e a nossa chave secreta
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {
            expiresIn: '3d' //o token espira e perde a validade em 3 dias
        });
        
        //retorna o status 200 enviando o token gerado para o cliente
        res.status(200).json(token);

    } catch (erro){
        res.status(500).json({erro: erro.mensagem});
    }
});


export default router;