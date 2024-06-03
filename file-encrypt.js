const crypto = require('crypto');
const fs = require('fs');

console.time("Total Execution Time");

const filePath = 'C:/Users/PC/OneDrive/Desktop/encrypt_file_js/encrypted_1_teams.exe';
const key = '40e05bb65f976c4277cadc47166b86973ac6898337460f91d0bdc67b64ad3470'; // Replace with your 32-byte key

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.time("Encryption time");
  const iv = crypto.randomBytes(16); // Generate IV

  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
  console.timeEnd("Encryption time");

  const encryptedFilePath = 'encrypted_2_teams.exe';

  // Save the IV to a separate file (e.g., iv.txt)
  fs.writeFile('iv2.txt', iv, (err) => {
    if (err) {
      console.error('Error saving IV:', err);
    }
  });

  fs.writeFile(encryptedFilePath, encryptedData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('.exe file encrypted with 2nd key successfully!');
    }
    console.log(`Writing encrypted file to: ${encryptedFilePath}`);
  });
});

console.timeEnd("Total Execution Time");