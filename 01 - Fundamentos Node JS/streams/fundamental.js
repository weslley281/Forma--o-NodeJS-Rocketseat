// process.stdin.pipe(process.stdout);

import { Readable } from 'stream';

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


new OneToHundredStream().pipe(process.stdout);