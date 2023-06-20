

This project is the creation of ShopAesthetics proposed online marketplace where authenticity and security of a monitored marketplace meets the community of people who want to enhance their aesthetic lifestyle. Our online marketplce aims to provide the users with aesthetically pleasing UI/UX while providing effecient marketplace features. Currently this project only has front end stlying and effects for the created web pages, the back end functionality will be added at a later point.


* *Date Created*: DD 06 2023
* *Last Modification Date*: 20 06 2023
* *Project URL*: <http://example.com/>
* *Git URL*: <https://git.cs.dal.ca/mahindru/csci-4177-5709-xproj-group-24>

## Authors

* [Name](email@dal.ca) - *(Developer)*
* [Patrick Wooden](pt308649@dal.ca) - *(Developer)*
* [Name](email@dal.ca) - *(Developer)*
* [Name](email@dal.ca) - *(Developer)*
* [Name](email@dal.ca) - *(Developer)*
<!-- put all citation here -->

<!--
    Your Name, File Name, Line Number + (piece of code), Small Description (why did you take that), Link of the website
 -->

 Patrick wooden

### order-history.js

*Lines 54-56 and line 86*

```
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


### order-history.js

*Lines 133-137*

```
{orders.map((order) => (
  <Grid item xs={12} md={12}>
    <OrderHistoryCard key={order.id} product={order.product} status={order.status} address={order.address} photo={order.photoUrl} />
  </Grid>
))}
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

### track-order.js

*Lines 113-118*

```
     {orders.map((order) => (
            <Grid item xs={12} md={12}>

              <TrackOrdersCard key={order.id} product={order.product} status={order.status} address={order.expecteddate} photo={order.photoUrl} />
            </Grid>
          ))}
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


### favourites.js

*Lines 39-47 and 75-77*

```
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

-------------------------
 <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
  <MenuItem onClick={handleClose}>Remove from Favorites</MenuItem>
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

### create-review.js

*Lines 68*

```
<Rating defaultValue={2} precision={0.5} onChange={handleRatingChange}/>


```

The code above was created by adapting the code in [mui](https://mui.com/material-ui/react-rating/) as shown below: 

```
<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
```

- <How> The code in [mui](https://mui.com/material-ui/react-rating/) was implemented by Patrick Wooden
- <Why> [mui](https://mui.com/material-ui/react-rating/)'s Code was used because it allows us to allow users to enter a star rating with their product when creating a review
- <How> [mui](https://mui.com/material-ui/react-rating/)'s Code was modified by changing the default value to 1 and making the percision change to 1. This will be further modified in the future by adding a onchange handler so we are able to save the rating the user gives a product and store that in their review data and can be displayed on the sellers profile later. As there is no backend implemented into this project yet this section does not look very modified so I wanted to make this note so markers know that this code will be further modified and not just used like this.


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

Pranav Mahindru
buyers dashboard, footer, navigation, add icons, seller dashboard, seller post Ad and preview Ad
are taken from the A1, I will put all citation from my A1 individuals.

Parth Patel, Analytic_dashboard.js, Line 8 Chart.register(...registerables), I used this code to register the chart controller, https://stackoverflow.com/questions/65002923/chart-js-where-do-i-find-which-components-should-be-registered

Parth Patel, ChatPage.js, Line 75-77, Close button icon, I referred to this code style the close button, https://stackoverflow.com/questions/63459047/tri-state-close-button

Parth Patel, DeletePage.js, Line 12-14, handleDelete(), I referred to this code to implement a filter and delet functionality, https://stackoverflow.com/questions/69323625/how-can-i-filter-out-an-item-by-its-id

Parth Patel, RenewPage.js, Line 13-19, handleRenew(), I referred to this code to learn how to store previous string array value amnd change its flag, https://stackoverflow.com/questions/64815353/how-is-the-previtem-getting-the-value-of-the-previous-item

Parth Patel, SellerRatingPage.js, Line 35,  <i className="fas fa-star-half-alt"></i>, I used this code to show the half star srting for the page. I imported @fortawesome/fontawesome-free/css/all.css , https://www.w3schools.com/icons/tryit.asp?icon=fas_fa-star-half-alt&unicon=f5c0

Parth Patel, SellerRatingPage.js, Line 32,   <i key={index} className="fas fa-star"></i>, I used this code to show the star srting for the page. I imported @fortawesome/fontawesome-free/css/all.css , https://www.w3schools.com/icons/tryit.asp?icon=far_fa-star&unicon=f005

Parth Patel, Analytic_dashboard.js, Line 5, react-chartjs-2 , I used this library to create line, bar and pie charts for the page . I imported react-chartjs-2, and lerant how to use it from: https://www.chartjs.org/docs/latest/getting-started/


Saiz Charolia
1. css referred from Assignment 1 (Individual Submission)
   URL: https://git.cs.dal.ca/charolia/csci-4177-5709-assignments/-/tree/main/Assignment1
   Author: Saiz Charolia
   Date Accessed: 06/11/2023 

2. Code referred from Assignment 1 (Individual Submission)
   URL: https://git.cs.dal.ca/charolia/csci-4177-5709-assignments/-/tree/main/Assignment1
   Author: Saiz Charolia
   Date Accessed: 06/11/2023 

3. Login page and validation referred from Contact Mentor
   URL: https://contactmentor.com/login-form-react-js-code/
   Date Accessed: 06/11/2023

4. Image referred from icon8
   URL: https://icons8.com/illustrations/illustration/taxi-online-shop
   Date Accessed: 06/11/2023 

5. Form referred from handsonreact
   URL: https://handsonreact.com/docs/forms
   Date Accessed: 06/11/2023

6. Eye Splash and Eye icon referred from fontawesome
   URL: https://fontawesome.com/v4/icon/eye-slash 
        https://fontawesome.com/v4/icon/eye
   Date Accessed: 06/11/2023

7. Registeration form referred from geeksforgeeks
   URL: https://www.geeksforgeeks.org/how-to-develop-user-registration-form-in-reactjs/
   Date Accessed: 06/12/2023

8. Regex for password referred from stackoverflow
   URL: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
   Date Accessed: 06/12/2023

9. Image referred from icon8
   URL: https://icons8.com/illustrations/illustration/bloom-online-store
   Date Accessed: 06/12/2023

10. Form referred from sectio.io
    URL: https://www.section.io/engineering-education/registration-form-react.js-firebase/
    Date Accessed: 06/12/2023

11. Forgot password referred from codevoweb
    URL: https://codevoweb.com/forgot-reset-password-in-reactjs-and-axios/
    Date Accessed: 06/13/2023

12. OTP verification method referred from makeuseof (although not yet implemented)
    URL: https://www.makeuseof.com/password-reset-forgot-react-node-how-handle/
    Date Accessed: 06/13/2023

13. Image referred from icon8
    URL: https://icons8.com/illustrations/illustration/abstract-password-recovery
    Date Accessed: 06/13/2023