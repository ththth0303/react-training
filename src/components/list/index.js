import React from 'react';
import Item from './item';
import Filter from '../filter';
import Input from '../input';
import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';
import './list.scss';

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
            value: '',
            edit: null
        }
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.editItem = this.editItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChangeFilter(filter) {
        this.setState({filter: filter, edit: null});
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
        if (e) {
            const todos = this.state.todos;
            let ids = _map(todos, 'id');
            let max = Math.max(...ids);
            todos.push({
                id: max+1,
                name: e,
                completed: false
            });
            this.setState({todos});
            this.todo.setState({value: '', err:false, isCreating: false});

        } else {
            this.todo.setState({err: true});
        }
    }

    deleteTodo(id) {
        const todos = this.state.todos;
        let filter = todos.filter(t => t.id !== id);
        this.setState({todos: filter});
    }

    changeStatus(id) {
        const todos = this.state.todos;
        let index = _findIndex(todos, {id});
        if (index !== -1) {
            let todo = todos[index];
            todo.completed = !todo.completed;
            todos[index] = todo;
            this.setState({todos});
        }
    }

    editItem(item) {
        this.setState({edit: item.id});
    }

    updateItem (id, text, e) {

            const todos = this.state.todos;
            let index = _findIndex(todos, {id});
            if (index !== -1) {
                let todo = todos[index];
                todo.name = text;
                todos[index] = todo;
                this.setState({todos});
                if (e.keyCode === 13) {
                    this.onBlur();
                }
            }
    }

    onBlur () {
        this.setState({edit: null})
    }

    render () {

        return (
            <div className="content">
                <Filter onClick={this.onChangeFilter} filter={this.state.filter}/>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className="name">Name</th>
                            <th>Completed</th>
                            <th colSpan="2">Action</th>
                         </tr>
                    </thead>
                    <tbody>
                        {this.filterTodo().length ? this.filterTodo().map((item) =>
                            <Item item={item} key={item.id} delete={() => this.deleteTodo(item.id)} changeStatus={this.changeStatus} editing={this.state.edit == item.id} ref={(c) => {this.item = c;}} editItem={this.editItem} updateItem={this.updateItem} onBlur={this.onBlur}/>
                        ) : <tr><td colSpan="4">No Data</td></tr>}
                    </tbody>
                </table>
                <Input addTodo={this.addTodo} value={this.state.value} ref={(c) => {this.todo = c;}}/>
            </div>
        )
    }
}
