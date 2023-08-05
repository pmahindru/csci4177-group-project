<!-- 
    This is README file is given by the prof Gabriella Mosquera.
-->

# xProj-Group-24 (ShopAesthetics)

This project is the creation of ShopAesthetics proposed online marketplace where authenticity and security of a monitored marketplace meets the community of people who want to enhance their aesthetic lifestyle. Our online marketplce aims to provide users with aesthetically pleasing UI/UX while providing effecient marketplace features. Currently this project only has front end stlying and effects for the created web pages, the back end functionality will be added at a later point.
Before running or working with this codebase please ensure you install node modules in the root project directory, the frontend directory and finally the backend directory!

* *Date Created*: 20 06 2023
* *Last Modification Date*: 20 06 2023
* *Project URL*: https://csci-4177-grp-project-xproj-group-24.netlify.app/
* *Git URL*: https://git.cs.dal.ca/mahindru/csci-4177-5709-xproj-group-24

## Authors

* [Pranav Mahindru](pranav.mahindru@dal.ca) - *Full Stack Developer*
* [Patrick Wooden](pt308649@dal.ca) -  *Full Stack Developer*
* [Joel Kuruvilla](jl567056@dal.ca) -  *Full Stack Developer*
* [Saiz Charolia](sz500426@dal.ca) -  *Full Stack Developer*
* [Parth Patel](pr715312@dal.ca) -  *Full Stack Developer*

## Testing

Test if the website is responsive by changing the size of the browser. 

Tested form validation is working properly by inputting wrong values or leaving them blank (Login and Register)

Tested navigation links

Tested button navigation if it redirecting to the expected page

## Deployment

Deployed using netify which was taught in lab 

[1] Login - Dalhousie University, https://dal.brightspace.com/d2l/le/content/274269/viewContent/3608571/View (accessed June 20, 2023). 

[1] “Cloud application hosting for developers,” Render, https://dashboard.render.com/ (accessed Jul. 26, 2023). 

## Built With

React - [1] Login - Dalhousie University, https://dal.brightspace.com/d2l/le/content/274269/viewContent/3608648/View (accessed June 20, 2023). - The web framework used

NodeJS and Express - [1] Login - Dalhousie University, https://dal.brightspace.com/d2l/le/content/274269/viewContent/3608654/View (accessed Jul. 26, 2023).

## Sources Used

## Patrick wooden (Order buyer) - Citation

*****

### order-history.js

*Lines 54-56 and line 86*

const handleClick = (event) => {
navigate("/createreview", { state: { id: id, product: product, photoUrl: photoUrl } });
};

<StyledButton variant="contained" onClick={handleClick}>Review</StyledButton>

