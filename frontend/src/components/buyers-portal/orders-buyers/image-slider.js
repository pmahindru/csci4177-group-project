import React, { useState } from 'react';
import { Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deleteFavourite, deleteCartItem } from '../../../api';
import ResponsiveStarRatingDisplay from './review/star_rating';


//TrackOrders card returns a image of the product, the price, where it was shipped and a button to write a reivew. This is done for each order in transit the user has
// function imageSlider({ item, handleCreateReviewOpen }){
const ImageSlider = ({ item, handleCreateReviewOpen, pageName }) => {
    const [imageSliderObject, setImageSliderObject] = useState([]);
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

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //handleRemoveFavourites removes the favourited ad from the users favourite list in the database
    const handleRemoveFavourite = async (itemId) => {
        const shouldRemove = window.confirm('Are you sure you want to unfavourite this ad?');
        if (shouldRemove) {
        try {
            await deleteFavourite(itemId);
            alert("Ad removed from favourites list");
            setAnchorEl(null);
            window.location.reload();
        } catch (error) {
            alert('Failed to remove favourite ad');
            console.error('Error removing ad from favourites:', error);
        }
        }
        setAnchorEl(null);
    }

    const handleRemoveCartItem = async (itemId) => {
        const shouldRemove = window.confirm('Are you sure you want to remove this item from the cart?');
        if (shouldRemove) {
        try {
            await deleteCartItem(itemId);
            setAnchorEl(null);
            alert("Item Removed from Cart!");
            window.location.reload();
        } catch (error) {
            alert('Failed to remove favourite ad');
            return error;
        }
        }
        setAnchorEl(null);
    };

    return (
        <>
        {item.ad_details !== null && (
            <div className='order-page-section4' key={item._id}>
                {/* image slider */}
                <div className="seller-image-slider">
                    {item.ad_details.image.map((getImage, index) => (
                        <div className="slides" key={index}>
                            {imageSliderObject.some(objectItem => objectItem.prodID === item._id) ? (
                                imageSliderObject.map(objectItem => {
                                    if (objectItem.prodID === item._id) {
                                        return (
                                            <img src={item.ad_details.image[objectItem.pos]} alt={`images${index+1}`} key={index+1}/>
                                        );
                                    }
                                    return null;
                                })
                            ) : (
                                <img src={item.ad_details.image[0]} alt={`images${index+1}`} key={index}/>
                            )}
                            <div className="seller-image-button">
                                <button onClick={() => handlePreviousImage(item.ad_details.image.length, item._id)}>{"<"}</button>
                                <button onClick={() => handleNextImage(item.ad_details.image.length, item._id)}>{">"}</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* condition */}
                {pageName === "order-history" && (
                    <>
                        <div className='order-seller-page-section5'>
                            <b>Name: {item.ad_details.title}</b>
                        </div>
                        <div className='order-seller-page-section5'>
                            <b>Price: {item.ad_details.price}</b>
                        </div>
                        <div className='order-seller-page-section5'>
                            <button className="responsive-button" type="button" onClick={() => handleCreateReviewOpen(item.ad_details._id)}> Review</button>
                        </div>
                    </>
                )}

                {pageName === "track-orders" && (
                    <>
                        <div className='order-seller-page-section5'>
                            <b>Status: {item.status}</b>
                        </div>
                        <div className='order-seller-page-section5'>
                            <b>Shipping: {item.address}</b>
                        </div>
                    </>
                )}

                {pageName === "favourites" && (
                    <>
                        <div className='order-seller-page-section5'>
                            <b>Title: {item.ad_details.title}</b>
                        </div>
                        <div className='order-seller-page-section5'>
                            <b>Price: {item.ad_details.price}</b>
                        </div>
                        <Grid item xs={1} md={1} sx={{ marginRight: '1px' }}>
                            <MoreVertIcon onClick={handleClick} />
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                <MenuItem onClick={() => handleRemoveFavourite(item._id)}>Remove from Favorites</MenuItem>
                            </Menu>
                        </Grid>
                    </>
                )}

                {pageName === "cart" && (
                    <>
                        <div className='order-seller-page-section5'>
                            <b>Title: {item.ad_details.title}</b>
                        </div>
                        <div className='order-seller-page-section5'>
                            <b>Price: {item.ad_details.price}</b>
                        </div>
                        <Grid item xs={1} md={1} sx={{ marginRight: '1px' }}>
                            <MoreVertIcon onClick={handleClick} />
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                <MenuItem onClick={() => handleRemoveCartItem(item._id)}>Remove from cart</MenuItem>
                            </Menu>
                        </Grid>
                    </>
                )}

                {pageName === "reviews" && (
                    <>
                        <div className='order-seller-page-section5'>
                            <b>Title: {item.ad_details.title}</b>
                        </div>
                        <div className='order-seller-page-section5'>
                            <ResponsiveStarRatingDisplay value={item.star_rating}  /> 
                        </div>
                        <div className='order-seller-page-section5'>
                            <button className="responsive-button" type="button" onClick={() => handleCreateReviewOpen(item.ad_details._id)}> Edit</button>
                        </div>
                    </>
                )}
            </div>
        )}
        </>
    );
};

export default ImageSlider;