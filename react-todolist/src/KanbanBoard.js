import React, {Component} from 'react';
import List from './List';
import PropTypes from 'prop-types';

class KanbanBoard extends Component{
	render() {
		return (
			<div className="app">
				<List id='todo' tittle="TO DO" taskCallbacks={this.props.taskCallbacks}
					cards={
					this.props.cards.filter((card) =>card.status==='todo')
				} cardCallbacks={this.props.cardCallbacks}/>
				<List id='in-progress' tittle="In Progress" taskCallbacks={this.props.taskCallbacks}
					cards={
					this.props.cards.filter((card) =>card.status==='in-progress')
				} cardCallbacks={this.props.cardCallbacks}/>
				<List id='done' tittle="Done" taskCallbacks={this.props.taskCallbacks}
					cards={
					this.props.cards.filter((card) =>card.status==='done')
				} cardCallbacks={this.props.cardCallbacks}/>
			</div>
		);
	}		
}
KanbanBoard.propTypes = {
	  cards: PropTypes.arrayOf(PropTypes.object),
	  taskCallbacks:PropTypes.object,
}
export default KanbanBoard;