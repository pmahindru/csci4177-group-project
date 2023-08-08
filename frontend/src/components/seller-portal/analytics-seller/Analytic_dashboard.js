/* Created By: Parth Patel*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getAllPostedAd } from "../../../api";

Chart.register(...registerables);

const AnalyticalDashboard = () => {
  const getLocalStorage = localStorage.getItem("user_info");
  const user_data = JSON.parse(getLocalStorage);
  const [getArrayObjects, setArrayObjects] = useState(0);

  useEffect(() => {
      const getData = async () => {
          const res = await getAllPostedAd({"user_id": user_data["_id"], "isActive": true});
          if (!res.address) {
              setArrayObjects(Object.keys(res).length);
          }
      }
      getData();
  }, [user_data])

  // Dummy data for sold items with reviews
  const soldItems = [
    {
      id: 1,
      name: "Product 1",
      rating: 4.5,
      review: "Great product! Highly recommended.",
    },
    {
      id: 2,
      name: "Product 2",
      rating: 3.8,
      review: "Decent product. Could be better.",
    },
  ];

  const averageRating =
    soldItems.reduce((sum, item) => sum + item.rating, 0) / soldItems.length;
  const [selectedItem, setSelectedItem] = useState("Item 1");

  const [isGraphsPageVisible, setIsGraphsPageVisible] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 428);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 429);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsGraphsPageVisible(false);
    }
  }, [isMobile]);

  const itemData = {
    "Item 1": {
      clicksData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Clicks on Listings",
            data: [100, 200, 150, 300, 250, 400],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      savesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Saves",
            data: [50, 100, 80, 120, 90, 150],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      sharesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Shares",
            data: [20, 30, 40, 50, 60, 70],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    },
    "Item 2": {
      clicksData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Clicks on Listings",
            data: [200, 250, 300, 350, 400, 450],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      savesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Saves",
            data: [80, 120, 150, 100, 130, 160],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      sharesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Shares",
            data: [30, 40, 50, 60, 70, 80],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    },
    "Item 3": {
      clicksData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Clicks on Listings",
            data: [300, 350, 400, 450, 500, 550],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      savesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Saves",
            data: [120, 150, 180, 200, 220, 250],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      sharesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Shares",
            data: [40, 50, 60, 70, 80, 90],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    },
  };

  const handleChangeItem = (item) => {
    setSelectedItem(item);
  };

  const toggleGraphsPage = () => {
    setIsGraphsPageVisible(!isGraphsPageVisible);
  };

  const renderGraphs = () => {
    if (!itemData[selectedItem]) {
      return null;
    }

    const { clicksData, savesData, sharesData } = itemData[selectedItem];

    return (
      <>
        <div className="graph-container">
          <h3 className="graph-subtitle">Clicks on Listings</h3>
          <Line data={clicksData} />
        </div>
        <div className="graph-container">
          <h3 className="graph-subtitle">Listing Saves</h3>
          <Bar data={savesData} />
        </div>
        <div className="graph-container">
          <h3 className="graph-subtitle">Listing Shares</h3>
          <Pie data={sharesData} />
        </div>
      </>
    );
  };

  return (
    <div className="analytic-app">
      <h2 style={{ marginBottom: "30px" }}>Analytical</h2>
      <div className="section-overview">
        <div className="section-overview-header">
          <h2>Overview</h2>
        </div>
        <Link
          to="/analytics/chat"
          className="sub-section-overview-chats link-unstyled"
        >
          <h2>2 </h2>
          <p>Chats to answer</p>
        </Link>
        <Link
          to="/analytics/seller-rating"
          className="sub-section-overview link-unstyled"
        >
          <div>
            <h2>
              2{" "}
              <span className="stars">
                {Array.from(Array(Math.floor(averageRating)), (_, index) => (
                  <i key={index} className="fas fa-star"></i>
                ))}
                {averageRating % 1 !== 0 && (
                  <i className="fas fa-star-half-alt"></i>
                )}
              </span>
            </h2>
          </div>

          <p>Seller Rating</p>
          <p>2 Reviews</p>
        </Link>
      </div>
      <div className="section-listings">
        <div className="section-listings-header">
          <h2>Your Ads</h2>
        </div>

        <Link
          to="/analytics/active-ads"
          className="sub-section-overview link-unstyled"
        >
          <h2>{getArrayObjects}</h2>
          <p>Active Ads</p>
        </Link>
        <Link
          to="/analytics/sold"
          className="sub-section-listings link-unstyled"
        >
          <h2>0</h2>
          <p>Sold & out of stock</p>
        </Link>
        <Link
          to="/analytics/draft-ads"
          className="sub-section-listings link-unstyled"
        >
          <h2>0</h2>
          <p>Drafts</p>
        </Link>
        <Link
          to="/analytics/renew"
          className="sub-section-listings link-unstyled"
        >
          <h2>0</h2>
          <p>To renew</p>
        </Link>
        <Link
          to="/analytics/delete-ads"
          className="sub-section-listings link-unstyled"
        >
          <h2>0</h2>
          <p>To delete & relist</p>
        </Link>
        <div className="sub-section-listings">
          <h2>0</h2>
          <p>Need attention</p>
        </div>
      </div>
      <div className="section-insights">
        {isGraphsPageVisible ? (
          <div className="graphs-page">
            <div className="section-insights-header">
              <h2>Insights</h2>
            </div>
            <div className="item-selector">
              <label htmlFor="item-select">Select Item:</label>
              <select
                id="item-select"
                value={selectedItem}
                onChange={(e) => handleChangeItem(e.target.value)}
              >
                <option value="Item 1">Item 1</option>
                <option value="Item 2">Item 2</option>
                <option value="Item 3">Item 3</option>
              </select>
            </div>
            <div className="graphs-container">{renderGraphs()}</div>
          </div>
        ) : (
          <div className="insights-page">
            <div className="section-insights-header">
              <h2>Insights</h2>
            </div>

            <Link
              to="/analytics/"
              className="sub-section-overview link-unstyled"
            >
              <h2>25</h2>
              <p>Click on Ads</p>
            </Link>
            <Link
              to="/analytics/"
              className="sub-section-overview link-unstyled"
            >
              <h2>2</h2>
              <p>Ad Saves</p>
            </Link>
            <Link
              to="/analytics/"
              className="sub-section-overview link-unstyled"
            >
              <h2>2</h2>
              <p>Ad shares</p>
            </Link>
          </div>
        )}
        {!isMobile && (
          <div className="toggle-button" onClick={toggleGraphsPage}>
            {isGraphsPageVisible ? "Show Insights" : "Show Graph"}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticalDashboard;
