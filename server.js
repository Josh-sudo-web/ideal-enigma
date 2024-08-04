const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

// Load the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Update the meta tags server-side
app.post('/update-meta-tags', (req, res) => {
    const { title, description, keywords } = req.body;

    // Update the meta tags in the index.html file
    fs.readFile(__dirname + '/index.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error updating meta tags' });
        } else {
            const updatedHtml = data.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
                                    .replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${description}">`)
                                    .replace(/<meta name="keywords" content=".*?">/, `<meta name="keywords" content="${keywords}">`);

            fs.writeFile(__dirname + '/index.html', updatedHtml, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({ message: 'Error updating meta tags' });
                } else {
                    res.send({ message: 'Meta tags updated successfully' });
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
