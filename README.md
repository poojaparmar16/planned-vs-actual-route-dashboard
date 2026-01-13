# Planned vs Actual Route Dashboard

A **full-stack web application** for comparing planned delivery routes with the routes actually executed in last-mile operations.

Built with **React** and **Node.js**, the application visualizes routes on a map, computes comparison metrics, and presents insights through a clean, interactive dashboard.

---

## Overview

In real-world last-mile logistics, planned routes often change during execution.  
This application helps analyze those differences by:

- Generating a **planned route** when none is provided
- Comparing it with the **actual driver route**
- Visualizing both routes and stops on an **interactive map**
- Summarizing route-level insights through a **dashboard**

---

## Assumptions

- No planned sequence is provided, so a **planned route is generated**
- Distances are calculated using the **Haversine formula** from latitude/longitude
- Only stops common to both routes are considered for comparison
- Authentication is intentionally simple (JWT, no database)

---

## Key Features

### Authentication
- Lightweight JWT-based login (`admin / admin123`)

### Dashboard
- Displays total routes and stops
- Lists routes with:
  - Route ID
  - Station code
  - Stop count

### Route Visualization
- Map view with planned and actual routes shown in different colors
- Stop markers with type and zone metadata
- Toggle visibility of planned vs actual routes
- Route-level metrics shown alongside the map

---

## Why This Approach Works Well

The solution is designed to be **simple, explainable, and aligned with the provided data**.

- A **nearest-neighbor heuristic** is used to generate the planned route. It is deterministic, easy to understand, and provides a consistent baseline for comparison.
- The **Haversine formula** is used because:
  - Stop locations are given as latitude and longitude
  - Routes operate at city scale, where straight-line distance is sufficient for analysis
  - It avoids external dependencies on road or traffic data
  - It is fast and reliable for analytical comparisons

This approach clearly highlights deviations between planned and actual routes while keeping the system easy to reason about and extend.

---

## Production-Grade Improvements

For a real-world deployment, the system could be extended by:

- Adding a **database** (e.g., PostgreSQL) for persistent storage
- Using **road-network–based routing** for more accurate distance and ETA calculations
- Applying more advanced **route optimization algorithms**
- Supporting configurable depots and route boundaries
- Adding logging, monitoring, and **automated tests**

---

## Possible Enhancements

- Charts and visual summaries
- Role-based access control
- Multi-route and multi-day comparisons
