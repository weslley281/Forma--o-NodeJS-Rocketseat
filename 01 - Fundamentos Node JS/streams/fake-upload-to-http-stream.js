import http from 'node:http';
import { Readable } from 'node:stream';

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

fetch('http://localhost:3000', {
    method: 'POST',
    body: new OneToHundredStream()
});