import {
  FETCH_TWEETS_BEGIN,
  FETCH_TWEETS_SUCCESS,
  FETCH_TWEETS_FAILURE,
  FETCH_TWEETS_FILTERED
} from "./../action/tweetActions";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function tweetReducer(
  state = initialState,
  action
) {
  switch (action.type) {

    case FETCH_TWEETS_BEGIN:
      // Set the state as "loading" to show a spinner or something
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_TWEETS_SUCCESS:
      // update the items with the data from the twitter server
      return {
        ...state,
        loading: false,
        items: action.payload.tweets,
      };

    case FETCH_TWEETS_FILTERED:
      // update the items with the data from the twitter server
        return {
            ...state,
            loading: false,
            items: state.items.filter((item) => item.text.includes(action.payload.text))
    };

    case FETCH_TWEETS_FAILURE:
      //  set loading to "false" when there is error
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };


    default:
      // default state
      return state;
  }
}
