import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api.js";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./RouteView.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitBounds({ bounds }) {
  const map = useMap();
  if (bounds.length > 0) map.fitBounds(bounds, { padding: [50, 50] });
  return null;
}

function RouteView() {
  const { routeId } = useParams();
  const [data, setData] = useState(null);
  const [showPlanned, setShowPlanned] = useState(true);
  const [showActual, setShowActual] = useState(true);

  useEffect(() => {
    API.get(`/routes/${routeId}`).then((res) => setData(res.data));
  }, [routeId]);

  if (!data) {
    return (
      <div className="route-loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading route details...</p>
        </div>
      </div>
    );
  }

  const plannedCoords = data.plannedSequence.map((id) => [
    data.stops[id].lat,
    data.stops[id].lng,
  ]);
  const actualCoords = data.actualSequence.map((id) => [
    data.stops[id].lat,
    data.stops[id].lng,
  ]);

  const allCoords = [...plannedCoords, ...actualCoords];

  return (
    <div className="route-view-container">
      <div className="route-view-wrapper">
        <header className="route-header">
          <div className="header-content">
            <Link to="/dashboard" className="back-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Dashboard
            </Link>
            <div className="route-title-section">
              <h1>Route Details</h1>
              <div className="route-meta">
                <span className="route-id">{data.routeId}</span>
                <span className="station-badge">{data.stationCode}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon metric-icon-blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <div className="metric-content">
              <p className="metric-label">Planned Distance</p>
              <p className="metric-value">
                {data.metrics.plannedRouteDistanceKm}{" "}
                <span className="metric-unit">km</span>
              </p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon metric-icon-red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="metric-content">
              <p className="metric-label">Actual Distance</p>
              <p className="metric-value">
                {data.metrics.actualRouteDistanceKm}{" "}
                <span className="metric-unit">km</span>
              </p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon metric-icon-orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="metric-content">
              <p className="metric-label">Distance Deviation</p>
              <p className="metric-value">
                {data.metrics.distanceDeviationPercent}{" "}
                <span className="metric-unit">%</span>
              </p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon metric-icon-green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <div className="metric-content">
              <p className="metric-label">Order Match</p>
              <p className="metric-value">
                {data.metrics.orderMatchPercentage}{" "}
                <span className="metric-unit">%</span>
              </p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon metric-icon-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
            </div>
            <div className="metric-content">
              <p className="metric-label">Prefix Match Count</p>
              <p className="metric-value">{data.metrics.prefixMatchCount}</p>
            </div>
          </div>
        </div>

        <div className="map-section">
          <div className="map-controls">
            <h3>Route Visualization</h3>
            <div className="toggle-buttons">
              <button
                className={`toggle-btn ${showPlanned ? "active planned" : ""}`}
                onClick={() => setShowPlanned(!showPlanned)}
              >
                <span className="toggle-indicator"></span>
                Planned Route
              </button>
              <button
                className={`toggle-btn ${showActual ? "active actual" : ""}`}
                onClick={() => setShowActual(!showActual)}
              >
                <span className="toggle-indicator"></span>
                Actual Route
              </button>
            </div>
          </div>

          <div className="map-container">
            <MapContainer
              center={plannedCoords[0]}
              zoom={13}
              style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {showPlanned && (
                <Polyline
                  positions={plannedCoords}
                  color="#1f78b4"
                  weight={4}
                  opacity={0.7}
                />
              )}
              {showActual && (
                <Polyline
                  positions={actualCoords}
                  color="#e31a1c"
                  weight={4}
                  opacity={0.7}
                />
              )}

              {data.plannedSequence.map((id) => (
                <Marker
                  key={id}
                  position={[data.stops[id].lat, data.stops[id].lng]}
                >
                  <Popup>
                    <div className="popup-content">
                      <strong>{id}</strong>
                      <div className="popup-details">
                        <span>Type: {data.stops[id].type}</span>
                        <span>Zone: {data.stops[id].zone_id || "-"}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              <FitBounds bounds={allCoords} />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteView;
