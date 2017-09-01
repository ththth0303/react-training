import React from 'react'

export default class App extends React.Component {

    render () {
    
        return (
            <div id="content">
                <button className="btn" onClick={() => this.props.onClick('SHOW_ALL')}>All</button>
                <button className="btn" onClick={() => this.props.onClick('SHOW_ACTIVE')}>Todo</button>
                <button className="btn" onClick={() => this.props.onClick('SHOW_COMPLETED')}>Complete</button>
            </div>
        )
    }
}