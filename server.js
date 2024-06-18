const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import cors

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(express.static('public'));

// Allow CORS from your Webflow domain and localhost for testing
app.use(cors({
    origin: ['https://basedev.webflow.io', 'http://localhost:3002']
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
