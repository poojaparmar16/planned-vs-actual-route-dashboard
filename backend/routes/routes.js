import express from "express";
import fs from "fs";
import path from "path";

import generatePlannedRoute from "../utils/planner.js";
import computeMetrics from "../utils/metrics.js";

const router = express.Router();

const routeDataRaw = fs.readFileSync(path.resolve("./data/route_data.json"), "utf-8");
const actualSequencesRaw = fs.readFileSync(path.resolve("./data/actual_sequences.json"), "utf-8");

const routeData = JSON.parse(routeDataRaw.replace(/\bNaN\b/g, "null"));
const actualSequences = JSON.parse(actualSequencesRaw.replace(/\bNaN\b/g, "null"));

router.get("/", (req, res) => {
    const routes = Object.entries(routeData).map(([routeId, route]) => ({
        routeId,
        stationCode: route.station_code,
        stopCount: Object.keys(route.stops).length,
    }));

    const totalStops = routes.reduce((sum, r) => sum + r.stopCount, 0);

    res.json({
        totalRoutes: routes.length,
        totalStops,
        routes,
    });
});

router.get("/:routeId", (req, res) => {
    const { routeId } = req.params;

    const route = routeData[routeId];
    const actual = actualSequences[routeId];

    if (!route || !actual) {
        return res.status(404).json({ message: "Route not found" });
    }

    const plannedSequence = generatePlannedRoute(route.stops);

    const actualSequence = Object.entries(actual.actual)
        .sort((a, b) => a[1] - b[1])
        .map(([stopId]) => stopId);

    const metrics = computeMetrics(plannedSequence, actualSequence, route.stops);

    res.json({
        routeId,
        stationCode: route.station_code,
        plannedSequence,
        actualSequence,
        stops: route.stops,
        metrics,
    });
});

export default router;
