/* Created By: Parth Patel*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ReactLoading from "react-loading";
import { getAllPostedAd, getAllSavePostedAd, getReviewWithAdId, getToUserInteraction } from "../../../api";

Chart.register(...registerables);

const AnalyticalDashboard = () => {
  const getLocalStorage = localStorage.getItem("user_info");
  const user_data = JSON.parse(getLocalStorage);
  // for active ads
  const [getAllActivePost, setAllActivePost] = useState([]);
  const [getActiveObjects, setActiveObjects] = useState(0);
  // for inActive
  const [getInActiveObjects, setInActiveObjects] = useState(0);
  // for UserInteraction
  const [getUserInteraction, setUserInteraction] = useState([]);
  // selected Item
  const [selectedItem, setSelectedItem] = useState("");
  // for drafts Ads
  const [getDraftObjects, setDraftObjects] = useState(0);
  // save Review
  const [getReviewObjects, setReviewObjects] = useState(0);
  const [getStarRating, setStarRating] = useState(0);
  // loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const Active_inActive = await getAllPostedAd({"user_id": user_data["_id"], "isActive": {$in: [true, false]} });
      if (!Active_inActive.address) {
        const activeArr = []
        let countActive = 0;
        let countInActive = 0;
        for (let i = 0; i < Active_inActive.length; i++) {
          if (Active_inActive[i].isActive === true) {
            activeArr.push(Active_inActive[i])
            countActive++;
          }
          else{
            countInActive++;
          }
        }
        setAllActivePost(activeArr);
        setActiveObjects(countActive);
        setInActiveObjects(countInActive);

        if (activeArr.length > 0) {
          let saveReviewCount = 0
          let StarRatings = 0
          for (let i = 0; i < activeArr.length; i++) {
            const getAllReview = await getReviewWithAdId(activeArr[i]._id)
            if (!getAllReview.address) {
              if (getAllReview.length > 0) {
                for (let i = 0; i < getAllReview.length; i++) {
                  if (getAllReview[i] !== undefined) {
                    saveReviewCount++;
                    StarRatings = getAllReview[i].star_rating + StarRatings;
                  }                  
                }
              }
            }
          }
          setReviewObjects(saveReviewCount); 
          setStarRating(StarRatings);
        }
      }
      
      // [1] Robert TempletonRobert Templeton
      // 13911 gold badge22 silver badges99 bronze badges, Abu Dujana MahalailAbu Dujana Mahalail 1, Jan-Philipp MarksJan-Philipp Marks 1, and Arturo HernandezArturo Hernandez 2, “React hook delayed USEEFFECT firing?,” 
      // Stack Overflow, https://stackoverflow.com/questions/57788721/react-hook-delayed-useeffect-firing (accessed Aug. 10, 2023). 
      setTimeout(() => {
        getDraftAds();
      }, 1000);
      setTimeout(() => {
        getUserInteractionValue();
      }, 1000);
      setLoading(false);
    }
    getData();
  }, [])

  const getDraftAds = () => {
    const getData = async () => {
      const draftAds = await getAllSavePostedAd({"user_id": user_data["_id"]});
      if (!draftAds.address) {
        setDraftObjects(Object.keys(draftAds).length);
      }
    }
    getData();
  }

  const getUserInteractionValue = () => {
    const getData = async () => {
      const getAllInteraction = await getToUserInteraction(user_data["_id"]);
      console.log(getAllInteraction)
      if (!getAllInteraction.address) {
        setUserInteraction(getAllInteraction);
        if (Object.keys(getAllInteraction).length > 0) {
          setSelectedItem(getAllInteraction[0].ad_id);
        }
      }
    }
    getData();
  }

  const handleAlertForAdmin = () => {
    alert("No Admin portal, No attention need for the Ads :)");
  }

  const handleChangeItem = (item) => {
    setSelectedItem(item);

  };

  const getActive = () => {
    return (
      <>
        <h2>{getActiveObjects}</h2>
        <p>Active Ads</p>
      </>
    );
  };

  const getDraft = () => {
    return (
      <>
        <h2>{getDraftObjects}</h2>
        <p>Drafts</p>
      </>
    );
  };

  const getInActive = () => {
    return (
      <>
        <h2>{getInActiveObjects}</h2>
        <p>To renew</p>
      </>
    );
  };

  const getSellerRatings = () => {
    if (getReviewObjects === 0) {
      return;
    }
    
    const getAverage = (getStarRating/getReviewObjects).toFixed(2);
  
    return (
      <div>
        <h3>
          Avg Rating:{" "}{getAverage}{" "}
          <span className="stars">
                {Array.from(Array(Math.floor(getAverage)), (_, index) => (
                  <i key={index} className="fas fa-star"></i>
                ))}
                {getAverage % 1 !== 0 && (
                  <i className="fas fa-star-half-alt"></i>
                )}
              </span>
        </h3>
      </div>
    );
  };
  
  const renderGraphs = () => {
    if (Object.keys(getUserInteraction).length <= 0){
       return (
        <>
          <div className="graph-container">
              <h3 className="graph-subtitle">
                It will take couple of seconds or                
                <br/>
                There are no User Interaction
              </h3>
            </div>
        </>
      );
    }

    const getValue = getUserInteraction.find(item => item.ad_id === selectedItem)

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

  const renderText = () => {
    if (Object.keys(getUserInteraction).length <= 0){
       return (
        <>
          <div className="graph-container">
              <h3 className="graph-subtitle">
                It will take couple of seconds or                
                <br/>
                There are no User Interaction
              </h3>
            </div>
        </>
      );
    }

    const getValue = getUserInteraction.find(item => item.ad_id === selectedItem)

    return (
      <div className="section-insights">
        <div className="section-insights-header">
          <h2>Insights</h2>
        </div>
        <div className="graphs-container">
          <Link
            to="/analytics/"
            className="sub-section-listings link-unstyled"
          >
            <h2>{getValue.clicks}</h2>
            <p>Click on Ads</p>
          </Link>
          <Link
            to="/analytics/"
            className="sub-section-listings link-unstyled"
          >
            <h2>{getValue.save}</h2>
            <p>Ad Saves</p>
          </Link>
          <Link
            to="/analytics/"
            className="sub-section-listings link-unstyled"
          >
            <h2>{getValue.share}</h2>
            <p>Ad shares</p>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="analytic-app">
      <h2 style={{ marginBottom: "30px" }}>Analytical</h2>
      {loading ? (
        <>
          <div className='preview-loading'>
              <ReactLoading type="bars" color="#3f1a6b" height={100} width={50}/>
          </div>
        </>
      ) : (
        <>
        <div className="section-overview">
          <div className="section-overview-header">
            <h2>Overview</h2>
          </div>
          <Link
            to="/analytics/chat"
            className="sub-section-overview-chats link-unstyled"
          >
            <h2>2</h2>
            <p>Chats to answer</p>
          </Link>
          <Link
            to="/analytics/seller-rating"
            className="sub-section-overview link-unstyled"
          >
            <div>{getSellerRatings()}</div>
            <p>{getReviewObjects} Reviews</p>
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
            <div>{getActive()}</div>
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
            <div>{getDraft()}</div>
          </Link>
          <Link
            to="/analytics/renew"
            className="sub-section-listings link-unstyled"
          >
            <div>{getInActive()}</div>
          </Link>
          <div className="sub-section-listings" onClick={handleAlertForAdmin}>
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
                {getAllActivePost.length > 0 ? (
                  getAllActivePost.map((itemWithTitle => {
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
            <div className="graphs-container">{renderText()}</div>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default AnalyticalDashboard;
