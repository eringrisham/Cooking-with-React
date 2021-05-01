import React from 'react';
import { Component } from 'react';
import { ThemeContext } from './App';

export default class Counter extends Component {
	constructor(props) {
		super(props)

		this.state = {
			count: props.initialCount
		}
	}

  render() {
		console.log('Render Counter');
		return (
			<ThemeContext.Consumer>
				{(style) => {
					return (
					  <div>
							<button style={style} onClick={() => { this.changeCount(-1) }}>-</button>
							<span>{this.state.count}</span>
							<button style={style} onClick={() => { this.changeCount(1) }}>+</button>
            </div>
					)
				}}
			</ThemeContext.Consumer>
		)
	}

	changeCount(amount) {
		this.setState( prevState => {
      return { count: prevState.count + amount }
		})
	}
}