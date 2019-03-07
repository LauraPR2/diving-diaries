import React, { Component } from 'react';

// Definition of the component Rating
class Rating extends Component {


  starClicked = (starNumber) => {
    if (this.props.onUpdated) {
      this.props.onUpdated(starNumber)
    }
  }

  render() {
    let n = this.props.children
    return (
      <div className="">
        <span onClick={() => this.starClicked(1)}>{n >= 0.5 ? '★' : '☆'}
        </span>
        <span onClick={() => this.starClicked(2)}>{n >= 1.5 ? '★' : '☆'}
        </span>
        <span onClick={() => this.starClicked(3)}>{n >= 2.5 ? '★' : '☆'}
        </span>
        <span onClick={() => this.starClicked(4)}>{n >= 3.5 ? '★' : '☆'}
        </span>
        <span onClick={() => this.starClicked(5)}>{n >= 4.5 ? '★' : '☆'}
        </span>
      </div>
    );
  }
}

export default Rating;