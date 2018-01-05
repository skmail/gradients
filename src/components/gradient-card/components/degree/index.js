import React from 'react'
import './style.css'

export default class Degree extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      degrees: [
        {
          degree:135,
        },
        {
          degree:0
        },
        {
          degree:45
        },
        {
          degree:180
        }
      ]
    }
  }

  render() {
    return (
      <div className="color-card--degrees">
        <button className="color-card--button color-card--rotate "><i className="fa fa-repeat"/></button>
        {
          this.state.degrees.map((degree, index) => <div className="color-card--button" style={{
          }}><i className="fa fa-arrow-circle-left"/></div>)
        }
      </div>
    )
  }

}