/**
 * Created by TaylorWei on 2020-04-12.
 */
import React from "react";
import { connect } from "react-redux";
import { fetchTweets } from "./../action/tweetActions";
import { bindActionCreators } from 'redux'

class SearchTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: "" };
    }

    updateInput = input => {
        this.setState({input});
    };

    handleSearch = () => {
        //this.props.updateHandleInParent(this.state.input);
        this.props.onUpdate(this.state.input);
        this.props.dispatch(fetchTweets(this.state.input))
        this.setState({ input: "" });
    };

    render() {
        return (
            <div>
                <input className="handle" onChange={e => this.updateInput(e.target.value)}
                    value={this.state.input} />
                <button className="search" onClick={this.handleSearch}>
                    Search
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    handle: state.tweets.handle
});

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({ fetchTweets });
    return { ...actions, dispatch };
}

export default connect(null, mapDispatchToProps)(SearchTweet);