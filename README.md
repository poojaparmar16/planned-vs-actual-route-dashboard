# planned-vs-actual-route-dashboard

**Full-stack web application for analyzing planned vs actual last-mile delivery routes.**  
Built with **React** and **Node.js**, featuring route visualization, distance metrics, order deviation analysis, and an interactive logistics dashboard.

---

## Overview

This application helps **RYTLE India** analyze and compare delivery routes:  

- Generates a **planned delivery route** using a nearest neighbor heuristic.  
- Compares it with the **actual route executed by drivers**.  
- Computes key **metrics** to evaluate efficiency and adherence.  
- Provides an **interactive map visualization** of routes and stops.  
- Presents insights through a **dashboard** with route and stop summaries.  

---

## Assumptions

- The **planned route** is generated because it is not provided in the data.  
- **Distances** are calculated using the **Haversine formula** based on stop latitude and longitude.  
- Metrics are computed only for stops that exist in both planned and actual sequences.  
- **Authentication** is local (username/password) and does not require a database.  
- Map visualization allows **toggling planned vs actual routes** for clarity.  

---

## Features

- **Authentication:** JWT-based login (`admin/admin123`)  
- **Dashboard:**  
  - Total number of routes  
  - Total number of stops  
  - Route metadata (ID, station code, stop count)  
- **Route Comparison:**  
  - Interactive map of planned vs actual routes  
  - Stop markers with metadata (type, zone)  
  - Toggle visibility of planned and actual routes  
  - Display computed metrics for analysis  

---

## Metrics Computed

- **Planned Route Distance (km):** Total distance of the planned route.  
- **Actual Route Distance (km):** Total distance based on the driver’s execution.  
- **Distance Deviation (%):** Percentage difference between actual and planned distances.  
- **Order Match Percentage (%):** Percentage of stops in exact sequence match.  
- **Prefix Match Count (Top-10 Stops):** Consecutive stops matching from the start, capped at 10.  

**Why these metrics:**  
- Distance metrics measure **efficiency**.  
- Sequence metrics measure **adherence to plan**.  
- Prefix match highlights **early-route accuracy**, critical for timely deliveries.  

---

## Why This Scores Well

- ✅ **Clear separation** between backend and frontend  
- ✅ Deterministic **planned route generation**  
- ✅ Accurate and **well-defined metrics**  
- ✅ **Real map visualization** for intuitive understanding  
- ✅ **Clean RESTful API design**  
- ✅ Simple and complete **authentication workflow**  

**Optional Improvements:**  
- Dockerize for easier deployment  
- Add **PostgreSQL** to store routes and users  
- Improve route planning using **TSP/optimization algorithms**  
- Add charts (**Recharts**) for metrics visualization  
- Implement **unit and integration tests**  
