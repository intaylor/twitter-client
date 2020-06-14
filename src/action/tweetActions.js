export const FETCH_TWEETS_BEGIN = "FETCH_TWEETS_BEGIN";
export const FETCH_TWEETS_SUCCESS = "FETCH_TWEETS_SUCCESS";
export const FETCH_TWEETS_FILTERED = "FETCH_TWEETS_FILTERED";
export const FETCH_TWEETS_FAILURE = "FETCH_TWEETS_FAILURE";

export const fetchTweetsBegin = () => ({
  type: FETCH_TWEETS_BEGIN
});

export const fetchTweetsSuccess = (tweets) => ({
  type: FETCH_TWEETS_SUCCESS,
  payload: { tweets }
});

export const fetchTweetsFiltered = (tweets) => ({
  type: FETCH_TWEETS_FILTERED,
  payload: { tweets }
});

export const fetchTweetsFailure = error => ({
  type: FETCH_TWEETS_FAILURE,
  payload: { error }
});

function getTweets(param) {
  return fetch("http://localhost:8080/tweet/"+param)
    .then(handleErrors)
    .then(res => res.json());
}

function fakeGetProducts() {
  return new Promise(resolve => {
    // Resolve after a timeout so we can see the loading indicator
    setTimeout(
      () =>
        resolve({
          products: [
            {
              id: 0,
              name: "Apple"
            },
            {
              id: 1,
              name: "Bananas"
            },
            {
              id: 2,
              name: "Strawberries"
            }
          ]
        }),
      1000
    );
  });
}

export function fetchTweets(param) {
  return dispatch => {
    dispatch(fetchTweetsBegin());
    return getTweets(param)
      .then(json => {
        dispatch(fetchTweetsSuccess(json.statuses));
        return json.statuses;
      })
      .catch(error =>
        dispatch(fetchTweetsFailure(error))
      );
  };
}

// handle HTTP errors
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
