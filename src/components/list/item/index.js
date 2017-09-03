import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.editing) {
            this.state = {
            value: props.item.name,
        }}
        this.handelChange = this.handelChange.bind(this);
    }

    handelChange(e) {
        console.log(e);
        this.setState({value: e.target.value});
        console.log(e.target.value);
    }

    moveCusorEnd(e) {
        let temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }

    render () {
        return (
            <tr>
                <td>{this.props.item.id}</td>
                {!this.props.editing ? <td onDoubleClick={() => this.props.editItem(this.props.item)} ><span className="name">{this.props.item.name}</span></td> : <td><input onFocus={this.moveCusorEnd} autoFocus className="form-control input" value={this.state.value} onChange={this.handelChange} onKeyUp={(e) => this.props.updateItem(this.props.item.id, this.state.value, e)} onBlur={() => this.props.onBlur()}/></td>}
                {this.props.item.completed ? <td onClick={() => this.props.changeStatus(this.props.item.id)}><a className="label label-success">Completed</a></td> : <td onClick={() => this.props.changeStatus(this.props.item.id)}><a className="label label-info">Inproccess</a></td> }
                <td><a onClick={() => this.props.editItem(this.props.item)} className="label label-warning">Sửa</a></td>
                <td><a onClick={this.props.delete} className="label label-danger">Xóa</a></td>
            </tr>

        )
    }
}
