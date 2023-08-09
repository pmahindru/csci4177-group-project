/* Created By: Parth Patel*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getAllPostedAd, getToUserInteraction } from "../../../api";

Chart.register(...registerables);

const AnalyticalDashboard = () => {
  const getLocalStorage = localStorage.getItem("user_info");
  const user_data = JSON.parse(getLocalStorage);
  const [getArrayObjects, setArrayObjects] = useState(0);
  const [getUserInteraction, setUserInteraction] = useState([]);
  const [getAllPost, setAllPost] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await getAllPostedAd({"user_id": user_data["_id"], "isActive": true});
      if (!res.address) {
        setAllPost(res);
        setArrayObjects(Object.keys(res).length);
        const getAllInteraction = await getToUserInteraction(user_data["_id"]);
        if (!getAllInteraction.address) {
            setUserInteraction(getAllInteraction);
            if (Object.keys(getAllInteraction).length > 0) {
              setSelectedItem(getAllInteraction[0]._id);
            }
        }
      }
    }
    getData();
  }, [])

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

  const handleChangeItem = (item) => {
    setSelectedItem(item);
  };

  const renderGraphs = () => {
    const getValue = getUserInteraction.find(item => item._id = selectedItem)

    if (getValue === undefined){
       return (
        <>
          <div className="graph-container">
              <h3 className="graph-subtitle">There are no User Interaction</h3>
            </div>
        </>
      );
    }

    const clicksData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Clicks on Listings",
          data: [0, 0, 0, 0, 0, 0, 0, getValue.clicks, 0, 0, 0, 0],
          backgroundColor: ["white",
                            "orange",
                            "grey",
                            "red",
                            "yellow",
                            "green",
                            "pink",
                            "lightgrey",
                            "purple",
                            "cyan",
                            "maroon",
                            "blue"],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ]
    }
    const savesData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Listing Saves",
          data: [0, 0, 0, 0, 0, 0, 0, getValue.save, 0, 0, 0, 0],
          backgroundColor: ["white",
                            "orange",
                            "grey",
                            "red",
                            "yellow",
                            "green",
                            "pink",
                            "lightgrey",
                            "purple",
                            "cyan",
                            "maroon",
                            "blue"],
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    }
    const sharesData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Listing Shares",
          data: [0, 0, 0, 0, 0, 0, 0, getValue.share, 0, 0, 0, 0],
          backgroundColor: ["white",
                            "orange",
                            "grey",
                            "red",
                            "yellow",
                            "green",
                            "pink",
                            "lightgrey",
                            "purple",
                            "cyan",
                            "maroon",
                            "blue"],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    }

    return (
      <>
         <div className="graph-container">
            <h3 className="graph-subtitle">Clicks on Listings</h3>
            <Line data={clicksData} />
          </div>
          <div className="graph-container">
            <h3 className="graph-subtitle">Listing Saves</h3>
            <Line data={savesData} />
          </div>
          <div className="graph-container">
            <h3 className="graph-subtitle">Listing Shares</h3>
            <Line data={sharesData} />
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
              {getAllPost.length > 0 ? (
                getAllPost.map((itemWithTitle => {
                    return(
                      <option value={itemWithTitle._id} key={itemWithTitle._id}> {itemWithTitle.title} </option>
                    )
                }))
              ) : (
                <option value=""> No Items to Selected</option>
              )}
            </select>
          </div>
          <div className="graphs-container">{renderGraphs()}</div>
        </div>

        <div className="hide-insights">
          <div className="section-insights-header">
            <h2>Insights</h2>
          </div>
          <div className="graphs-container">
            <Link
              to="/analytics/"
              className="sub-section-listings link-unstyled"
            >
              <h2>25</h2>
              <p>Click on Ads</p>
            </Link>
            <Link
              to="/analytics/"
              className="sub-section-listings link-unstyled"
            >
              <h2>2</h2>
              <p>Ad Saves</p>
            </Link>
            <Link
              to="/analytics/"
              className="sub-section-listings link-unstyled"
            >
              <h2>2</h2>
              <p>Ad shares</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticalDashboard;
