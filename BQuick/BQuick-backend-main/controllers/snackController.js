import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//getting details of snacks
export const getAllSnacks = (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const snacksFilePath = path.resolve(__dirname, "../data/snacks.json");
        console.log("Resolved snacks file path:", snacksFilePath);

        if (!fs.existsSync(snacksFilePath)) {
            throw new Error(`File not found at path: ${snacksFilePath}`);
        }

        const snacksData = fs.readFileSync(snacksFilePath, "utf-8");
        const snacks = JSON.parse(snacksData);

        console.log(snacks);

        res.status(200).send({
            success: true,
            data: snacks,
        });

    } catch (err) {
        console.error("Error fetching snacks data:", err.stack);
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching details of all snacks",
            err,
        });
    }
}

// getting single snacks by name
export const getSnacksByName = (req, res) => {
    console.log({ slug: req.params.name });
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const snacksName = req.params.name;
        console.log(snacksName);

        const snacksFilePath = path.resolve(__dirname, "../data/snacks.json");

        if (!fs.existsSync(snacksFilePath)) {
            throw new Error(`File not found at path: ${snacksFilePath}`);
        }

        const snacksData = fs.readFileSync(snacksFilePath, "utf-8");
        const snacksArray = JSON.parse(snacksData);

        const snacks = snacksArray.find(p => p.name.toLowerCase() === snacksName.toLowerCase());

        if (!snacks) {
            return res.status(404).send({
                success: false,
                message: `Snack with name "${snacksName}" not found`,
            });
        }

        res.status(200).send({
            success: true,
            data: snacks,
        });

    } catch (err) {
        console.error("Error fetching snacks by name:", err.stack);
        res.status(500).send({
            success: false,
            message: "Error in fetching snacks details",
            error: err.message,
        });
    }
};
