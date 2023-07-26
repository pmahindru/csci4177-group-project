/* Created By: Pranav Mahindru*/
import "./orders_seller.css";
import React, { useState, useEffect } from "react";
import { deletePostAd, getAllPostedAd, pausePostAd } from "../../../api";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

function SellerStatusPage() {
    const [getArrayObjects, setArrayObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageSliderObject, setImageSliderObject] = useState([]);
    const [selectDropdownOption, setSelectDropdownOption] = useState('');
    const getLocalStorage = localStorage.getItem("user_info");
    const user_data = JSON.parse(getLocalStorage);

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

    const navigate = useNavigate();
    const handleSelected = async (e, itemId, itemTitle) => {
        alert(`${e.target.value} this ${itemTitle} Ad`);
        if (e.target.value === "edit") {
            navigate(`/edit/${itemId}`)
        }
        else if (e.target.value === "pause") {
            const res = await pausePostAd({"_id": itemId, "page": "seller_status"});
            if (res.messages !== null || res.messages !== undefined) {
                alert(res.messages);
            }
            else{
                alert("Update Successfully");
            }
            window.location.reload();
        }
        else if (e.target.value === "share") {
            alert("This is not working right now,\nNeed to integrate with Social Media!!!");
            window.location.reload();
        }
        else{
            const res = await deletePostAd(itemId);
            if (res.response === undefined) {
                alert(res.message);
                window.location.reload();
            } 
            else {
                alert(res.message);
                window.location.reload();
            }
        }
    };

    useEffect(() => {
        const getData = async () => {
            const res = await getAllPostedAd({"user_id": user_data["_id"], "isActive": {$in: [true, false]} });
            if (!res.address) {
                setArrayObjects(res);
                setLoading(false);
            }
        }
        getData();
    }, [])

    return (
        <div className='order-seller-page-main-container'>
            <div className='order-seller-page-section2'>
                <h2>Admin Status</h2>
            </div>
            {loading ? (
                <div className='preview-loading'>
                    <ReactLoading type="bars" color="#3f1a6b" height={100} width={50}/>
                </div>
            ) : (
                <div className='order-seller-page-section3'>
                    {getArrayObjects.length > 0 ? (
                        getArrayObjects.map((item, index) => {
                            return(
                                <div className='order-page-section4' key={item._id}>
                                    {/* image slider */}
                                    <div className="seller-image-slider">
                                        {item.image.map((getImage, index) => (
                                            <div className="slides" key={index}>
                                                {imageSliderObject.some(objectItem => objectItem.prodID === item._id) ? (
                                                    imageSliderObject.map(objectItem => {
                                                        if (objectItem.prodID === item._id) {
                                                            return (
                                                                <img src={item.image[objectItem.pos]} alt={`images${index+1}`} key={index+1}/>
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
                                    <div className='order-seller-page-section5'>
                                        <b>Name: {item.title}</b>
                                    </div>
                                    <div className='order-seller-page-section5'>
                                        <b>Description: {item.description}</b>
                                    </div>
                                    <div className='order-seller-page-section5'>
                                        <b>Active: {item.isActive ? ("Yes") : ("No")}</b>
                                    </div>
                                    <div className='order-seller-page-section5'>
                                        <b>Status: {item.status}</b>
                                    </div>
                                    <div className='order-seller-page-section5'>
                                        <div className="seller-order-dropdown">
                                            <select value={selectDropdownOption} onChange={(e) => handleSelected(e, item._id, item.title)}>
                                                <option value="" disabled> Please select the option </option>
                                                <option value="edit"> Edit </option>
                                                <option value="delete"> Delete </option>
                                                <option value="pause"> Pause </option>
                                                <option value="share"> Share </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className='order-page-section4'>
                            No Ads is Active
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SellerStatusPage;