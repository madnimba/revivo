require ('dotenv/config');
const app = require('./app');
const database = require('./Database/main_db');

const port = process.env.PORT;
console.log(port);
app.listen(port, async () => {
    try{
        // create database connection pool, log startup message
        await database.startup();
        console.log(`listening on http://localhost:${port}`);
    } catch(err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
});




process
    .once('SIGTERM', database.shutdown)
    .once('SIGINT',  database.shutdown);
