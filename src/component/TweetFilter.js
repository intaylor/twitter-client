/**
 * Created by TaylorWei on 2020-04-12.
 */
import React from "react";
import { connect } from "react-redux";
import { fetchTweetsFiltered } from "./../action/tweetActions";
import { bindActionCreators } from 'redux'

class FilterTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "" };
        console.log('filter props: ');
        console.log(this.props);
    }

    filterInput = text => {
        this.setState({text});
    };

    handleFilter = () => {
        //this.props.updateHandleInParent(this.state.input);
        this.props.onFilter(this.state.text);
    console.log('filter props: ');
    console.log(this.props);
        this.props.dispatch(fetchTweetsFiltered(this.state.text))
        this.setState({ text: "" });
    };

    render() {
        return (
            <div>
                <input className="handle" onChange={e => this.filterInput(e.target.value)}
                    value={this.state.text} />
                <button className="search" onClick={this.handleFilter}>
                    Filter
                </button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    let actions = bindActionCreators({ fetchTweetsFiltered });
    return { ...actions, dispatch };
}

export default connect(null, mapDispatchToProps)(FilterTweet);