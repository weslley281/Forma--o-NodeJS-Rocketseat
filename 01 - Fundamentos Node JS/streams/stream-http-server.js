import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = Number(chunk.toString());
        const result = 1 / number;
        callback(null, Buffer.from(String(result)));
    }
}

const server = http.createServer((req, res) => { 
    return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});