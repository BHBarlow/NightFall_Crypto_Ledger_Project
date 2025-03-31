import express from "express";
import cors from "cors";
import { objNightChain } from "./index.js"; // Import blockchain logic

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors()); // Allow frontend requests

// ** API Routes **

// Get all blocks
app.get("/blocks", (req, res) => {
    res.json(objNightChain.chain);
});

// Mine a new block
app.post("/mine", (req, res) => {
    const { amount, sender, recipient } = req.body;
    if (!amount || !sender || !recipient) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newBlock = objNightChain.createNewBlock(amount, sender, recipient);
    res.json({ message: "New block mined!", block: newBlock });
});

// Start server
app.listen(PORT, () => console.log(`Blockchain API running at http://localhost:${PORT}`));
