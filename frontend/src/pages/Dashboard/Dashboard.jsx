import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import API from "../../api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    API.get("/routes").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <div className="dashboard-loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(data.routes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRoutes = data.routes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Overview of your routes and stops</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-label">Total Routes</p>
                <p className="stat-value">{data.totalRoutes}</p>
              </div>
              <div className="stat-icon stat-icon-blue">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div>
                <p className="stat-label">Total Stops</p>
                <p className="stat-value">{data.totalStops}</p>
              </div>
              <div className="stat-icon stat-icon-green">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="routes-container">
          <div className="routes-header">
            <h2>Routes</h2>
            <div className="items-per-page">
              <label htmlFor="itemsPerPage">Show:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
          <div className="routes-list">
            {currentRoutes.map((route) => (
              <Link
                key={route.routeId}
                to={`/routes/${route.routeId}`}
                className="route-item"
              >
                <div className="route-content">
                  <div className="route-info">
                    <div className="route-title-row">
                      <span className="station-badge">{route.stationCode}</span>
                      <h3 className="route-id">{route.routeId}</h3>
                    </div>
                    <p className="route-stops">
                      {route.stopCount}{" "}
                      {route.stopCount === 1 ? "stop" : "stops"}
                    </p>
                  </div>
                  <svg
                    className="route-arrow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {startIndex + 1}-
                {Math.min(endIndex, data.routes.length)} of {data.routes.length}{" "}
                routes
              </div>
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </button>

                <div className="pagination-numbers">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="pagination-ellipsis"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        className={`pagination-number ${
                          currentPage === page ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
