import React from 'react';
import './app.scss';
import Input from './components/input';
import List from './components/list';

export default class App extends React.Component {
    
    render () {
        return (
            <div>                
                <List />
            </div>
        )
    }
}
