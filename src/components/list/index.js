import React from 'react';
import Item from './item';
import Filter from '../filter';
import Input from '../input';
import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';
import './list.scss';
import {fetchTodoList, createTodo, updateTodo, deleteTodo} from '../api';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
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
        this.addTodoUpdate = this.addTodoUpdate.bind(this);
    }

    componentWillMount() {
        fetchTodoList((response) => {
            this.setState({todos: response.data})
        });
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
        e = {name: e, completed: false};
        createTodo(e, this.addTodoUpdate);
    }

    addTodoUpdate(response) {
            console.log(response);
            let todo = {
                    id: response.data.id,
                    name: response.data.name,
                    completed: response.data.completed,
                }
        const todos = this.state.todos;
            todos.push(todo);
            this.setState({todos});
            this.todo.setState({value: '', err:false, isCreating: false});
    }


    deleteTodo(id) {
        const todos = this.state.todos;
        let filter = todos.filter(t => t.id !== id);
        this.setState({todos: filter});
    }

    // changeStatus(id) {
    //     const todos = this.state.todos;
    //     let index = _findIndex(todos, {id});
    //     if (index !== -1) {
    //         let todo = todos[index];
    //         todo.completed = !todo.completed;
    //         todos[index] = todo;
    //         updateTodo(todo, this.changeStatusUpdate);
    //         // this.setState({todos});
    //     }
    // }

    changeStatusUpdate(response) {
        console.log(response);
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
                            <Item item={item} key={item.id} delete={() => this.deleteTodo(item.id)} changeStatus={this.updateItem} editing={this.state.edit == item.id} ref={(c) => {this.item = c;}} editItem={this.editItem} updateItem={this.updateItem} onBlur={this.onBlur}/>
                        ) : <tr><td colSpan="4">No Data</td></tr>}
                    </tbody>
                </table>
                <Input addTodo={this.addTodo} value={this.state.value} ref={(c) => {this.todo = c;}}/>
            </div>
        )
    }
}
