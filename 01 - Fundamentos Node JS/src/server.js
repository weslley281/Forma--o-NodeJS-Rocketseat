import http from 'node:http';

const PORT = 5000;
const users = [{
    id: 2, name: "Vampeta", email: "vampeta@gmail.com"
}];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Olá Mundo');

    } else if (method === 'GET' && url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(users.length > 0 ? JSON.stringify(users) : 'Nenhum usuário encontrado'); 

    } else if (method === 'POST' && url === '/users') {
        users.push({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });

        if (users.length > 0) {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Usuário criado' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Nenhum usuário encontrado' }));
        }
        

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');

    }
});

console.log(`Servidor rodando na porta http://localhost:${PORT}`);

server.listen(PORT);