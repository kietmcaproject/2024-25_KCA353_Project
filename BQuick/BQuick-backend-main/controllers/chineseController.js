import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import slugify from "slugify";

//getting details of chinese
export const getAllChinese = (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const chineseFilePath = path.resolve(__dirname, "../data/chinese.json");
        console.log("Resolved chinese file path:", chineseFilePath); // Log the resolved path

        if (!fs.existsSync(chineseFilePath)) {
            throw new Error(`File not found at path: ${chineseFilePath}`);
        }

        const chineseData = fs.readFileSync(chineseFilePath, "utf-8");
        const chinese = JSON.parse(chineseData);

        console.log(chinese);

        res.status(200).send({
            success: true,
            data: chinese,
        });

    } catch (err) {
        // Log full error stack for debugging
        console.error("Error fetching chinese data:", err.stack);
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching details of all products",
            err,
        });
    }
}

// getting single chinese by name
export const getChineseByName = (req, res) => {
    console.log({ slug: req.params.name });
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const chineseName = req.params.name; // get chinese name from URL parameters
        console.log(chineseName);
        // Resolve the chinese.json file path
        const chineseFilePath = path.resolve(__dirname, "../data/chinese.json");

        if (!fs.existsSync(chineseFilePath)) {
            throw new Error(`File not found at path: ${chineseFilePath}`);
        }

        // Read the chinese JSON file
        const chineseData = fs.readFileSync(chineseFilePath, "utf-8");
        const chineseArray = JSON.parse(chineseData);
        // Find chinese by name (case-insensitive comparison)
        const chinese = chineseArray.find(p => p.name.toLowerCase() === chineseName.toLowerCase());

        if (!chinese) {
            return res.status(404).send({
                success: false,
                message: `Chinese dish with name "${chineseName}" not found`,
            });
        }

        res.status(200).send({
            success: true,
            data: chinese,
        });

    } catch (err) {
        console.error("Error fetching chinese by name:", err.stack);
        res.status(500).send({
            success: false,
            message: "Error in fetching chinese details",
            error: err.message,
        });
    }
};
