import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import slugify from "slugify";

//getting details of beverage
export const getAllBeverage = (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const beverageFilePath = path.resolve(__dirname, "../data/beverages.json");
        console.log("Resolved beverage file path:", beverageFilePath); // Log the resolved path

        if (!fs.existsSync(beverageFilePath)) {
            throw new Error(`File not found at path: ${beverageFilePath}`);
        }

        const beverageData = fs.readFileSync(beverageFilePath, "utf-8");
        const beverage = JSON.parse(beverageData);

        console.log(beverage);

        res.status(200).send({
            success: true,
            data: beverage,
        });

    } catch (err) {
        // Log full error stack for debugging
        console.error("Error fetching beverage data:", err.stack);
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching details of all products",
            err,
        })
    }
}


// getting single beverage by name
export const getBeverageByName = (req, res) => {
    console.log({ slug: req.params.name });
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const beverageName = req.params.name; // get beverage name from URL parameters
        console.log(beverageName)
        // Resolve the beverage.json file path
        const beverageFilePath = path.resolve(__dirname, "../data/beverages.json");

        if (!fs.existsSync(beverageFilePath)) {
            throw new Error(`File not found at path: ${beverageFilePath}`);
        }

        // Read the beverage JSON file
        const beverageData = fs.readFileSync(beverageFilePath, "utf-8");
        const beverageArray = JSON.parse(beverageData);
        // Find beverage by name (case-insensitive comparison)
        const beverage = beverageArray.find(p => p.name.toLowerCase() === beverageName.toLowerCase());

        if (!beverage) {
            return res.status(404).send({
                success: false,
                message: `Beverage with name "${beverageName}" not found`,
            });
        }

        res.status(200).send({
            success: true,
            data: beverage,
        });

    } catch (err) {
        console.error("Error fetching beverage by name:", err.stack);
        res.status(500).send({
            success: false,
            message: "Error in fetching beverage details",
            error: err.message,
        });
    }
};
