import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//getting details of pasta
export const getAllPasta = (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const pastaFilePath = path.resolve(__dirname, "../data/pasta.json");
        console.log("Resolved pasta file path:", pastaFilePath);

        if (!fs.existsSync(pastaFilePath)) {
            throw new Error(`File not found at path: ${pastaFilePath}`);
        }

        const pastaData = fs.readFileSync(pastaFilePath, "utf-8");
        const pasta = JSON.parse(pastaData);

        console.log(pasta);

        res.status(200).send({
            success: true,
            data: pasta,
        });

    } catch (err) {
        console.error("Error fetching pasta data:", err.stack);
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in fetching details of all pastas",
            err,
        });
    }
}

// getting single pasta by name
export const getPastaByName = (req, res) => {
    console.log({ slug: req.params.name });
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const pastaName = req.params.name;
        console.log(pastaName);

        const pastaFilePath = path.resolve(__dirname, "../data/pasta.json");

        if (!fs.existsSync(pastaFilePath)) {
            throw new Error(`File not found at path: ${pastaFilePath}`);
        }

        const pastaData = fs.readFileSync(pastaFilePath, "utf-8");
        const pastaArray = JSON.parse(pastaData);

        const pasta = pastaArray.find(p => p.name.toLowerCase() === pastaName.toLowerCase());

        if (!pasta) {
            return res.status(404).send({
                success: false,
                message: `Pasta with name "${pastaName}" not found`,
            });
        }

        res.status(200).send({
            success: true,
            data: pasta,
        });

    } catch (err) {
        console.error("Error fetching pasta by name:", err.stack);
        res.status(500).send({
            success: false,
            message: "Error in fetching pasta details",
            error: err.message,
        });
    }
};
