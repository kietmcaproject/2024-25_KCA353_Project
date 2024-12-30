import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//getting details of dessert
export const getAllDessert = (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const dessertFilePath = path.resolve(__dirname, "../data/dessert.json");
        console.log("Resolved dessert file path:", dessertFilePath);

        if (!fs.existsSync(dessertFilePath)) {
            throw new Error(`File not found at path: ${dessertFilePath}`);
        }

        const dessertData = fs.readFileSync(dessertFilePath, "utf-8");
        const dessert = JSON.parse(dessertData);

        console.log(dessert);

        res.status(200).send({
            success: true,
            data: dessert,
        });

    } catch (err) {
        console.error("Error fetching dessert data:", err.stack);
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching details of all desserts",
            err,
        });
    }
}

// getting single dessert by name
export const getDessertByName = (req, res) => {
    console.log({ slug: req.params.name });
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const dessertName = req.params.name;
        console.log(dessertName);

        const dessertFilePath = path.resolve(__dirname, "../data/dessert.json");

        if (!fs.existsSync(dessertFilePath)) {
            throw new Error(`File not found at path: ${dessertFilePath}`);
        }

        const dessertData = fs.readFileSync(dessertFilePath, "utf-8");
        const dessertArray = JSON.parse(dessertData);

        const dessert = dessertArray.find(p => p.name.toLowerCase() === dessertName.toLowerCase());

        if (!dessert) {
            return res.status(404).send({
                success: false,
                message: `Dessert with name "${dessertName}" not found`,
            });
        }

        res.status(200).send({
            success: true,
            data: dessert,
        });

    } catch (err) {
        console.error("Error fetching dessert by name:", err.stack);
        res.status(500).send({
            success: false,
            message: "Error in fetching dessert details",
            error: err.message,
        });
    }
};
