import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import routesRouter from "./routes/routes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/routes", routesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
