const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => res.send("Art API is running"));

app.post('/artify', upload.single('image'), (req, res) => {
  const style = req.query.style || 'anime';
  const inputPath = req.file.path;
  const outputPath = path.join('outputs', `${req.file.filename}_${style}.jpg`);

  const cmd = `python3 styles/${style}.py ${inputPath} ${outputPath}`;

  exec(cmd, (err) => {
    if (err) {
      console.error(err);
      fs.unlinkSync(inputPath);
      return res.status(500).send('Error processing image');
    }

    res.sendFile(path.resolve(outputPath), (err) => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
      if (err) console.error(err);
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
