/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import "./favourites.css";
import { getFavourites, deleteFavourite } from '../../../../api';
//styling for my card, cardmedia, typography and button I use in this file
const StyledTypography = styled(Typography)({
  margin: '10px',
  fontSize: '10px',
  textAlign: 'center',
  '@media (min-width: 600px)': {
    fontSize: '14px',
  },
  '@media (min-width: 807px)': {
    fontSize: '18px',
  },
});

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'row',
  padding: '15px',
  width: '75%',
  alignItems: 'center',
  marginRight: '10px',
  border: '1px solid',
  borderRadius: '16px',
  backgroundColor: 'rgb(230,230,230)',
  margin: '0 auto'
});

const StyledCardMedia = styled(CardMedia)({
  objectFit: "contain",
  paddingTop: "5px",
});

//favourites card returns a image of the product, the ad title, price and a button to remove the ad from the favourites list. This is done for each item.
const FavouritesCard = ({ favourite }) => {
  const { ad_details } = favourite;
  const price = `$${ad_details.price}`;
  const title = ad_details.title;
  const photoUrl = ad_details.image;
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <div style={{ paddingBottom: '5px' }}>
      <StyledCard>
        <Grid item xs={4} md={4}>
          {photoUrl && photoUrl.length > 0 ? (
            <StyledCardMedia
              component="img"
              height="auto"
              image={photoUrl[0]}
              alt="Product Image"
            />
          ) : (
            <div className="favouriteLabel">No Image Available</div>
          )}
        </Grid>
        <Grid item xs={3} md={3}>
          <StyledTypography>
            {title}
          </StyledTypography>
        </Grid>
        <Grid item xs={3} md={3}>
          <StyledTypography>
            Price: {price}
          </StyledTypography>
        </Grid>

        <Grid item xs={1} md={1} sx={{ marginRight: '1px' }}>
          <StyledTypography sx={{ flexGrow: 1 }}>
            <MoreVertIcon onClick={handleClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleRemoveFavourite}>Remove from Favorites</MenuItem>
            </Menu>
          </StyledTypography>
        </Grid>
      </StyledCard>
    </div>
  );
};

const Favourites = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  const [selectedAdId, setAdId] = useState('');
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const result = await getFavourites(user_id);
        if (!result.address) {
         
          setFavourites(result);
        }
        
      } catch (error) {
        return error;
      }
    };

    fetchFavourites();
  }, [user_id]);

   
  

  return (
    <div style={{ padding: '20px' }}>
      <Grid container rowSpacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems="center">
          <Grid container justifyContent="center">
            <h1 className="favouriteHeading">Favourites</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {favourites.length === 0 ? (
            <div className="center-container">
              <h2 className="favouriteLabel">No Ads Favourited</h2>
            </div>
          ) : (
            favourites.map((favourite) => {
              return(
                <div key={favourite._id}>
                <FavouritesCard
                  key={favourite._id}
                  favourite={favourite}
                ></FavouritesCard>
              </div>
              )
            
            })
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Favourites;
