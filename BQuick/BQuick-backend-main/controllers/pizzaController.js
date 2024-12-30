import fs from "fs";
import path from "path";
// import url from "url";
// import http from "http";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


//getting details of all pizza
export const getAllPizza = (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const pizzaFilePath = path.resolve(__dirname, "../data/pizza.json");
        console.log("Resolved pizza file path:", pizzaFilePath); // Log the resolved path

        if (!fs.existsSync(pizzaFilePath)) {
            throw new Error(`File not found at path: ${pizzaFilePath}`);
        }

        const pizzaData = fs.readFileSync(pizzaFilePath, "utf-8");
        const pizza = JSON.parse(pizzaData);

        console.log(pizza);

        res.status(200).send({
            success: true,
            data: pizza,
        });

    } catch (err) {
        // Log full error stack for debugging
        console.error("Error fetching pizza data:", err.stack);
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching details of all products",
            err,
        })
    }
}


// getting single pizza by name
export const getPizzaByName = (req, res) => {
    console.log({ slug: req.params.name });
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const pizzaName = req.params.name; // get pizza name from URL parameters
        console.log(pizzaName)
        // Resolve the pizza.json file path
        const pizzaFilePath = path.resolve(__dirname, "../data/pizza.json");

        if (!fs.existsSync(pizzaFilePath)) {
            throw new Error(`File not found at path: ${pizzaFilePath}`);
        }

        // Read the pizza JSON file
        const pizzaData = fs.readFileSync(pizzaFilePath, "utf-8");
        const pizzaArray = JSON.parse(pizzaData);
        // console.log(pizzaArray)
        // Find pizza by name (case-insensitive comparison)
        const pizza = pizzaArray.find(p => p.name.toLowerCase() == pizzaName.toLowerCase());

        if (!pizza) {
            return res.status(404).send({
                success: false,
                message: `Pizza with name "${pizzaName}" not found`,
            });
        }

        res.status(200).send({
            success: true,
            data: pizza,
        });

    } catch (err) {
        console.error("Error fetching pizza by name:", err.stack);
        res.status(500).send({
            success: false,
            message: "Error in fetching pizza details",
            error: err.message,
        });
    }
};


//get pizza by id
export const getPizzaById = (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const pizzaId = req.params.pizzaid; // get pizza name from URL parameters
        // console.log(pizzaId)
        // Resolve the pizza.json file path
        const pizzaFilePath = path.resolve(__dirname, "../data/pizza.json");

        if (!fs.existsSync(pizzaFilePath)) {
            throw new Error(`File not found at path: ${pizzaFilePath}`);
        }

        // Read the pizza JSON file
        const pizzaData = fs.readFileSync(pizzaFilePath, "utf-8");
        const pizzaArray = JSON.parse(pizzaData);
        // console.log(pizzaArray)
        // Find pizza by name (case-insensitive comparison)
        const pizza = pizzaArray.find(p => p.id.toLowerCase() == pizzaId.toLowerCase());

        if (!pizza) {
            return res.status(404).send({
                success: false,
                message: `Pizza with id "${pizzaName}" not found`,
            });
        }

        res.status(200).send({
            success: true,
            data: pizza,
        });

    } catch (err) {
        console.error("Error fetching pizza by name:", err.stack);
        res.status(500).send({
            success: false,
            message: "Error in fetching pizza details",
            error: err.message,
        });
    }
};

//fetch image of item by it's product_id
export const pizzaImageController = (req, res) => {
    try {
        // const product = await productModel.findById(req.params.pid).select("photo")
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const pizzaId = req.params.pizzaid; // get pizza name from URL parameters
        // console.log(pizzaId)
        // Resolve the pizza.json file path
        const pizzaFilePath = path.resolve(__dirname, `../images/pizzaImages/${pizzaId}.jpg`);

        if (!fs.existsSync(pizzaFilePath)) {
            throw new Error(`File not found at path: ${pizzaFilePath}`);
        }

        // // Read the pizza JSON file
        // const pizzaData = fs.readFileSync(pizzaFilePath, "utf-8");
        // const pizzaArray = JSON.parse(pizzaData);
        // // console.log(pizzaArray)
        // // Find pizza by name (case-insensitive comparison)
        // const pizza = pizzaArray.find(p => p.id.toLowerCase() == pizzaId.toLowerCase());

        if (pizza.photo.data) {
            res.set('Content-type', pizza.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Could not get photo",
            err,
        })
    }
}