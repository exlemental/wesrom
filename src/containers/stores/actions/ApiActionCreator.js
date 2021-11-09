import axios from 'axios';
import {fetchData, fetchSuccess, fetchError} from '../actions/ApiActions';

const apiActionCreator = url => dispatch => {
  dispatch(fetchData());
  return new Promise(() => {
    axios({
      method: 'GET',
      url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/Classic',
      headers: {
        'content-type': 'application/heartstone',
        'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
        'x-rapidapi-key': 'd1d64958b4mshf3082171e0f6177p116eabjsn999662bd4485',
        useQueryString: true,
      },
      params: {
        set: 'Classic',
      },
    })
      .then(response => {
        dispatch(fetchSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
        console.log(error);
      });
  });
};

export default apiActionCreator;
