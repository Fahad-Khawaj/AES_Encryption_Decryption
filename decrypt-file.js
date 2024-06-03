const crypto = require('crypto');
const fs = require('fs');

console.time("Total Execution Time");

const filePath = 'C:/Users/PC/OneDrive/Desktop/encrypt_file_js/dec_2_teams.exe'; // Replace with your encrypted file path
const key = '1e8344d20c32e85abc5245282a78baf525b45e8ed51120c8dbc8241090e4ab16'; // Replace with your 32-byte key
const iv = fs.readFileSync('iv1.txt'); // Read IV from a separate file

fs.readFile(filePath, (err, encryptedData) => {
  if (err) {
    console.error(err);
    return;
  }

  console.time("Decryption time");
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv));
  const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  console.timeEnd("Decryption time");

  const decryptedFilePath = 'dec_1_teams.exe';
  fs.writeFile(decryptedFilePath, decryptedData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('.exe decrypted with 1st key successfully!');
    }
  });
});
console.timeEnd("Total Execution Time");