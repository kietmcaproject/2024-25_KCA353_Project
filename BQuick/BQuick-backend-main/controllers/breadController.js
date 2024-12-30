import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import slugify from "slugify";

//getting details of bread
export const getAllBread = (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const breadFilePath = path.resolve(__dirname, "../data/bread.json");
        console.log("Resolved bread file path:", breadFilePath); // Log the resolved path

        if (!fs.existsSync(breadFilePath)) {
            throw new Error(`File not found at path: ${breadFilePath}`);
        }

        const breadData = fs.readFileSync(breadFilePath, "utf-8");
        const bread = JSON.parse(breadData);

        console.log(bread);

        res.status(200).send({
            success: true,
            data: bread,
        });

    } catch (err) {
        // Log full error stack for debugging
        console.error("Error fetching bread data:", err.stack);
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching details of all products",
            err,
        });
    }
}

// getting single bread by name
export const getBreadByName = (req, res) => {
    console.log({ slug: req.params.name });
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const breadName = req.params.name; // get bread name from URL parameters
        console.log(breadName);
        // Resolve the bread.json file path
        const breadFilePath = path.resolve(__dirname, "../data/bread.json");

        if (!fs.existsSync(breadFilePath)) {
            throw new Error(`File not found at path: ${breadFilePath}`);
        }

        // Read the bread JSON file
        const breadData = fs.readFileSync(breadFilePath, "utf-8");
        const breadArray = JSON.parse(breadData);
        // Find bread by name (case-insensitive comparison)
        const bread = breadArray.find(p => p.name.toLowerCase() === breadName.toLowerCase());

        if (!bread) {
            return res.status(404).send({
                success: false,
                message: `Bread with name "${breadName}" not found`,
            });
        }

        res.status(200).send({
            success: true,
            data: bread,
        });

    } catch (err) {
        console.error("Error fetching bread by name:", err.stack);
        res.status(500).send({
            success: false,
            message: "Error in fetching bread details",
            error: err.message,
        });
    }
};
