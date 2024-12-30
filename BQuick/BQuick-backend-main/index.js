import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import pizzaRoutes from "./routes/pizzaRoutes.js"
import beverageRoutes from "./routes/beveragesRoutes.js"
import burgerRoutes from "./routes/burgerRoutes.js"
import breadRoutes from "./routes/breadRoutes.js"
import dessertRoutes from "./routes/dessertRoutes.js"
import pastaRoutes from "./routes/pastaRoutes.js"
import snackRoutes from "./routes/snackRoutes.js"
import chineseRoutes from "./routes/chineseRoutes.js"
import cors from "cors";

var app = express();
dotenv.config();

//middlewares
app.use(cors());
app.use(express.json())

// routes
app.use('/api/v1/pizza', pizzaRoutes);
app.use('/api/v1/beverage', beverageRoutes);
app.use('/api/v1/burger', burgerRoutes);
app.use('/api/v1/bread', breadRoutes);
app.use('/api/v1/chinese', chineseRoutes);
app.use('/api/v1/dessert', dessertRoutes);
app.use('/api/v1/pasta', pastaRoutes);
app.use('/api/v1/snack', snackRoutes);


//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to BQuick app</h1>")
})

//PORT 
const PORT = process.env.PORT || 8080;

var server = app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white);
})