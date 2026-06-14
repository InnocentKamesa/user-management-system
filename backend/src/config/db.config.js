import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool = "";

const environment = process.env.ENVIRONMENT;
if(!environment || environment === "development"){
    pool = new Pool({
        user: process.env.LOCAL_USER,
        password: process.env.LOCAL_PASSWORD,
        host: "localhost",
        port: process.env.PORT,
        database: process.env.LOCAL_DB_URL,
    });
}
else {
    pool = new Pool({
        connectionString: process.env.HOSTED_DB_URL,
        ssl: {
        rejectUnauthorized: false
    }
    });
}

export default pool;
