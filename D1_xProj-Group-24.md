<!-- put all citation here -->

<!--
    Your Name, File Name, Line Number + (piece of code), Small Description (why did you take that), Link of the website

### orderhistory.js

*Lines 86*

```
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

*Repeat as needed*


### profile.js

*Lines 9-10*

```
    const location = useLocation();
  const id = location.state.id;

```

The code above was created by adapting the code in [Labs Madisoft](https://labs.madisoft.it/how-does-react-router-location-state-works/) as shown below: 

```
let location = useLocation();
 
location.state; 

```

- <How> The code in [Labs Madisoft](https://labs.madisoft.it/how-does-react-router-location-state-works/) was implemented by Patrick Wooden
- <Why> [Labs Madisoft](https://labs.madisoft.it/how-does-react-router-location-state-works/)'s Code was used because It allowed me to access the states I had sent over from the signup page
- <How> [Labs Madisoft](https://labs.madisoft.it/how-does-react-router-location-state-works/)'s Code was modified by adding location.state.whatevernameIsentover to display the info.

### orderhistory.js

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

### trackorder.js

*Lines 123-128*

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


### favourites.js

*Lines 40-48 and 76-78*

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
(posts.map((item) =>
                        // Presently we only fetch 
                        // title from the API 
                        <h4>{item.title}</h4>)
                    )
```

- <How> The code in [mui](https://mui.com/material-ui/react-menu/) was implemented by Patrick Wooden
- <Why> [mui](https://mui.com/material-ui/react-menu/)'s Code was used because It allows us to hide more options for each ad on the favourite page, like removing an ad from the favourites list so the page looks cleaner overall.
- <How> [mui](https://mui.com/material-ui/react-menu/)'s Code was modified by only have one menu item and creating that individual one instead of creating a map and looping though multiple options like the website shows

### createreview.js

*Lines 75*

```
<Rating defaultValue={2} precision={0.5} onChange={handleRatingChange}/>


```

The code above was created by adapting the code in [mui](https://mui.com/material-ui/react-rating/) as shown below: 

```
<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
```

- <How> The code in [mui](https://mui.com/material-ui/react-rating/) was implemented by Patrick Wooden
- <Why> [mui](https://mui.com/material-ui/react-rating/)'s Code was used because it allows us to allow users to enter a star rating with their product when creating a review
- <How> [mui](https://mui.com/material-ui/react-rating/)'s Code was modified by only adding a onchange handler so we are ablet to save the rating the user gives a product and store that in their review data and can be displayed on the sellers profile later.


### orders-navbar.js

*Lines 37-61*

```
                    <NavLink href="/order-history" className="simple-navbar-link"  onClick={() => handleNavLinkClick('order-history')}>Order History</NavLink>
              </li>
              <li className={`order-navbar-item ${active === 'track-orders' ? 'active_page_navigation' : ''}`}>
                  <NavLink href="/track-orders" className="simple-navbar-link" onClick={() => handleNavLinkClick('track-orders')}>Track Orders</NavLink>
              </li>
              <li className={`order-navbar-item ${active === 'favourites' ? 'active_page_navigation' : ''}`}>
                  <NavLink href="#" className="simple-navbar-link" onClick={() => handleNavLinkClick('favourites')}>Favourites</NavLink>
              </li>
              <li className={`order-navbar-item ${active === 'payments' ? 'active_page_navigation' : ''}`}>
                  <NavLink href="#" className="simple-navbar-link"  onClick={() => handleNavLinkClick('payments')}>Payments</NavLink>
              </li>
              <li className={`order-navbar-item ${active === 'rating-review' ? 'active_page_navigation' : ''}`}>
                  <NavLink href="#" className="simple-navbar-link"  onClick={() => handleNavLinkClick('rating-review')}>Rating/Review</NavLink>
              </li>
              <li className={`order-navbar-item ${active === 'cart' ? 'active_page_navigation' : ''}`}>
                  <NavLink href="#" className="simple-navbar-link" onClick={() => handleNavLinkClick('cart')}>Cart</NavLink>
              </li>
          </ul>
      </nav><div className='PageContainer'>
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
### createreview.js

*Lines 83*

```
<Rating defaultValue={2} precision={0.5} onChange={handleRatingChange}/>


```

The code above was created by adapting the code in [mui](https://mui.com/material-ui/react-rating/) as shown below: 

```
<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
```

- <How> The code in [mui](https://mui.com/material-ui/react-rating/) was implemented by Patrick Wooden
- <Why> [mui](https://mui.com/material-ui/react-rating/)'s Code was used because it allows us to allow users to enter a star rating with their product when creating a review
- <How> [mui](https://mui.com/material-ui/react-rating/)'s Code was modified by only adding a onchange handler so we are ablet to save the rating the user gives a product and store that in their review data and can be displayed on the sellers profile later.


Sources for images used:
The images below were used in this assignment with proper author attributions which were retrived off Creative Commons
"Catalana LEGO Sports Car" by dluders is licensed under CC BY 2.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/2.0/?ref=openverse.
-->
-->

Pranav Mahindru
buyers dashboard, footer, navigation, add icons, seller dashboard, seller post Ad and preview Ad
are taken from the A1, I will put all citation from my A1 individuals.


grids