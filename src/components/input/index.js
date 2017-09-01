import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    getValue() {
        return this.state.value;
    }

    render () {
        if(this.state.isCreating) {
            return (
                <div id="content">
                    <input className="name" paclehodel="new user" onChange={this.handleChange} value={this.state.value} ref={(c) => {this.todo = c;}}></input>
                    <button className="btn" onClick={() => this.props.addTodo(this.getValue())}>Save</button>
                    <button className="btn" onClick={() => this.setState({isCreating: false})}>Cancel</button>
                </div>
            )
        }
        return (
            <div id="content">
                <button className="btn" onClick={() => this.setState({isCreating: true}) } onChange={this.handleChange}>New User</button>
            </div>
        )
    }
}