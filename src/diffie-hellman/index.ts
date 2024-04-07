import * as crypto from 'crypto';

const diffieHellman = (
  encoding: crypto.BinaryToTextEncoding,
  from?: {
    prime: string;
    primeEncoding: crypto.BinaryToTextEncoding;
    generator: string;
    generatorEncoding: crypto.BinaryToTextEncoding;
    publicKey: string;
    publicKeyEncoding: crypto.BinaryToTextEncoding;
    privateKey: string;
    privateKeyEncoding: crypto.BinaryToTextEncoding;
  }
) => {
  if(!from) {
    // Si no se proporcionan datos de entrada, generamos nuevos parámetros Diffie-Hellman
    const dh = crypto.createDiffieHellmanGroup('modp14'); // seguridad de 128 bits
    return {
      prime: dh.getPrime(encoding),
      generator: dh.getGenerator(encoding),
      publicKey: dh.generateKeys(encoding),
      privateKey: dh.getPrivateKey(encoding),
    }
  } else {
    // Si se proporcionan datos de entrada, utilizamos los parámetros especificados
    const dh = crypto.createDiffieHellman(
      from.prime,
      from.primeEncoding,
      from.generator,
      from.generatorEncoding,
    );

    // Configuramos las claves pública y privada con los valores especificados
    dh.setPrivateKey(from.privateKey, from.privateKeyEncoding);
    dh.setPublicKey(from.publicKey, from.publicKeyEncoding);

    return {
      prime: dh.getPrime(encoding),
      generator: dh.getGenerator(encoding),
      publicKey: dh.getPublicKey(encoding),
      privateKey: dh.getPrivateKey(encoding),
      secret: dh.computeSecret(from.publicKey, from.publicKeyEncoding, encoding),
    };
  };
};

export default diffieHellman;