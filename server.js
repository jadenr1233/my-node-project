const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Allow CORS from your Webflow domain
app.use(cors({
    origin: 'https://basedev.webflow.io'
}));

const pointsFilePath = path.join(__dirname, 'points.json');

function readPoints() {
    if (fs.existsSync(pointsFilePath)) {
        const data = fs.readFileSync(pointsFilePath, 'utf8');
        return JSON.parse(data);
    } else {
        return [];
    }
}

let points = readPoints();

app.get('/', (req, res) => {
    res.json(points);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
