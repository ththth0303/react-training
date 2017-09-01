import React from 'react';
import Item from './item';
import Filter from '../filter';
import Input from '../input';
import _map from 'lodash/map';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id: 1, name: 'Test todo 1', completed: false},
                {id: 2, name: 'Test todo 2', completed: false},
                {id: 3, name: 'Test todo 3', completed: true},
                {id: 4, name: 'Test todo 4', completed: false},
                {id: 5, name: 'Test todo 5', completed: false},
                {id: 6, name: 'Test todo 6', completed: true},
                {id: 7, name: 'Test todo 7', completed: false}
            ],
            filter: 'SHOW_ALL',
            value: ''
        }
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }
    onChangeFilter(filter) {
        this.setState({filter: filter});
    }

    filterTodo() {
        const {todos, filter} = this.state;

        switch (filter) {
            case 'SHOW_ALL':
                return todos
            case 'SHOW_COMPLETED':
                return todos.filter(t => t.completed)
            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.completed)
        }
    }

    addTodo(e) {
        const todos = this.state.todos;
        let ids = _map(todos, 'id');
        let max = Math.max(...ids);
        todos.push({
            id: max+1,
            name: e,
            completed: false
        });
        this.setState({todos});
        this.todo.setState({value: ''});
    }

    render () {

        return (
            <div>
                <Filter onClick={this.onChangeFilter}/>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                     </tr>
                    {this.filterTodo().map((item) =>
                        <Item id={item.id} name={item.name} key={item.id}/>
                    )}
                </table>
                <Input addTodo={this.addTodo} value={this.state.value} ref={(c) => {this.todo = c;}}/>
            </div>    
        )
    }
}