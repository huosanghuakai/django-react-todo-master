import React, {Component} from 'react';
import CheckList from './CheckList';
import PropTypes from 'prop-types';
import marked from 'marked';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

let tittlePropType=(props,propName,componentName)=>{
	if(props[propName]){
		let value=props[propName];
		if(typeof value!=='string'||value.length>80){
			return new Error(
				'${propName} in ${componentName} is longer than 80 characters.'
				);
		}
	}
}

class Card extends Component{
	constructor() {
	    super(...arguments);
	    this.state = {
	      showDetails:false
	    };
	}

	toggleDetials(){
		this.setState({showDetails:!this.state.showDetails});
	}

	render() {
		let cardDetails;
		if(this.state.showDetails){
			cardDetails=(
				<div className='card_details'>
					<span dangerouslySetInnerHTML={{
						__html:marked(this.props.description)
					}}/>
					<CheckList cardId={this.props.id} tasks={this.props.tasks} 
						taskCallbacks={this.props.taskCallbacks}
					/>
				</div>
			)
		}
		let sideColor={
			position:'absolute',
			zIndex:-1,
			top:0,
			bottom:0,
			left:0,
			width:7,
			backgroundColor:this.props.color
		}
		return (
			<div className='card'>
				<div style={sideColor}/>
				{/*band(this)函数将函数绑定到上下文*/}
				<div className={this.state.showDetails?"card_tittle card_tittle--is-open":"card_tittle"} 
					onClick={this.toggleDetials.bind(this)}>
					{this.props.tittle}
				</div>
				<ReactCSSTransitionGroup transitionName='toogle' >
					{cardDetails}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}
Card.propTypes = {
  id: PropTypes.number,
  tittle:tittlePropType,
  description:PropTypes.string,
  color:PropTypes.string,
  tasks:PropTypes.array,
  taskCallbacks:PropTypes.object,
}

export default Card;