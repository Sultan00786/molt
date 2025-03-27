import dotenv = require("dotenv");
import express from "express"; 

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello World!");
   return;
});

app.listen(8000, () => {
   console.log("Server is running on port 8000");
});
