import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {
    
    //pegar token enviado pelo tc no headers
    const token = req.headers.authorization;

    //barrar o acesso se nao for enviado o token
    if(!token){
        return res.status(401).json({ mesnsagem : "Acesso Negado! Token não fornecido"});
    }

    try{

        //limpar Bearer 
        //valida se o token e verdadeiro usando a chave secreta
        const decoded = jwt.verify(token.replace('Bearer', '').trim(), JWT_SECRET)

        //Salva o ID do usuário dentro da requisição 
        req.userId = decoded.id;

    } catch (erro) {
        return res.status(401).json({ mensagem: "Token invalido ou expirado."});
    }

    //Se tudo estiver certo, o "next()" manda a requisição prosseguir para a rota real
    next()
}

export default auth