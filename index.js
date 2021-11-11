const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(express.json())

app.use('/', require('./src/Routers/rutas'));

app.listen(process.env.PORT || 3000, () => {

    console.log(`Server is running on port 3000`);
});