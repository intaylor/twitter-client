import React from "react";
import { connect } from "react-redux";
import { fetchTweets } from "./../action/tweetActions";
import SearchTweet from "./TweetSearch";

class TweetList extends React.Component {

    componentDidMount() {
        setInterval(
                () => { console.log(this.props);
                        console.log('handle :======> ' + this.props.dataFromParent);
                        let param = this.props.dataFromParent || 'soccer';
                        console.log('param :======> ' + param);
                        this.props.dispatch(fetchTweets(param));
                }, 10000
        );
  }

  render() {
    const { error, loading, tweets, filterFromParent } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    const Tweet = (tweet, index) => (
      <div className="tweet" key={index}>
          <p className="user">
              <span className="screen-name">{tweet.user.name}</span>
              <span className="username">{tweet.user.screen_name}</span>
          </p>
          <p className="tweet-text">{tweet.text}</p>
          <div className="meta">
            <div>
                <span className="retweets">Retweets: {tweet.retweet_count}</span>
              <span className="likes">Likes: {tweet.favorite_count}</span>
            </div>
          </div>
      </div>
    );

    const tweetlist = filterFromParent ?
        tweets.filter(tweet => (tweet.text.includes(filterFromParent))).map((tweet, index) => Tweet(tweet, index)) :
                            tweets.map((tweet, index) => Tweet(tweet, index));

    return (
        <div className="App">
          <header className="App-header">
            <h1>Tweets</h1>
          </header>
          <main className="tweets">{tweetlist}</main>
        </div>
      );

  };

}

const mapStateToProps = state => ({
  tweets: state.tweets.items,
  loading: state.tweets.loading,
  error: state.tweets.error,
  handle: state.tweets.handle,
  text: state.tweets.text
});

export default connect(mapStateToProps)(TweetList);
