import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
            </tr>

        )
    }
}