import * as crypto from 'crypto';

type PNRG = 'bytes'| 'int' | 'uuid';

const pnrg = (type: PNRG, size: number, min: number, max: number, encoding: BufferEncoding) => {
    switch (type) {
        case 'bytes':
            return crypto.randomBytes(size).toString(encoding);
        case 'int':
            return crypto.randomInt(min, max)
        case 'uuid':
            return crypto.randomUUID();
    }
};

export default pnrg;