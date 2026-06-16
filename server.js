require('dotenv').config(); // to allow .env secret keys to be accessed in other files of the project/server/backend
const app = require('./src/app'); 
const connectDB = require('./src/db/db');

connectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})


