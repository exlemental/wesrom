import ACTION_TYPES from '../actions/ActionTypes';
import _ from 'lodash';
const initialState = {
  loading: false,
  data: '',
  error: '',
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.API_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.API_SUCCESS:
      const data = action.payload;
      const noImageURL =
        'https://c-lj.gnst.jp/public/img/common/noimage.jpg?20190126050058';
      const cardsWithMechanics = data.filter(e => _.has(e, 'mechanics'));
      var dict = {};
      cardsWithMechanics.forEach(card => {
        card.mechanics.forEach(mechanic => {
          var imgUrl = noImageURL;
          if (card.img != null) {
            imgUrl = card.img;
          }
          if (dict[mechanic.name] == null) {
            dict[mechanic.name] = [imgUrl];
          } else {
            dict[mechanic.name].push(imgUrl);
          }
        });
      });

      dict = dict;
      const names = _.flattenDeep(cardsWithMechanics.map(e => e.mechanics)).map(
        e => e.name,
      );
      const mechanics = _.uniq(names);

      return {
        ...state,
        dict: dict,
        mechanics: mechanics,
        loading: false,
      };

    case ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default apiReducer;
