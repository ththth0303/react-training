import React from 'react';
import "./filter.scss"

export default class App extends React.Component {

    render () {

        return (
            <div id="content">
                <button className={this.props.filter === "SHOW_ALL" ? "btn btn-success" : "btn"} onClick={() => this.props.onClick('SHOW_ALL')}>All</button>
                <button className={this.props.filter === "SHOW_ACTIVE" ? "btn btn-success" : "btn"} onClick={() => this.props.onClick('SHOW_ACTIVE')}>Todo</button>
                <button className={this.props.filter === "SHOW_COMPLETED" ? "btn btn-success" : "btn"} onClick={() => this.props.onClick('SHOW_COMPLETED')}>Complete</button>
            </div>
        )
    }
}
