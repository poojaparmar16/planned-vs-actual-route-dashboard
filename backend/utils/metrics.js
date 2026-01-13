import haversine from "./haversine.js";

function calculateDistance(sequence, stops) {
    let distance = 0;

    for (let i = 0; i < sequence.length - 1; i++) {
        distance += haversine(
            stops[sequence[i]],
            stops[sequence[i + 1]]
        );
    }

    return distance;
}

export default function computeMetrics(planned, actual, stops) {
    const plannedDistance = calculateDistance(planned, stops);
    const actualDistance = calculateDistance(actual, stops);

    const distanceDeviation =
        plannedDistance ? ((actualDistance - plannedDistance) / plannedDistance) * 100 : 0;


    let orderMatches = 0;
    planned.forEach((stopId, index) => {
        if (actual[index] === stopId) {
            orderMatches++;
        }
    });

    let prefixMatchCount = 0;
    for (let i = 0; i < Math.min(10, planned.length); i++) {
        if (planned[i] === actual[i]) {
            prefixMatchCount++;
        } else {
            break;
        }
    }

    return {
        plannedRouteDistanceKm: plannedDistance.toFixed(2),
        actualRouteDistanceKm: actualDistance.toFixed(2),
        distanceDeviationPercent: distanceDeviation.toFixed(2),
        orderMatchPercentage: (
            (orderMatches / planned.length) * 100
        ).toFixed(2),
        prefixMatchCount
    };
}
