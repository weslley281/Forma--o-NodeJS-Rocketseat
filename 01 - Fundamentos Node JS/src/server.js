import http from 'node:http';
import { json } from './middlewares/json.js'; // Importação do novo middleware

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Executa o middleware para processar o corpo da requisição
    await json(req, res);
    
    if (method === 'GET' && url === '/') {
      return res.end('Olá Mundo');
    }

  if (method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    // Agora o req.body já está disponível e tratado!
    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(5000);