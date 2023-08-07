/* Created By: Pranav Mahindru*/
import React, { useState } from 'react';
import './createnewads.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { savePostAd } from '../../../api';

function CreateNewAd() {
    const [selectImageFiles, setSelectImageFiles] = useState([]);
    const [saveFileLength, setSaveFileLength] = useState(0);
    const [dropdowntype, setdropdowntype] = useState('');
    const [title, settitle] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [product_tag, setproduct_tag] = useState('');
    const [location, setlocation] = useState('');
    const [selectCategory, setCategory] = useState('');
    const [selectCondition, setCondition] = useState('');
    const [selectPayments, setPayments] = useState('');

    /**
     * onChange functions
    */
    const handleDropdownType = (e) =>{
        setdropdowntype(e.target.value);
    };

    const handleImage = (e) => {
        const length = e.target.files.length;
        setSaveFileLength(length);
        if (length > 5){
            alert("Max 5 Images upload");
            return;
        }

        const saveInFiles = [];
        const fileReader = new FileReader();
        fileReader.onload = () => {
            saveInFiles.push(fileReader.result);
            if (saveInFiles.length === length) {
                setSelectImageFiles(saveInFiles);
            }
            else{
                fileReader.readAsDataURL(e.target.files[saveInFiles.length])
            }
        }
        fileReader.readAsDataURL(e.target.files[0]);
    };

    const handleChangeTitle = (e) =>{
        settitle(e.target.value);
    };

    const handleChangePrice = (e) =>{
        setprice(e.target.value);
    };

    const handleChangeDescription = (e) =>{
        setdescription(e.target.value);
    };

    const handleChangeProductTag = (e) =>{
        setproduct_tag(e.target.value);
    };

    const handleChangeLocation = (e) =>{
        setlocation(e.target.value);
    };

    const handleDropdownCategory = (e) =>{
        setCategory(e.target.value);
    };

    const handleDropdownCondition = (e) =>{
        setCondition(e.target.value);
    };

    const handleDropdownPayments = (e) =>{
        setPayments(e.target.value);
    };

    /*
     *when user save show alert and redirect to dashboard page
    */
    const navigate = useNavigate();
    const getLocalStorage = localStorage.getItem("user_info");
    const userInfo = JSON.parse(getLocalStorage);
    const handleSaveAd = async (e) =>{
        e.preventDefault();
        const data = {
            "user_id": userInfo["_id"],
            "image" : selectImageFiles,
            "title" : title,
            "price" : price,
            "description" : description,
            "prod_tags" : product_tag,
            "location" : location,
            "condition" : selectCondition,
            "payments_type" : selectPayments,
            "type" : dropdowntype,
            "category" : selectCategory,
            "status" :  "draft",
            "isActive" : false,
            "product_status" : null
        };

        var res = await savePostAd(data) ;

        if (res.response === undefined) {
            alert(res.message);
            navigate('/dashboard');
        } 
        else {
            alert(res.message);
            navigate('/dashboard');
        }
    };

    const handlePreview = (e) =>{
        e.preventDefault();
        if (selectImageFiles.length === 0 || dropdowntype === '' || title === '' || price === '' || description === '' || location === '' || selectCategory === '' || selectCondition === '' || selectPayments === '') {
            alert("Missing required option");
            return;
        }

        navigate('/preview', {state: {
            data: [{sendImageFiles: selectImageFiles},
            {sendTitle: title},{sendPrice: price},{sendDescription: description},{sendProduct_tag: product_tag},
            {sendLocation: location},{sendCondition: selectCondition},{sendPayments: selectPayments},
            {category: selectCategory},{type: dropdowntype}]
        }});
    };

    return (
        <div className='postAd-main-container'>
            <div className='postAd-section1'>
                <h2>Creating New Listing</h2>
            </div>
            <div className='postAd-section-form'>
                {/* first half form */}
                <div className='postAd-section2'>
                    <div>
                        <h3>
                            Type:
                            <span className='required-star-in-form'>*</span>
                        </h3>
                        <select onChange={handleDropdownType} className='postAd-dropdown' required>
                            <option value=''>Select Your Type</option>
                            <option value='accommodation'>Accommodation</option>
                            <option value='vehicle'>vehicle</option>
                            <option value='items'>items</option>
                        </select>
                    </div>
                    <div>
                        <h3>
                            Title:
                            <span className='required-star-in-form'>*</span>
                        </h3>
                        <input type='text' name='title' value={title} onChange={handleChangeTitle} placeholder='Title'/>
                    </div>
                    <div>
                       <h3>
                        Price:
                        <span className='required-star-in-form'>*</span>
                    </h3>
                        <input type='number' name='price' value={price} onChange={handleChangePrice} placeholder='Price'/>
                    </div>
                    <div>
                        <h3>
                            Description:
                            <span className='required-star-in-form'>*</span>    
                        </h3>
                        <input type='text' name='description' value={description} onChange={handleChangeDescription} placeholder='Description'/>
                    </div>
                    <div>
                        <h3>
                            Product Tag:
                        </h3>
                        <input type='text' name='product_tag' value={product_tag} onChange={handleChangeProductTag} placeholder='Product Tag'/>
                    </div>
                    <div>
                        <h3>
                            Location:
                            <span className='required-star-in-form'>*</span>
                        </h3>
                        <input type='text' name='location' value={location} onChange={handleChangeLocation} placeholder='Location'/>
                    </div>
                </div>

                <hr className='hr-postAd'/>

                {/* second half form */}
                <div className='postAd-section3'>
                    <div>
                        <h3>
                            Upload Image:
                            <span className='required-star-in-form'>*</span>
                        </h3>
                        <input type='file' multiple onChange={handleImage} accept='image/png,image/jpg,image/jpeg' />
                        <div className={saveFileLength > 5 ? '' : 'hide-div'}>{saveFileLength > 5 && <p> max 5 images can be upload</p>}</div>
                    </div>
                    <div>
                        <h3>
                            Category:
                            <span className='required-star-in-form'>*</span>
                        </h3>
                        <select onChange={handleDropdownCategory} className='postAd-dropdown'>
                            <option value=''>Select Your Category</option>
                            <option value='carType'>Car Type</option>
                            <option value='rent_buy'>Rent/Buy house</option>
                            <option value='furniture'>house furniture</option>
                            <option value='games'>Video Games</option>
                        </select>
                    </div>
                    <div>
                        <h3>
                            Condition:
                            <span className='required-star-in-form'>*</span>
                        </h3>
                        <select onChange={handleDropdownCondition} className='postAd-dropdown'>
                            <option value=''>Select Your Condition</option>
                            <option value='new'>New</option>
                            <option value='usedLike'>Used like</option>
                            <option value='usedGood'>Used Good</option>
                            <option value='bad'>bad</option>
                        </select>
                    </div>
                    <div>
                        <h3>
                            Payments Types:
                            <span className='required-star-in-form'>*</span>
                        </h3>
                        <select onChange={handleDropdownPayments} className='postAd-dropdown'>
                            <option value=''>Select Your Payments Type</option>
                            <option value='card'>Credit/Debit</option>
                            <option value='cash'>Cash On Delivery</option>
                            <option value='Paytm'>Paytm</option>
                        </select>
                    </div>
                </div>

                {/* for preview or save button */}
                <div className='postAd-button'>
                    <button type='button' onClick={handleSaveAd}><NavLink> Save Ad </NavLink></button>
                    <button type='button' onClick={handlePreview}><NavLink> Preview Ad </NavLink></button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewAd;
