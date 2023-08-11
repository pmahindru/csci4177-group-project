/* Created By: Pranav Mahindru*/
import React, { useState, useEffect } from "react";
import './dashboard-buyer.css'
import { getPostAdWithId, createCartItem, addToUserInteraction, addFavourites } from "../../../api";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { 
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    LinkedinShareButton, LinkedinIcon,
} from "react-share";

function DashBoardBuyerItemView() {
    const getLocalStorage = localStorage.getItem("user_info");
    const user_data = JSON.parse(getLocalStorage);
    const [loading, setLoading] = useState(true);
    const [getSpecificItem, setSpecificItem] = useState([]);
    const [imageSliderObject, setImageSliderObject] = useState([]);
    // save the share info
    const [shareAdIcons, setShareAdIcons] = useState(false);
    const [saveTheUrlForShare, setSaveTheUrlForShare] = useState("");
    const [saveShareItemId, setsaveShareItemId] = useState("");
    const navigate = useNavigate();
    
    const handlePreviousImage = (len, itemId) => {
        if (len === 1) {
            alert("No more Images");
            return;
        }
        if (imageSliderObject.length !== 0) {
            const findImageObject = imageSliderObject.find(item => item.prodID === itemId);
            if (findImageObject === null || findImageObject === undefined) {
                return;
            }
            else{
                if (findImageObject.pos > 0) {
                    const getIndex = imageSliderObject.findIndex(item => item.prodID === itemId);
                    if (getIndex !== -1) {
                        setImageSliderObject(prevState => {
                            const arr = [...prevState];
                            arr[getIndex] = {"len": len, "prodID": itemId, "pos": findImageObject.pos - 1};
                            return arr;
                        })
                    }
                }
            }
        }
    };

    const handleNextImage = (len, itemId) => {
        if (len === 1) {
            alert("No more Images");
            return;
        }
        if (imageSliderObject.length === 0) {
            setImageSliderObject(prevState => [
                ...prevState,
                {"len": len, "prodID": itemId, "pos": 1}
            ])
        }
        else{
            const findImageObject = imageSliderObject.find(item => item.prodID === itemId);
            if (findImageObject === null || findImageObject === undefined) {
                setImageSliderObject(prevState => [
                    ...prevState,
                    {"len": len, "prodID": itemId, "pos": 1}
                ])
            }
            else{
                if (findImageObject.pos < len-1) {
                    const getIndex = imageSliderObject.findIndex(item => item.prodID === itemId);
                    if (getIndex !== -1) {
                        setImageSliderObject(prevState => {
                            const arr = [...prevState];
                            arr[getIndex] = {"len": len, "prodID": itemId, "pos": findImageObject.pos+1};
                            return arr;
                        })
                    }
                }
            }
        }
    };

    const handleShareButton = async (e, itemId, itemTitle) => {
        await addToUserInteraction({"user_id": user_data["_id"], "ad_id": itemId, "share": 1})
        setSaveTheUrlForShare(window.location.origin+"/"+itemId);
        setsaveShareItemId(itemId);
        setShareAdIcons(true);
    }

    const handleAddToCart = async (e, itemId, itemTitle) => {
        const postId = window.location.pathname.split("/")
        await createCartItem({"user_id": user_data["_id"],"ad_id": postId[postId.length-1]});
        navigate("/orders#cart");
    }

    const handleAddToFavorite = async () => {
        const postId = window.location.pathname.split("/")
        await addFavourites({"user_id": user_data["_id"],"ad_id": postId[postId.length-1]});
        navigate("/orders#favourites");
    }

    useEffect(() => {
        const getData = async () => {
            const postId = window.location.pathname.split("/")
            const res = await getPostAdWithId({"_id": postId[postId.length-1]});
            if (!res.address) {
                setSpecificItem(res)
                setLoading(false);
            }
        }
        getData();
    }, [])

    return (
        <div className='dashboardBuyer-main-container'>
            {loading ? (
                <div className='preview-loading'>
                    <ReactLoading type="bars" color="#3f1a6b" height={100} width={50}/>
                </div>
            ) : (
                getSpecificItem.length > 0 && (
                    <>
                        <div className='dashboardBuyer-section1'>
                            <h2>{getSpecificItem[0].title}</h2>
                        </div>

                        {getSpecificItem.map((item, index) => {
                            return(
                                <div className='order-page-section4' key={item._id}>
                                    {/* image slider */}
                                    <div className="seller-image-slider-dashboard-buyer">
                                        {item.image.map((getImage, index) => (
                                            <div className="slides-dashboard-buyer" key={index}>
                                                {imageSliderObject.some(objectItem => objectItem.prodID === item._id) ? (
                                                    imageSliderObject.map(objectItem => {
                                                        if (objectItem.prodID === item._id) {
                                                            return (
                                                                <img src={item.image[objectItem.pos]} alt={`images${index+1}`} key={index+1} width="600" className="item-show-in-dashboard-buyer"/>
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                ) : (
                                                    <img src={item.image[0]} alt={`images${index+1}`} key={index}/>
                                                )}
                                                <div className="seller-image-button">
                                                    <button onClick={() => handlePreviousImage(item.image.length, item._id)}>{"<"}</button>
                                                    <button onClick={() => handleNextImage(item.image.length, item._id)}>{">"}</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className='order-seller-page-section5'>
                                            <b>Description: {item.description}</b>
                                        </div>
                                        <div className='order-seller-page-section5'>
                                            <b>Price: {item.price}</b>
                                        </div>
                                        <div className='order-seller-page-section5'>
                                            <b>Condition: {item.condition}</b>
                                        </div>
                                        <div className='order-seller-page-section5'>
                                            <b>Location: {item.location || ""}</b>
                                        </div>
                                        <div className='order-seller-page-section5'>
                                            <b>Payments: {item.payments_type || ""}</b>
                                        </div>
                                        <div className='order-seller-page-section5'>
                                            <b>Tags: {item.prod_tags || ""}</b>
                                        </div>
                                        <div className='postAd-button-dashboard-buyer'>
                                            <button onClick={(e) => handleAddToCart(e, item._id, item.title)}>Add to Cart</button>
                                            <button onClick={(e) => handleAddToFavorite()}>favorite</button>
                                            <button onClick={(e) => handleShareButton(e, item._id, item.title)}>Share</button>
                                        </div>
                                        <div className='order-seller-page-section5'>
                                            {/* [1] “React-share,” npm, https://www.npmjs.com/package/react-share (accessed Aug. 5, 2023).  */}
                                            {/* [2] I. Alam, “How to add social share buttons to your react app,” MUO, https://www.makeuseof.com/add-social-share-buttons-in-react/#:~:text=For%20example%2C%20to%20add%20a,Facebook%20button%20to%20your%20app. (accessed Aug. 5, 2023).  */}
                                            {shareAdIcons && saveShareItemId === item._id && (
                                                <div>
                                                    <FacebookShareButton url={saveTheUrlForShare} quote="Share this Ad">
                                                        <FacebookIcon size={24} round/>
                                                    </FacebookShareButton>
                                                    <br/>
                                                    <br/>
                                                    <TwitterShareButton url={saveTheUrlForShare} quote="Share this Ad">
                                                        <TwitterIcon size={24} round/>
                                                    </TwitterShareButton>
                                                    <br/>
                                                    <br/>
                                                    <WhatsappShareButton url={saveTheUrlForShare} quote="Share this Ad">
                                                        <WhatsappIcon size={24} round/>
                                                    </WhatsappShareButton>
                                                    <br/>
                                                    <br/>
                                                    <LinkedinShareButton url={saveTheUrlForShare} quote="Share this Ad">
                                                        <LinkedinIcon size={24} round/>
                                                    </LinkedinShareButton>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )
            )}
        </div>
    );
};

export default DashBoardBuyerItemView;