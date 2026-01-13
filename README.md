# Planned vs Actual Route Dashboard

A **full-stack web application** for analyzing how planned delivery routes compare with what actually happens on the ground in last-mile logistics.

Built using **React** and **Node.js**, the app visualizes routes on a map, calculates key performance metrics, and presents insights through a simple, intuitive dashboard.

---

## Overview

In last-mile delivery operations, routes are usually planned in advance but often change during execution due to real-world constraints.  
This application helps **RYTLE India** analyze those differences by:

- Generating a **planned delivery route** using a nearest-neighbor heuristic
- Comparing it with the **actual route followed by the driver**
- Calculating meaningful **distance and sequence-based metrics**
- Visualizing both routes and all stops on an **interactive map**
- Summarizing key information in a **dashboard view** for quick analysis

---

## Assumptions

To keep the solution clear and focused, the following assumptions were made:

- A **planned route** is generated because no planned sequence is provided in the dataset
- Distances between stops are calculated using the **Haversine formula**, based on latitude and longitude
- Metrics are computed only for stops that appear in both the planned and actual sequences
- **Authentication** is intentionally kept simple using local credentials and JWT, without a database
- The map allows users to **toggle planned and actual routes** to make comparisons easier

---

## Key Features

### Authentication
- Simple JWT-based login using local credentials (`admin / admin123`)

### Dashboard
- Overview of:
  - Total number of routes
  - Total number of stops
- List of routes showing:
  - Route ID
  - Station code
  - Number of stops

### Route Comparison
- Interactive map showing:
  - Planned route and actual route in different colors
  - Individual stop markers with metadata (stop type and zone)
- Ability to toggle planned and actual routes on the map
- Display of calculated metrics for each selected route

---

## Metrics Explained

The following metrics are calculated for every route:

- **Planned Route Distance (km)**  
  Total distance of the generated planned route

- **Actual Route Distance (km)**  
  Total distance traveled by the driver based on execution order

- **Distance Deviation (%)**  
  Percentage difference between actual and planned route distances

- **Order Match Percentage (%)**  
  Percentage of stops that appear in the exact same position in both sequences

- **Prefix Match Count (Top-10 Stops)**  
  Number of consecutive stops from the start of the route that match exactly, capped at 10

### Why these metrics matter
- Distance-based metrics help evaluate **route efficiency**
- Sequence-based metrics highlight **how closely execution followed the plan**
- Prefix matching focuses on **early-route adherence**, which is often operationally critical

---

## Why This Approach Works Well

- Clear separation between **frontend and backend responsibilities**
- Deterministic and easy-to-explain **planned route generation**
- Metrics that are **simple, transparent, and aligned with real logistics scenarios**
- Real map-based visualization that makes differences immediately visible
- Clean and intuitive **RESTful API design**
- Authentication kept minimal to avoid unnecessary complexity

---

## Possible Future Enhancements

- Dockerize the application for easier setup and deployment
- Add **PostgreSQL** for persistent storage of routes and users
- Improve route planning using more advanced **TSP or optimization algorithms**
- Add charts and visual summaries using **Recharts**
- Introduce **unit and integration tests** for better coverage
