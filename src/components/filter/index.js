import React from 'react';
import "./filter.scss";

export default class App extends React.Component {

    render () {

        return (
            <div id="content">
                <div className="filter">
                    <button className={this.props.filter === "SHOW_ALL" ? "btn btn-info" : "btn btn-default"} onClick={() => this.props.onClick('SHOW_ALL')}>All</button>
                    <button className={this.props.filter === "SHOW_ACTIVE" ? "btn btn-info" : "btn btn-default"} onClick={() => this.props.onClick('SHOW_ACTIVE')}>Todo</button>
                    <button className={this.props.filter === "SHOW_COMPLETED" ? "btn btn-info" : "btn btn-default"} onClick={() => this.props.onClick('SHOW_COMPLETED')}>Complete</button>
                </div>
                <div className="count">
                    <span onClick={() => this.props.onClick('SHOW_ALL')} className="text-warning">Total: {this.props.count.total}</span>
                    <span onClick={() => this.props.onClick('SHOW_ACTIVE')} className="text-info">Inproccess: {this.props.count.active}</span>
                    <span onClick={() => this.props.onClick('SHOW_COMPLETED')} className="text-success">Complete: {this.props.count.complete}</span>
                </div>
            </div>
        )
    }
}
