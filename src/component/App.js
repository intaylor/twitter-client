/**
 * Created by TaylorWei on 2020-04-13.
 */
import React from "react";
import { connect } from "react-redux";
import { fetchTweets } from "./../action/tweetActions";
import { bindActionCreators } from 'redux'
import TweetList from "./TweetList";
import SearchTweet from "./TweetSearch";
import FilterTweet from "./TweetFilter";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {handle: '', text: ''};
        this.onUpdate = this.onUpdate.bind(this);
        this.onFilter = this.onFilter.bind(this);
    }

    onUpdate(handle) {console.log('App handle: =====> ' + handle)
        this.setState({handle});
    }

    onFilter(text) {console.log('App text: =====> ' + text)
        this.setState({text});
    }

    render() {
        return (<div className = "App">
                    <SearchTweet onUpdate={this.onUpdate}/>
                    <FilterTweet onFilter={this.onFilter}/>
                    <TweetList dataFromParent = {this.state.handle}
                            filterFromParent = {this.state.text} />
                </div>)
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(App);

