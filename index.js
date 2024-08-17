const express = require("express");
const router = require('./routes/GooglePapPlacesRoute');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();


const PORT = process.env.BACKEND_URL || 3000;
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
