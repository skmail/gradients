import React from 'react'
import ReactDOM from 'react-dom'

export default (WrappedComponent) => (
  class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        focused: false
      };
      this.handleClickOutside = this.handleClickOutside.bind(this)
      this.handleClickInside = this.handleClickInside.bind(this)
    }

    render() {
      return <WrappedComponent {...this.props} focused={this.state.focused}/>
    }

    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside);
      document.addEventListener('click', this.handleClickInside);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
      document.removeEventListener('click', this.handleClickInside);
    }

    handleClickOutside(event) {
      const domNode = ReactDOM.findDOMNode(this);
      if ((!domNode || !domNode.contains(event.target)) && this.state.focused === true) {
        this.setState({
          focused: false
        });
      }
    }

    handleClickInside(event) {
      const domNode = ReactDOM.findDOMNode(this);
      if (domNode && domNode.contains(event.target) && this.state.focused === false) {
        this.setState({
          focused: true
        });
      }
    }
  }
)