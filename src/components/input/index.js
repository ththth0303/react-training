import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
            isCreating: false,
            err: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    getValue() {
        return this.state.value;
    }

    cancel() {
        this.setState({value: '', err: false, isCreating: false});
    }

    checkEnter(e) {
        if (e.keyCode === 13) {
            this.props.addTodo(this.getValue());
        }
    }

    render () {
        if(this.state.isCreating) {
            return (
                <div id="content">
                    <input className="form-control" autoFocus onChange={this.handleChange} value={this.state.value} ref={(c) => {this.todo = c;}} onKeyUp={(e) => this.checkEnter(e)} focus></input>
                    <button className="btn btn-primary" onClick={() => this.props.addTodo(this.getValue())}>Save</button>
                    <button className="btn btn-warning" onClick={() => this.cancel()}>Cancel</button>
                    {this.state.err ? <span>không được để trống</span> : null}
                </div>
            )
        }
        return (
            <div id="content">
                <button className="btn btn-primary" onClick={() => this.setState({isCreating: true}) } onChange={this.handleChange}>New User</button>
            </div>
        )
    }
}
