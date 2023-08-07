/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import "./favourites.css";
import { getFavourites, deleteFavourite } from '../../../../api';
import ImageSlider from '../image-slider';

const Favourites = () => {
  const storedData = localStorage.getItem('user_info');
  const parsedData = JSON.parse(storedData);
  const user_id = parsedData._id;
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
        const result = await getFavourites(user_id);
        if (Object.keys(result).length > 0) {
          if (!result.address) {
            setFavourites(result);
          }
        }
    };
    fetchFavourites();
  }, []);

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
            favourites.map((item) => {
              return(
                <ImageSlider
                  item={item}
                  handleCreateReviewOpen=""
                  pageName="favourites"
                  key={item._id}
                />
              )
            })
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Favourites;
