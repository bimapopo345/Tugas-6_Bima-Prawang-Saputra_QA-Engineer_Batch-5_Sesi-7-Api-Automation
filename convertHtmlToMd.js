const fs = require('fs');
const { htmlToText } = require('html-to-text');

// Path ke file laporan HTML yang dihasilkan oleh mochawesome
const htmlFilePath = './mochawesome-report/mochawesome.html'; // Sesuaikan path sesuai struktur folder Anda
const readmeFilePath = './README.md';

// Baca file HTML
fs.readFile(htmlFilePath, 'utf8', (err, html) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }

    // Convert HTML to text
    const text = htmlToText(html, {
        wordwrap: 130
    });

    // Tambahkan hasil konversi ke README.md
    fs.appendFile(readmeFilePath, `\n## Test Results\n\n${text}\n`, (err) => {
        if (err) {
            console.error('Error writing to README.md:', err);
        } else {
            console.log('Test results have been added to README.md');
        }
    });
});
