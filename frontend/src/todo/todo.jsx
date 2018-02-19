import React, { Component} from 'react'
import Axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
	constructor(props){
		super()
		this.state = { description: "", list: [] }

		this.handleAdd = this.handleAdd.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
		this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleClear = this.handleClear.bind(this);

		this.refresh()
	}

	refresh(description = ''){
		console.log('aqui')
		const search = description ? `&description__regex=/${description}/` : ''
		Axios.get(`${URL}?sort=-createdAt${search}`).then(
			resp => this.setState({...this.setState, description, list: resp.data })
		)
	}

	handleRemove(todo){
		Axios.delete(`${URL}/${todo._id}`).then(
			() => this.refresh(this.state.description)
		)
	}

	handleSearch(todo){
		this.refresh(this.state.description)
	}

	handleClear(){
		this.refresh()
	}

	handleMarkAsDone(todo){
		Axios.put(`${URL}/${todo._id}`, { ...todo, done: true }).then(
			() => this.refresh(this.state.description)
		)
	}

	handleMarkAsPending(todo){
		Axios.put(`${URL}/${todo._id}`, { ...todo, done: false }).then(
			() => this.refresh(this.state.description)
		)
	}

	handleAdd() {
		const description = this.state.description
		Axios.post(URL, { description }).then(
			resp => this.refresh()
		)
	}

	handleChange(e) {
		this.setState({...this.state, description: e.target.value})
	}

	render(){
		return (
			<div>
				<PageHeader name="Tarefas" small="Cadastro" />
				<TodoForm 
					handleAdd={this.handleAdd} 
					handleChange={this.handleChange}
					handleSearch={this.handleSearch}
					handleClear={this.handleClear}
					description={this.state.description} />
				<TodoList 
					list={this.state.list} 
					handleRemove={this.handleRemove} 
					handleMarkAsDone={this.handleMarkAsDone} 
					handleMarkAsPending={this.handleMarkAsPending} />
			</div>
		)
	}
}
