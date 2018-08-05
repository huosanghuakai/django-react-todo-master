import React, {Component} from 'react';
import Card from './Card';
import PropTypes from 'prop-types';


class List extends Component{
	render() {
		let cards =this.props.cards.map((card) =>{
			return <Card key={card.id}
					taskCallbacks={this.props.taskCallbacks}
					id={card.id} 
					tittle={card.tittle}
					color={card.color}
					description={card.description} 
					tasks={card.tasks}/>
		});

		return (
			<div className='list'>
				<h1>{this.props.tittle}</h1>
				{cards}
			</div>
		);
	}
}
List.propTypes = {
  tittle: PropTypes.string.isRequired,
  cards:PropTypes.arrayOf(PropTypes.object),
  taskCallbacks:PropTypes.object,
}
export default List;
