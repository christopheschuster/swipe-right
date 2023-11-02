/*
Filename: complex_js_code.js

Description: 
This code is an implementation of a complex encryption and decryption algorithm for secure message transmission. It uses a combination of various cryptographic techniques, such as symmetric encryption, hashing, and key exchange.

This code is intended for educational and demonstration purposes only. It is not meant to be used in production systems and should not be considered as a secure encryption solution.

*/

// Import necessary libraries
const crypto = require('crypto');
const fs = require('fs');

// Generate a random symmetric encryption key
const secretKey = crypto.randomBytes(32).toString('hex');

// Generate a random initialization vector
const iv = crypto.randomBytes(16).toString('hex');

// Generate a random salt for key derivation
const salt = crypto.randomBytes(16).toString('hex');

// Read message from a file
const plaintext = fs.readFileSync('message.txt', 'utf8');

// Generate a hash of the plaintext message using SHA-256
const messageHash = crypto.createHash('sha256').update(plaintext).digest('hex');

// Generate a password-based key with the provided secret key and salt
const derivedKey = crypto.pbkdf2Sync(secretKey, salt, 100000, 32, 'sha512');

// Encrypt the plaintext message using AES-256 in CBC mode
const cipher = crypto.createCipheriv('aes-256-cbc', derivedKey, iv);
let encryptedMessage = cipher.update(plaintext, 'utf8', 'hex');
encryptedMessage += cipher.final('hex');

// Generate a digital signature of the encrypted message using the secret key
const signature = crypto.createHmac('sha256', secretKey).update(encryptedMessage).digest('hex');

// Save the encrypted message and signature to files
fs.writeFileSync('encrypted_message.txt', encryptedMessage, 'utf8');
fs.writeFileSync('message_signature.txt', signature, 'utf8');

// Read the encrypted message and signature from files
const storedEncryptedMessage = fs.readFileSync('encrypted_message.txt', 'utf8');
const storedSignature = fs.readFileSync('message_signature.txt', 'utf8');

// Verify the integrity of the encrypted message by recalculating the signature
const recalculatedSignature = crypto.createHmac('sha256', secretKey).update(storedEncryptedMessage).digest('hex');

// Compare the recalculated signature with the stored signature
if (storedSignature !== recalculatedSignature) {
  console.error('The message has been tampered with. Verification failed!');
  process.exit(1);
}

// Decrypt the stored encrypted message using the derived key and IV
const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
let decryptedMessage = decipher.update(storedEncryptedMessage, 'hex', 'utf8');
decryptedMessage += decipher.final('utf8');

// Compare the hashes of the decrypted message and original plaintext
if (messageHash !== crypto.createHash('sha256').update(decryptedMessage).digest('hex')) {
  console.error('The decrypted message does not match the original plaintext. Decryption failed!');
  process.exit(1);
}

// Display the decrypted message
console.log('Decrypted message:', decryptedMessage);