/**
 * Created by TaylorWei on 2020-04-13.
 */
import * as actions from '../../action/tweetActions'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
    it('should create an action to fetch tweets', () => {
        const text = 'text'
        const expectedAction = {
            type: types.FETCH_TWEETS_FILTERED,
            text
        }
        expect(actions.fetchTweetsFiltered(text)).toEqual(expectedAction)
    })
})

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
})

it('creates FETCH_TWEETS_SUCCESS when fetching tweets has been done', () => {
    fetchMock.getOnce('/tweet/soccer', {
        body: { tweets: ['a tweet for soccer'] },
        headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
        { type: types.FETCH_TWEETS_BEGIN },
        { type: types.FETCH_TWEETS_SUCCESS, body: { tweets: ['a tweet for soccer'] } }
    ]
    const store = mockStore({ tweets: [] })

    return store.dispatch(actions.fetchTweets('soccer')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
});

