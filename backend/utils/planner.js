import haversine from "./haversine.js";

export default function generatePlannedRoute(stops) {
    const stopIds = Object.keys(stops);
    const visited = new Set();
    const route = [];

    let current = stopIds[0];
    route.push(current);
    visited.add(current);

    while (route.length < stopIds.length) {
        let nearest = null;
        let minDistance = Infinity;

        for (const stopId of stopIds) {
            if (visited.has(stopId)) continue;

            const distance = haversine(
                stops[current],
                stops[stopId]
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearest = stopId;
            }
        }

        visited.add(nearest);
        route.push(nearest);
        current = nearest;
    }

    return route;
}
