import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import slugify from "slugify";

//getting details of burger
export const getAllBurger = (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const burgerFilePath = path.resolve(__dirname, "../data/burger.json");
        console.log("Resolved burger file path:", burgerFilePath); // Log the resolved path

        if (!fs.existsSync(burgerFilePath)) {
            throw new Error(`File not found at path: ${burgerFilePath}`);
        }

        const burgerData = fs.readFileSync(burgerFilePath, "utf-8");
        const burger = JSON.parse(burgerData);

        console.log(burger);

        res.status(200).send({
            success: true,
            data: burger,
        });

    } catch (err) {
        // Log full error stack for debugging
        console.error("Error fetching burger data:", err.stack);
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching details of all products",
            err,
        });
    }
}

// getting single burger by name
export const getBurgerByName = (req, res) => {
    console.log({ slug: req.params.name });
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const burgerName = req.params.name; // get burger name from URL parameters
        console.log(burgerName);
        // Resolve the burger.json file path
        const burgerFilePath = path.resolve(__dirname, "../data/burgers.json");

        if (!fs.existsSync(burgerFilePath)) {
            throw new Error(`File not found at path: ${burgerFilePath}`);
        }

        // Read the burger JSON file
        const burgerData = fs.readFileSync(burgerFilePath, "utf-8");
        const burgerArray = JSON.parse(burgerData);
        // Find burger by name (case-insensitive comparison)
        const burger = burgerArray.find(p => p.name.toLowerCase() === burgerName.toLowerCase());

        if (!burger) {
            return res.status(404).send({
                success: false,
                message: `Burger with name "${burgerName}" not found`,
            });
        }

        res.status(200).send({
            success: true,
            data: burger,
        });

    } catch (err) {
        console.error("Error fetching burger by name:", err.stack);
        res.status(500).send({
            success: false,
            message: "Error in fetching burger details",
            error: err.message,
        });
    }
};