The code above was created by adapting the code in [reactrouter](https://v5.reactrouter.com/web/api/location) as shown below:

```
{
key: 'ac3df4', // not with HashHistory!
pathname: '/somewhere',
search: '?some=search-string',
hash: '#howdy',
state: {
[userDefined]: true
}
}
```

- <How> The code in [reactrouter](https://v5.reactrouter.com/web/api/location) was implemented by Patrick Wooden
- <Why> [reactrouter](https://v5.reactrouter.com/web/api/location)'s Code was used because it allowed for me to pass the values of my states to the profile page
- <How> [reactouter](https://v5.reactrouter.com/web/api/location)'s Code was modified by not using the same state values, instead using my own and also only using the state part in the code above

*****

### order-history.js

*Lines 157-165*

```
 orders.map((order) => (
              <div key={order._id}>
                <OrderHistoryCard
                   order={order}
                   handleCreateReviewOpen={handleCreateReviewOpen}
                ></OrderHistoryCard>
              </div>
            ))
          )}
```

The code above was created by adapting the code in [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs//) as shown below:

```
(posts.map((item) =>
// Presently we only fetch
// title from the API

<h4>{item.title}</h4>)
)
```

- <How> The code in [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/) was implemented by Patrick Wooden
- <Why> [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/)'s Code was used because It allows us map through each order and create a card to display them in
- <How> [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/)'s Code was modified by adding a grid wrap around each item, changing the name of the array that was mapped out and used my own card component I created.

*****

### track-order.js

*Lines 106-113*

```
 orders.map((order) => (
              <div key={order._id}>
                <TrackOrdersCard
                  order={order}
                ></TrackOrdersCard>
              </div>
            ))
          )}
```

The code above was created by adapting the code in [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs//) as shown below:

```
(posts.map((item) =>
// Presently we only fetch
// title from the API

<h4>{item.title}</h4>)
)
```

- <How> The code in [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/) was implemented by Patrick Wooden
- <Why> [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/)'s Code was used because It allows us map through each order and create a card to display them in
- <How> [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/)'s Code was modified by adding a grid wrap around each item, changing the name of the array that was mapped out and used my own card component I created.

*****

### favourites.js

*Lines 145-153*

```
favourites.map((favourite) => (
              <div key={favourite._id}>
                <FavouritesCard
                  key={favourite._id}
                  favourite={favourite}
                ></FavouritesCard>
              </div>
            ))
          )}
```

The code above was created by adapting the code in [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs//) as shown below:

```
(posts.map((item) =>
// Presently we only fetch
// title from the API

<h4>{item.title}</h4>)
)
```

- <How> The code in [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/) was implemented by Patrick Wooden
- <Why> [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/)'s Code was used because It allows us map through each order and create a card to display them in
- <How> [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/)'s Code was modified by adding a grid wrap around each item, changing the name of the array that was mapped out and used my own card component I created.

*****
### favourites.js

*Lines 46-69 and 100-102*

```
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
  };
  //handleRemoveFavourites removes the favourited ad from the users favourite list in the database
  const handleRemoveFavourite = async () => {
    const shouldRemove = window.confirm('Are you sure you want to unfavourite this ad?');
    if (shouldRemove) {
      try {
        await deleteFavourite(favourite._id);
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

---

 <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleRemoveFavourite}>Remove from Favorites</MenuItem>
  </Menu>
```

The code above was created by adapting the code in [mui](https://mui.com/material-ui/react-menu/) as shown below:

```
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
```

- <How> The code in [mui](https://mui.com/material-ui/react-menu/) was implemented by Patrick Wooden
- <Why> [mui](https://mui.com/material-ui/react-menu/)'s Code was used because It allows us to hide more options for each ad on the favourite page, like removing an ad from the favourites list so the page looks cleaner overall.
- <How> [mui](https://mui.com/material-ui/react-menu/)'s Code was modified by only have one menu item and creating that individual one instead of creating a map and looping though multiple options like the website shows. I also do not set a key to each menu item or use the selected={} like they do in the example

*****
### ratings-reviews.js

*Lines 137-146*

```
 Array.isArray(reviews) && reviews.map((review) => (
              <div key={review._id}>
                <ReviewCard
                  key={review._id}
                  review={review}
                  handleCreateReviewOpen={handleCreateReviewOpen}
                />
              </div>
            ))
          )}
```

The code above was created by adapting the code in [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs//) as shown below:

```
(posts.map((item) =>
// Presently we only fetch
// title from the API

<h4>{item.title}</h4>)
)
```

- <How> The code in [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/) was implemented by Patrick Wooden
- <Why> [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/)'s Code was used because It allows us map through each order and create a card to display them in
- <How> [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/)'s Code was modified by adding a grid wrap around each item, changing the name of the array that was mapped out and used my own card component I created. I also added a check to make sure the reviews object is a array before mapping it out

*****
### ratings-reviews.js

*Lines 147-152*

```
     {isCreateModalOpen && (
            <div className="modalOverlay">
              <CreateReview onClose={handleCreateReviewClose
} selectedAdId={selectedAdId} />
            </div>
          )}
```

The code above was created by adapting the code in [geeksforgeeks](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc) as shown below:

```
import React, { useState } from "react";
import styles from "./App.module.css";

import Modal from "./components/Modal";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </main>
  );
};

export default App;
```

- <How> The code in [dev](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc) was implemented by Patrick Wooden
- <Why> [dev](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc)'s Code was used because it allows for the required component to be displayed/hidden when the user clicks certian buttons
- <How> [dev](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc)'s Code was modified by using different variable names for holding the value of the component being open or not. I also return my own component instead of the shown modal compoent and also pass in extra props to the component like selectedAdId for example. I also use two event handles to set my handler for opening the component, one for true and one for false which I can call instead of manually changing the value in the onclick like the code above shows.

*****
### create-review.js

*Lines 90*

```
<Rating defaultValue={2} precision={0.5} onChange={handleRatingChange}/>
```

The code above was created by adapting the code in [mui](https://mui.com/material-ui/react-rating/) as shown below:

```
<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
```

- <How> The code in [mui](https://mui.com/material-ui/react-rating/) was implemented by Patrick Wooden
- <Why> [mui](https://mui.com/material-ui/react-rating/)'s Code was used because it allows us to allow users to enter a star rating with their product when creating a review
- <How> [mui](https://mui.com/material-ui/react-rating/)'s Code was modified by changing the default value to the existing star rating if there was already a review created. If there is not a existing review the star rating is set to 1 by default. I also added a onclick method which updates the star_rating value when the user sets a star review. 

*****

### create-review.js

*Lines 72 and 76*

onClose();

```
onClose();
```

The code above was created by adapting the code in [dev](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc) as shown below:

```
const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            Are you sure you want to delete the item?
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                Delete
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
```

- <How> The code in [dev](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc) was implemented by Patrick Wooden
- <Why> [dev](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc)'s Code was used because it allows the components for create review, edit review, checkout and create/edit payment components to be displayed to the users without moving them to another page.
- <How> [dev](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc)'s Code was modified by changing the methods name that handles closing the component. Instead of it manually being changed to false here a method that is created in the ratings-review file is called which does it for us. I also return a form instead of two buttons like the example shows, as well as pass through more props to use like the selectedAdId of the review the user has clicked to add.

*****
### cart.js

*Lines 137-146*

```
 Array.isArray(reviews) && reviews.map((review) => (
              <div key={review._id}>
                <ReviewCard
                  key={review._id}
                  review={review}
                  handleCreateReviewOpen={handleCreateReviewOpen}
                />
              </div>
            ))
          )}
```

The code above was created by adapting the code in [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs//) as shown below:

```
(posts.map((item) =>
// Presently we only fetch
// title from the API

<h4>{item.title}</h4>)
)
```

- <How> The code in [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/) was implemented by Patrick Wooden
- <Why> [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/)'s Code was used because It allows us map through each order and create a card to display them in
- <How> [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-data-from-apis-using-asynchronous-await-in-reactjs/)'s Code was modified by adding a grid wrap around each item, changing the name of the array that was mapped out and used my own card component I created. I also added a check to make sure the reviews object is a array before mapping it out

*****
### cart.js

*Lines 147-152*

```
     {isCreateModalOpen && (
            <div className="modalOverlay">
              <CreateReview onClose={handleCreateReviewClose
} selectedAdId={selectedAdId} />
            </div>
          )}
```

The code above was created by adapting the code in [geeksforgeeks](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc) as shown below:

```
import React, { useState } from "react";
import styles from "./App.module.css";

import Modal from "./components/Modal";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main>
      <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </main>
  );
};

export default App;
```

- <How> The code in [dev](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc) was implemented by Patrick Wooden
- <Why> [dev](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc)'s Code was used because it allows for the required component to be displayed/hidden when the user clicks certian buttons
- <How> [dev](https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc)'s Code was modified by using different variable names for holding the value of the component being open or not. I also return my own component instead of the shown modal compoent and also pass in extra props to the component like selectedAdId for example. I also use two event handles to set my handler for opening the component, one for true and one for false which I can call instead of manually changing the value in the onclick like the code above shows.

*****
### orders-buyers.js

*Lines 31-56*

```
<NavLink href="/order-history" className="simple-navbar-link" onClick={() => handleNavLinkClick('order-history')}>Order History</NavLink>
  </li>
  <li className={`order-navbar-item ${active === 'track-orders' ? 'active_page_navigation' : ''}`}>
    <NavLink href="/track-orders" className="simple-navbar-link" onClick={() => handleNavLinkClick('track-orders')}>Track Orders</NavLink>
  </li>
  <li className={`order-navbar-item ${active === 'favourites' ? 'active_page_navigation' : ''}`}>
    <NavLink href="#" className="simple-navbar-link" onClick={() => handleNavLinkClick('favourites')}>Favourites</NavLink>
  </li>
  <li className={`order-navbar-item ${active === 'payments' ? 'active_page_navigation' : ''}`}>
    <NavLink href="#" className="simple-navbar-link" onClick={() => handleNavLinkClick('payments')}>Payments</NavLink>
  </li>
  <li className={`order-navbar-item ${active === 'rating-review' ? 'active_page_navigation' : ''}`}>
    <NavLink href="#" className="simple-navbar-link" onClick={() => handleNavLinkClick('rating-review')}>Rating/Review</NavLink>
  </li>
  <li className={`order-navbar-item ${active === 'cart' ? 'active_page_navigation' : ''}`}>
    <NavLink href="#" className="simple-navbar-link" onClick={() => handleNavLinkClick('cart')}>Cart</NavLink>
  </li>
</ul>
</nav>
<div className='PageContainer'>
  {active === 'order-history' && <OrderHistoryPage />}
  {active === 'track-orders' && <TrackOrders />}
  {active === 'favourites' && <Favourites />}
  {active === 'payments' && <AccountPayments />}
  {active === 'rating-review' && <RatingAndReviews />}
  {active === 'cart' && <Cart />}
```

The code above was created by adapting the code in [h3webdevtuts](https://www.youtube.com/watch?v=eGaaw1Py2aY&t=708s&ab_channel=h3webdevtuts) as shown below:

```
<button onClick={() => setActive('FirstCard)}> One</button>

<div>
{active === "FirstCard" && <Card data={Data} cardIndex='0'/>}
```

- <How> The code in [h3webdevtuts](https://www.youtube.com/watch?v=eGaaw1Py2aY&t=708s&ab_channel=h3webdevtuts) was implemented by Patrick Wooden
- <Why> [h3webdevtuts](https://www.youtube.com/watch?v=eGaaw1Py2aY&t=708s&ab_channel=h3webdevtuts)'s Code was used because it allowed for all the order page components to be rendered and displayed on the orders page without being moved to another page. I also used this code for making the current page in the orders navbar be a different color to show it is the active link
- <How> [h3webdevtuts](https://www.youtube.com/watch?v=eGaaw1Py2aY&t=708s&ab_channel=h3webdevtuts)'s Code was modified by placing the onclick handler inside a navlink instead of a button. I also used different names for the states as well as returned pages that were created like orderhistory and did not pass any data into them. I also removed the cardIndex that they had used. I also modified it for the NavLinks by adding a condtional modifier for applying the active_page_navigation styling when active was equal to that page.

Sources for images used:
The images below were used in this assignment with proper author attributions which were retrived off Creative Commons
"Catalana LEGO Sports Car" by dluders is licensed under CC BY 2.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/2.0/?ref=openverse.

*****

## Parth Patel (Seller Analytics) - Citation

I used the css file and code file from assignment 1 - individual with following citations:

- W3Schools. (n.d.). React Router. w3schools.com. Available: https://www.w3schools.com/react/react_router.asp. Accessed: June 06, 2023.
- W3Schools. (n.d.). React useState Hook. w3schools.com. Available: https://www.w3schools.com/react/react_usestate.asp. Accessed: June 06, 2023.
- React Training. (n.d.). useNavigate Hook - React Router. reactrouter.com. Available: https://reactrouter.com/en/main/hooks/use-navigate. Accessed: June 06, 2023.
- React Training. (n.d.). Link Component - React Router. reactrouter.com. Available: https://reactrouter.com/en/main/components/link. Accessed: June 06, 2023
- React School. (n.d.). Button - React UI Components. react.school. Available: https://react.school/ui/button. Accessed: June 06, 2023
- W3Schools. (n.d.). ES6 Array Methods. w3schools.com. Available: https://www.w3schools.com/react/react_es6_array_methods.asp. Accessed: June 06, 2023

*****

Parth Patel, Analytic_dashboard.js, Line 8 Chart.register(...registerables), I used this code to register the chart controller, https://stackoverflow.com/questions/65002923/chart-js-where-do-i-find-which-components-should-be-registered. Accessed: June 06, 2023c

*****

Parth Patel, ChatPage.js, Line 75-77, Close button icon, I referred to this code style the close button, https://stackoverflow.com/questions/63459047/tri-state-close-button. Accessed: June 06, 2023

*****

Parth Patel, DeletePage.js, Line 12-14, handleDelete(), I referred to this code to implement a filter and delet functionality, https://stackoverflow.com/questions/69323625/how-can-i-filter-out-an-item-by-its-id. Accessed: June 06, 2023

*****

Parth Patel, RenewPage.js, Line 13-19, handleRenew(), I referred to this code to learn how to store previous string array value amnd change its flag, https://stackoverflow.com/questions/64815353/how-is-the-previtem-getting-the-value-of-the-previous-item. Accessed: June 06, 2023

*****

Parth Patel, SellerRatingPage.js, Line 35, <i className="fas fa-star-half-alt"></i>, I used this code to show the half star srting for the page. I imported @fortawesome/fontawesome-free/css/all.css , https://www.w3schools.com/icons/tryit.asp?icon=fas_fa-star-half-alt&unicon=f5c0. Accessed: June 06, 2023

*****

Parth Patel, SellerRatingPage.js, Line 32, <i key={index} className="fas fa-star"></i>, I used this code to show the star srting for the page. I imported @fortawesome/fontawesome-free/css/all.css , https://www.w3schools.com/icons/tryit.asp?icon=far_fa-star&unicon=f005. Accessed: June 06, 2023

*****

Parth Patel, Analytic_dashboard.js, Line 5, react-chartjs-2 , I used this library to create line, bar and pie charts for the page . I imported react-chartjs-2, and lerant how to use it from: https://www.chartjs.org/docs/latest/getting-started/. Accessed: June 06, 2023

*****

## Saiz Charolia (Login/Register/forgetPassword) - Citation

1. css referred from Assignment 1 (Individual Submission)
   URL: https://git.cs.dal.ca/charolia/csci-4177-5709-assignments/-/tree/main/Assignment1
   Author: Saiz Charolia
   Date Accessed: 06/11/2023

2. Code referred from Assignment 1 (Individual Submission)
   URL: https://git.cs.dal.ca/charolia/csci-4177-5709-assignments/-/tree/main/Assignment1
   Author: Saiz Charolia
   Date Accessed: 06/11/2023

*****

3. Login page and validation referred from Contact Mentor
   URL: https://contactmentor.com/login-form-react-js-code/
   Date Accessed: 06/11/2023

4. Image referred from icon8
   URL: https://icons8.com/illustrations/illustration/taxi-online-shop
   Date Accessed: 06/11/2023

*****

5. Form referred from handsonreact
   URL: https://handsonreact.com/docs/forms
   Date Accessed: 06/11/2023

6. Eye Splash and Eye icon referred from fontawesome
   URL: https://fontawesome.com/v4/icon/eye-slash
   https://fontawesome.com/v4/icon/eye
   Date Accessed: 06/11/2023

*****

7. Registeration form referred from geeksforgeeks
   URL: https://www.geeksforgeeks.org/how-to-develop-user-registration-form-in-reactjs/
   Date Accessed: 06/12/2023

8. Regex for password referred from stackoverflow
   URL: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
   Date Accessed: 06/12/2023

*****

9. Image referred from icon8
   URL: https://icons8.com/illustrations/illustration/bloom-online-store
   Date Accessed: 06/12/2023

10. Form referred from sectio.io
    URL: https://www.section.io/engineering-education/registration-form-react.js-firebase/
    Date Accessed: 06/12/2023

*****

11. Forgot password referred from codevoweb
    URL: https://codevoweb.com/forgot-reset-password-in-reactjs-and-axios/
    Date Accessed: 06/13/2023

12. OTP verification method referred from makeuseof (although not yet implemented)
    URL: https://www.makeuseof.com/password-reset-forgot-react-node-how-handle/
    Date Accessed: 06/13/2023

*****

13. Image referred from icon8
    URL: https://icons8.com/illustrations/illustration/abstract-password-recovery
    Date Accessed: 06/13/2023

*****

## Pranav Mahindru (Buyer dashboard, Navigation, footer, Seller Dashboard, Customer Support, Create/Preview Ad) - Citation

*****

### register.js and login.js

*Lines 42-43* for login.js

```
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
```

The code above was created by adapting the code is shown below: 

[1] “JavaScript : Email validation,” w3resource, https://www.w3resource.com/javascript/form/email-validation.php#:~:text=To%20get%20a%20valid%20email,%5D%2B (accessed June 20, 2023).

```
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
```

I am not able to change the regex because it was used for the form validation in the register and login page

*****

### createnewad.js

*Lines 175*  

```
<input type='file' multiple onChange={handleImage} accept='image/png,image/jpg,image/jpeg' />
```

The code above was created by adapting the code is shown below: 

[2] K. Nalawade, “How to implement multiple file uploads in react?,” Medium, https://levelup.gitconnected.com/how-to-implement-multiple-file-uploads-in-react-4cdcaadd0f6e (accessed June 20, 2023). 

```
Copy and paste the snippet of code you are referencing
<input id='fileUpload' type='file' multiple accept='application/pdf, image/png'/>
```

I am not able to change this because I need to upload png/jpg/jpeg multiple image. I used `multiple` and `accept` in the code. 

*****

### footer.css

*Lines 8*  

```
margin-top: auto;
```

The code above was created by adapting the code is shown below: 

[3] “Sticky footer in react (best solution),” YouTube, https://www.youtube.com/watch?v=pggIVY5eOGM (accessed June 20, 2023).

```
margin-top: auto;
```

I saw the video and I  used the `margin-top: auto;` to make sure that footer should be bottom of the page

*****

### navbarbuyer.js

*Lines 56-110*  

```
<li><NavLink to='/' state={getLocation.state} className={currentPath === '/' ? 'active_page' : ''}> Dashboard </NavLink></li>
<li><NavLink to='/analytics' state={getLocation.state} className={currentPath === '/analytics' ? 'active_page' : ''}> Analytics </NavLink></li>
<li><NavLink to='/orders' state={getLocation.state} className={currentPath === '/orders' ? 'active_page' : ''}> Orders </NavLink></li>
<li><NavLink to='/postAd' state={getLocation.state} className={currentPath === '/postAd' ? 'active_page' : ''}> Post Ad </NavLink></li>
<li><NavLink to='#' state={getLocation.state}><MessageIcon/></NavLink></li>
<li><NavLink to='#' state={getLocation.state}><NotificationIcon/></NavLink></li>
<li><NavLink to='/account' state={getLocation.state} className={currentPath === '/account' ? 'active_page' : ''}> Account </NavLink></li>
<li><NavLink to='/login' state={getLocation.state} className={currentPath === '/login' ? 'active_page' : ''}> Sign In<br/>Sign Up </NavLink></li>
```

The code above was created by adapting the code is shown below: 

[4] R. singh, “How to pass state or data in react-router V6,” Medium, https://medium.com/frontendweb/how-to-pass-state-or-data-in-react-router-v6-c366db9ee2f4 (accessed June 20, 2023). 

[5] “REACT router: Declarative routing for react,” ReactRouterWebsite, https://v5.reactrouter.com/web/api/NavLink (accessed June 20, 2023).

```
<NavLink
  to="/faq"
  className={isActive =>
    "nav-link" + (!isActive ? " unselected" : "")
  }
>
  FAQs
</NavLink>
```

I  read the whole docs and learn about NavLink also put the condition in it so that I change the color of navigation link for the current page and redirect to the another page.

*****

### navbarbuyer.js

*Lines 19*  && *Lines 34*  

```
setClicked((prevState) => (!prevState))
```

The code above was created by adapting the code is shown below: 

[6] user11224591user11224591 et al., “React’s SETSTATE method with Prevstate Argument,” Stack Overflow, https://stackoverflow.com/questions/55495198/reacts-setstate-method-with-prevstate-argument (accessed June 20, 2023). 

```
Increment = () => {
this.setState((prevState) => ({
    options: prevState.count + 1)
}));
}
```

I took a reference used in the navigation bar in mobile version and it work like a `toggle`.

*****

### for all css files

[7] T. V. Damme et al., “A complete guide to flexbox: CSS-tricks,” CSS, https://css-tricks.com/snippets/css/a-guide-to-flexbox/ (accessed June 20, 2023).  

I took reference from the above link and learnt more about the flex styling in css.

*****   

### App.js

*Lines 42-89* 

```
<BrowserRouter>
    <NavBarBuyer/>
    <Routes>
    {/* for User management */}
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>

    {/* for other pages */}
    <Route path='/' element={<DashBoard/>}/>
    <Route path='/postAd' element={<CreateNewAd/>}/>
    <Route path='/analytics' element={<Analytics/>}/>
    <Route path='/orders' element={<Orders/>}/>
    <Route path='/preview' element={<Preview/>}/>
    </Routes>
    <Footer/>
    {/* top button here */}
</BrowserRouter>
```

[8] enamul haqueenamul haque 99511 gold badge99 silver badges1717 bronze badges et al., “Switch’ is not exported from ‘react-router-dom,’” Stack Overflow, https://stackoverflow.com/questions/69843615/switch-is-not-exported-from-react-router-dom (accessed June 20, 2023). 

[9] React router, https://www.w3schools.com/react/react_router.asp (accessed June 20, 2023).

```
<BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    </Routes>
</BrowserRouter>
```

I took the reference for routing in website using the Routes because not able to use Switch.

*****  

### useState and useEffect

[10] Login - Dalhousie University, https://dal.brightspace.com/d2l/le/content/274269/viewContent/3608648/View (accessed June 20, 2023).

I took reference from the above link and learnt more about useState and useEffect.

***** 

### under icons folder

[11] React icons - github pages, https://react-icons.github.io/react-icons/icons?name=md (accessed June 20, 2023).

I took reference from the above link and imported all the icons from there which I used in the website.

***** 

### preview.js

*Lines 51-55* 

```
{
    getObject[0]['sendImageFiles'].map((images,index)=>(
        <div key={index}>
            <div>{getObject[0]['sendImageFiles'][index]['name']}</div>
        </div>
    ))
}
```

[12] Tim Mouskhelichvili, “How to loop through an array of objects in react?,” Tim Mouskhelichvili, https://timmousk.com/blog/react-loop-through-array-of-objects/ (accessed June 20, 2023).  

```
animals.forEach((animal, index) => {
    list.push(
      <div key={index}>
        <div>Type: {animal.type}</div>
        <div>Age: {animal.age}</div>
      </div>
    );
  });
```

I took reference from the above link and learnt about loop around the div and show responses.

***** 

### IN All pages

```
const getLocation = useLocation();
```

or 

```
navigate('/preview', {state: {
    data: [{sendImageFiles: selectImageFiles},
    {sendTitle: title},{sendPrice: price},{sendDescription: description},{sendProduct_tag: product_tag},
    {sendLocation: location},{sendCondition: selectCondition},{sendPayments: selectPayments}],
    getUserData
}});
```

[13] N. M, “How to pass data between pages in react-router-DOM V6?,” in, https://plainenglish.io/blog/how-to-pass-data-between-pages-in-react-router-dom-v6#2-through-url-states (accessed June 20, 2023).  

```
navigate and getting the data using useLocation
```

I took reference from the above link and learnt about how to useLocation and navigate with the data and show them in the UI.

***** 

### createnewad.js

*Lines 36-Line 47* 

```
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
```
[14] user2784722, user2784722user2784722 14711 gold badge11 silver badge88 bronze badges, PSLPSL 123k2121 gold badges253253 silver badges243243 bronze badges, mVChrmVChr 49.5k1111 gold badges107107 silver badges104104 bronze badges, and JivingsJivings 22.8k66 gold badges5959 silver badges100100 bronze badges, “Select and display image(s) using filereader,” Stack Overflow, https://stackoverflow.com/questions/18934738/

select-and-display-images-using-filereader (accessed Jul. 24, 2023). 
[15] MozDevNet, “Filereader: Readasdataurl() method - web apis: MDN,” Web APIs | MDN, https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL (accessed Jul. 24, 2023). 

```
<script type="text/javascript">
function readURL(input.joint) {

    if (input.joint.filers && input.joint.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.joint.files[0]);
    }
}
$("#imgInp").change(function(){
    readURL(this);
});
```

I took reference from the above link and learnt about URL.createObjectURL to show image in the preview.js.

### packge.json (in the main folder)

[1] “Run-all,” npm, https://www.npmjs.com/package/npm-run-all (accessed Jul. 26, 2023).  

use `npm-run-all` for run both backend and frontend at the same time locally (make sure to npm install int the backend and frontend folder)

### routes.js

```
app.use(cors());

```

[1] “Cors,” Express cors middleware, https://expressjs.com/en/resources/middleware/cors.html (accessed Jul. 26, 2023). 

```
app.use(cors());

```

got issues with the cors, solve by install and using in the `routes.js`

### model.js

```
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Team24:qwhoZh2NkExdtQu5@shopaestheticscluster.za4i1fn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
```

[1] “MongoDB cloud,” Cloud, https://cloud.mongodb.com/v2/64b0619b8139bd162a5df1c5#/clusters/connect?clusterId=ShopAestheticsCluster (accessed Jul. 26, 2023). 

connection to mongodb (taken from the above link) there is connect button and I follow the steps in the model

```
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Team24:qwhoZh2NkExdtQu5@shopaestheticscluster.za4i1fn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
```

### Used in the both navigation buyer and seller

*Lines 44*

```
getLocation.hash !== window.location.hash
```

[1] “Window location.hash,” Location hash Property, https://www.w3schools.com/jsref/prop_loc_hash.asp (accessed Jul. 26, 2023). 

```
location.hash
```

In the navigation I got problems with subnav which has `#PageName`, So I fix the top navigation refer to the above link

### preview.js, Inside the order-seller folders mostly all the files

```
<ReactLoading type="bars" color="#3f1a6b" height={200} width={100}/>

```

[1] “React-loading,” npm, https://www.npmjs.com/package/react-loading (accessed Jul. 26, 2023).

```
<ReactLoading type={type} color={color} height={667} width={375} />

```

learn react-loading from the above link

### createnewads.js

*Lines ## - ##*

```
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
```

[1] MozDevNet, “Filereader: Readasdataurl() method - web apis: MDN,” Web APIs | MDN, https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL (accessed Jul. 26, 2023). 
[1] user2784722, user2784722user2784722 14711 gold badge11 silver badge88 bronze badges, PSLPSL 123k2121 gold badges253253 silver badges243243 bronze badges, mVChrmVChr 49.5k1111 gold badges107107 silver badges104104 bronze badges, and JivingsJivings 22.8k66 gold badges5959 silver badges100100 bronze badges, “Select and display image(s) using filereader,” Stack Overflow, https://stackoverflow.com/questions/18934738/select-and-display-images-using-filereader (accessed Jul. 26, 2023). 

```
<script type="text/javascript">
function readURL(input) {

    if (input.filers && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInp").change(function(){
    readURL(this);
});
</script>
```

```
readAsDataURL(blob)
```

convert the image proper way and save in the database

### used in the backend and frontend in couple of js files

```
getAllImage = [...getAllImage, ...item.image]
```

[1] fadedbeefadedbee 42.5k4444 gold badges176176 silver badges304304 bronze badges et al., “Correct modification of state arrays in react.js,” Stack Overflow, https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-react-js (accessed Jul. 26, 2023). 

```
arrayvar: [...prevState.arrayvar, newelement]
```

use to store array in useState and if Id present find the object and update the array (in order-seller All other files)

### In the order-seller folder, respected files inside that folder

```
imageSliderObject.some(objectItem => objectItem.prodID === item._id)
```

[1] MozDevNet, “Array.prototype.some() - javascript: MDN,” JavaScript | MDN, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some (accessed Jul. 26, 2023).

```
const even = (element) => element % 2 === 0;
```

learn new thing that we can use `some` if `id match` then return otherwise go with the normal flow.

### In the order-seller folder, respected files inside that folder

I got this `getArrayObjects.map is not a function TypeError: getArrayObjects.map is not a function`
used the given to fix the error shown above

[1] “[solved] javascript typeerror: Map is not a function,” Decoding Web Development, https://www.decodingweb.dev/fix-map-is-not-a-function-error-in-javascript (accessed Jul. 26, 2023). 
[1] “Typeerror: Map() is not a function in react,” Datainfinities, https://www.datainfinities.com/31/map-is-not-a-function-in-react (accessed Jul. 26, 2023). 

### api.js

In my methods

```
const { _id, ...object } = data;
```

[1] Olawanletjoel, “How to consume rest apis in react – A beginner’s guide,” freeCodeCamp.org, https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/ (accessed Jul. 26, 2023). 

```
setPosts((posts) => [data, ...posts]);
```

separate the id and rest keep it as object/array

### routes.js

*Lines 8*

```
app.use(express.json({limit: "20mb"}));
```

I got this error `Error: request entity too large` use the below link to solve

[1] mike jamesmike james 8 et al., “Error: Request entity too large,” Stack Overflow, https://stackoverflow.com/questions/19917401/error-request-entity-too-large (accessed Jul. 26, 2023).

```
app.use(express.json({limit: '50mb'}));
```

it just increase the mb so that body can update the db 

### seller_status_page.js

*Lines 110*

```
const res = await getAllPostedAd({"user_id": user_data["_id"], "isActive": {$in: [true, false]} });
```

[1] .“CSS-19775fe{-webkit-text-decoration:none;text-decoration:none;color:#21313c;letter-spacing:unset;width:140px;}@media screen and (min-width: 1440px){.CSS-19775fe{width:216px;}}.CSS-1put1j{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-family:Akzidenz-Grotesk std;font-weight:300;cursor:pointer;-webkit-text-decoration:none;text-decoration:none;position:relative;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-align-content:flex-start;-ms-flex-line-pack:flex-start;align-content:Flex-start;letter-spacing:unset;font-size:16px;line-height:32px;-webkit-text-decoration:none;text-decoration:none;color:#21313c;letter-spacing:unset;width:140px;}.CSS-1put1j:hover{-webkit-text-decoration:none;text-decoration:none;color:#13AA52;}.CSS-1put1j:Focus-visible{outline:-webkit-focus-ring-color auto 1px;}.CSS-1put1j .textlink-arrow-class{font-family:arial,sans-serif;left:-50px;}.css-1put1j:hover .textlink-arrow-class{left:0;-webkit-animation:Linear 1 alternate;-webkit-animation-name:runlink;-webkit-animation-duration:300ms;}@-webkit-keyframes runlink{0%{left:-100px;}100%{left:0;}}@media screen and (min-width: 1440px){.CSS-1put1j{width:216px;}}database→,” $in - MongoDB Manual, https://www.mongodb.com/docs/manual/reference/operator/query/in/#:~:text=If%20the%20field%20holds%20an,%3E%20%2C%20and%20so%20on (accessed Jul. 26, 2023).

```
{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
```

get the value either true or false in the orders page using in the frontend

### controller.js and model.js

In my methods

```
{$set: req.body}
```

[1] .“CSS-19775fe{-webkit-text-decoration:none;text-decoration:none;color:#21313c;letter-spacing:unset;width:140px;}@media screen and (min-width: 1440px){.CSS-19775fe{width:216px;}}.CSS-1put1j{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-family:Akzidenz-Grotesk std;font-weight:300;cursor:pointer;-webkit-text-decoration:none;text-decoration:none;position:relative;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-align-content:flex-start;-ms-flex-line-pack:flex-start;align-content:Flex-start;letter-spacing:unset;font-size:16px;line-height:32px;-webkit-text-decoration:none;text-decoration:none;color:#21313c;letter-spacing:unset;width:140px;}.CSS-1put1j:hover{-webkit-text-decoration:none;text-decoration:none;color:#13AA52;}.CSS-1put1j:Focus-visible{outline:-webkit-focus-ring-color auto 1px;}.CSS-1put1j .textlink-arrow-class{font-family:arial,sans-serif;left:-50px;}.css-1put1j:hover .textlink-arrow-class{left:0;-webkit-animation:Linear 1 alternate;-webkit-animation-name:runlink;-webkit-animation-duration:300ms;}@-webkit-keyframes runlink{0%{left:-100px;}100%{left:0;}}@media screen and (min-width: 1440px){.CSS-1put1j{width:216px;}}database→,” $set - MongoDB Manual, https://www.mongodb.com/docs/manual/reference/operator/update/set/ (accessed Jul. 26, 2023). 

```
{ $set: { <field1>: <value1>, ... } }
```

update the existing post or other stuff in the db properly take from the above link

### seller_active_page.js and seller_status_page.js

used in those pages 

```
import { 
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    LinkedinShareButton, LinkedinIcon,
} from "react-share";
```

and 

```
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
```

[1] “React-share,” npm, https://www.npmjs.com/package/react-share (accessed Aug. 5, 2023). 
[2] I. Alam, “How to add social share buttons to your react app,” MUO, https://www.makeuseof.com/add-social-share-buttons-in-react/#:~:text=For%20example%2C%20to%20add%20a,Facebook%20button%20to%20your%20app. (accessed Aug. 5, 2023). 

```
import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';

const App = () => {
  return (
    <div>
      <FacebookShareButton
        url={'https://www.example.com'}
        quote={'Dummy text!'}
        hashtag="#muo"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );
};

export default App;
```

use these link to share the specific Ad to the Social media

***** 

## Joel Kuruvilla (About Us/ touched up navigation / bug fixes / Profile Settings / Notification Settings) - Citation

### notificationSettings.js

*Lines 3 - 19, 55 - 89, 103, & 109 - 133 *

```
import React, {useState, useEffect} from 'react';
import './notificationSettings.css';
import { userNotificationSettingsRead, userNotificationSettingsUpdate } from '../../api.js';
import Switch from 'react-switch';

function NotificationSettings() {
    const userData = JSON.parse(localStorage.getItem("user_info"));
    const userID = userData._id;

    const [allNotifcationsEnabled, setAllNotifcationsEnabled] = useState(false);
    const [inboxNotifcationsEnabled, setInboxNotifcationsEnabled] = useState(false);
    const [orderMessagsNotifcationsEnabled, setOrderMessagsNotifcationsEnabled] = useState(false);
    const [orderUpdatesNotifcationsEnabled, setOrderUpdatesNotifcationsEnabled] = useState(false);
    const [ratingReviewsNotifcationsEnabled, setRatingReviewsNotifcationsEnabled] = useState(false);
    const [notificationSoundsEnabled, setNotificationSoundsEnabled] = useState(false);
    const [emailNotifcationsEnabled, setEmailNotifcationsEnabled] = useState(false);
    const [phoneNotifcationsEnabled, setPhoneNotifcationsEnabled] = useState(false);

    ....

    const handleToggleAllSwitch = (e) => {
        setAllNotifcationsEnabled(e);
        setInboxNotifcationsEnabled(e);
        setOrderMessagsNotifcationsEnabled(e);
        setOrderUpdatesNotifcationsEnabled(e);
        setRatingReviewsNotifcationsEnabled(e);
        setNotificationSoundsEnabled(e);
        setEmailNotifcationsEnabled(e);
        setPhoneNotifcationsEnabled(e);
    }

    const handleToggleInboxSwitch = (e) => {
        setInboxNotifcationsEnabled(e);
    }
    const handleToggleOrderMessagesSwitch = (e) => {
        setOrderMessagsNotifcationsEnabled(e);
    }

    const handleOrderUpdatesToggleSwitch = (e) => {
        setOrderUpdatesNotifcationsEnabled(e);
    }
    const handleRatingReviewsToggleSwitch = (e) => {
        setRatingReviewsNotifcationsEnabled(e);
    }
    const handleNotificationSoundsToggleSwitch = (e) => {
        setNotificationSoundsEnabled(e);
    }

    const handleEmailNotificationToggleSwitch = (e) => {
        setEmailNotifcationsEnabled(e);
    }

    const handlPhoneNotificationToggleSwitch = (e) => {
        setPhoneNotifcationsEnabled(e);
    }

  ....

    return (
        ....
              <form className='notificationSettings-form'>
                <li> All Notifications: <Switch className="notificationSettings-toggle" id="notification-toggle-all"
                 onChange={handleToggleAllSwitch} checked={allNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Inbox Messages: <Switch className="notificationSettings-toggle" onChange={handleToggleInboxSwitch}
                 checked={inboxNotifcationsEnabled} borderRadius={12}/>  </li>
                <hr/>
                <li> Order Mesages: <Switch className="notificationSettings-toggle" onChange={handleToggleOrderMessagesSwitch}
                 checked={orderMessagsNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Order Updates <Switch className="notificationSettings-toggle" onChange={handleOrderUpdatesToggleSwitch}
                 checked={orderUpdatesNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Rating/Review Notifications: <Switch className="notificationSettings-toggle" onChange={handleRatingReviewsToggleSwitch}
                 checked={ratingReviewsNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Notification Sounds: <Switch className="notificationSettings-toggle" onChange={handleNotificationSoundsToggleSwitch}
                 checked={notificationSoundsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Email Notification: <Switch className="notificationSettings-toggle" onChange={handleEmailNotificationToggleSwitch}
                 checked={emailNotifcationsEnabled} borderRadius={12} /> </li>
                <hr/>
                <li> Phone Notification: <Switch className="notificationSettings-toggle" onChange={handlPhoneNotificationToggleSwitch}
                 checked={phoneNotifcationsEnabled} borderRadius={12} /> </li>
             </form>
             
```

The code above was created by adapting the code in [npmjs - react-switch](https://www.npmjs.com/package/react-switch) as shown below: 

```
import React, { Component } from "react";
import Switch from "react-switch";

class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <label>
        <span>Switch with default style</span>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}

```

- <!---How---> The code in [npmjs - react-switch](https://www.npmjs.com/package/react-switch) was implemented by copying specifically the code <Switch> tag code to add the toggle switch for this particular page. I also followed conceptually in adding the onchange and checking status; as they were required anyways, to implement its frontend implementation.
- <!---Why---> [npmjs - react-switch](https://www.npmjs.com/package/react-switch)'s Code was used because it provided a quick, effective and efficient manner in which our team can implement toggle switches into our project.
- <!---How---> [npmjs - react-switch](https://www.npmjs.com/package/react-switch)'s Code was modified by converting the code to use useStates in being able to pass and save the changes on a React project properly. I also modified its styling slightly to match context and make more visually appealing. 


### profileSettings.js

*Lines 3 - 21, 41 - 63, 89, & 119 - 143 *

```
import React, {useState, useEffect} from 'react'
import './profileSettings.css';
import { userProfileSettingsRead, userProfileSettingsUpdate, userSignUpUpdate } from '../../api.js';
import Switch from 'react-switch';

function ProfileSettings() {
    const userData = JSON.parse(localStorage.getItem("user_info"));
    const userID = userData._id;

    //Signup Configurations
    const [locationAddress, setlocationAddress] = useState(userData.address);
    const [phoneNumber, setPhoneNumber] = useState(userData.phone);

    //Profile Setting Configurations
    const [email2FAEnabled, setEmail2FAEnabled] = useState(false);
    const [phone2FAEnabled, setPhone2FAEnabled] = useState(false);
    const [authenticationApp2FAEnabled, setAuthenticationApp2FAEnabled] = useState(false);
    const [currentLocationEnabled, setCurrentLocationEnabled] = useState(false);
    const [disableAccountEnabled, setDisableAccountEnabled] = useState(false);

    .....


    const handleAddressInput = (e) => {
        setlocationAddress(e.target.value);
    }
    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    const handleEmailToggleSwitch = (e) => { 
        setEmail2FAEnabled(e);
    }
    const handlePhoneToggleSwitch = (e) => {  
        setPhone2FAEnabled(e); 
    }
    const handleAuthenticationAppToggleSwitch = (e) => {  
        setAuthenticationApp2FAEnabled(e);
    }
    const handleCurrentLocationToggleSwitch = (e) => { 
        setCurrentLocationEnabled(e);
    }
    const handleDisableAccountToggleSwitch = (e) => { 
        setDisableAccountEnabled(e);
    }

  ....

    return (
      ....
            <div className='profileSettings-twoFactorAuthentication'>
                <h3> Two Factor Authentication </h3>
                <form className='profileSettings-twoFactorAuthentication-form'>
                    <li> Email: <Switch className="profileSettings-toggle" onChange={handleEmailToggleSwitch}
                     checked={email2FAEnabled} borderRadius={12} /></li>
                    <li> Phone: <Switch className="profileSettings-toggle" onChange={handlePhoneToggleSwitch}
                     checked={phone2FAEnabled} borderRadius={12} /> </li>
                    <li> Authentication App: <Switch className="profileSettings-toggle" onChange={handleAuthenticationAppToggleSwitch}
                     checked={authenticationApp2FAEnabled} borderRadius={12} /> </li>
                </form>
            </div>
            <div className='profileSettings-setLocation'>
                <h3> Set Current Loation </h3>
                <form className='profileSettings-setLocation-form'>
                    <li> Location: <Switch className="profileSettings-toggle" onChange={handleCurrentLocationToggleSwitch}
                     checked={currentLocationEnabled} borderRadius={2} /> </li>
                </form>
            </div>
            <div className='profileSettings-danger'>
                <h3> Danger </h3>
                <form className='profileSettings-danger-form'>
                    <li> Disable Account <Switch className="profileSettings-toggle" onChange={handleDisableAccountToggleSwitch}
                     checked={disableAccountEnabled} borderRadius={2} onColor='ff0000'/> </li>
                </form>
            </div>

```

The code above was created by adapting the code in [npmjs - react-switch](https://www.npmjs.com/package/react-switch) as shown below: 

```
import React, { Component } from "react";
import Switch from "react-switch";

class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <label>
        <span>Switch with default style</span>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}

```

- <!---How---> The code in [npmjs - react-switch](https://www.npmjs.com/package/react-switch) was implemented by copying specifically the code <Switch> tag along with 'onchange' and 'checking' status. As was done for the notification settings page initially.
- <!---Why---> [npmjs - react-switch](https://www.npmjs.com/package/react-switch)'s Code was used because it provided a quick, effective and efficient manner in which our team can implement toggle switches into our project.
- <!---How---> [npmjs - react-switch](https://www.npmjs.com/package/react-switch)'s Code was modified by converting the code to use useStates in being able to pass and save the changes on a React project properly. I also modified its styling slightly to match context and make more visually appealing. 


## Acknowledgments

Everyone refer to their A1 assignment code

*****