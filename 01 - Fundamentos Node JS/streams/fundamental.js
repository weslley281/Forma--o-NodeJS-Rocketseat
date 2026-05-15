// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from 'stream';

class OneToHundredStream extends Readable {
    index = 1;
    
    _read() {
        const i = this.index++;
        
        if (i > 10) {
            this.push(null);
        } else {
            const buf = Buffer.from(String(i + "\n"));
            
            setTimeout(() => this.push(buf), 1000);
        }
    }
}

class MultiplyByStream extends Writable {
    _write(chunk, encoding, callback) {
        const number = Number(chunk.toString());
        const result = number * 10;
        console.log(result);
        callback();
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = Number(chunk.toString());
        const result = 1 / number;
        callback(null, Buffer.from(String(result)));
    }
}


new OneToHundredStream().pipe(process.stdout);
new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByStream());