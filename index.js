const express = require("express");
const router = require('./routes/GooglePapPlacesRoute');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
