import React from 'react';
import {SketchPicker} from 'react-color';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import clickOutside from '../../../click-outside'

class ColorLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      copied: false
    };
    this.toggleActive = this.toggleActive.bind(this)
    this.onCopy = this.onCopy.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const state = {};
    if (nextProps.edit === false) {
      state.active = false;
    }
    if(nextProps.focused === false && this.props.focused === true){
      state.active = false;
    }
    if(Object.keys(state).length > 0){
      this.setState(state)
    }
  }

  render() {
    return (
      <div>
        <div onClick={this.toggleActive}>
          {this.renderCopyToClipboard()}
          {this.renderEditable()}
        </div>
        {this.renderColorPicker()}
      </div>
    )
  }

  renderCopyToClipboard() {
    const {edit, color} = this.props;
    if (edit === false) {
      return (
        <CopyToClipboard
          text={color}
          onCopy={this.onCopy}>
          <div>
            {this.state.copied === false && color}
            {this.state.copied === true && "Copied"}
          </div>
        </CopyToClipboard>
      )
    }
    return null;
  }

  renderEditable() {
    const {edit, color} = this.props;
    if (edit === true) {
      return (
        <div className="editable">
          <span style={{background: color}} className="color-label--color-dot"/> {color}
        </div>
      )
    }
    return null;
  }

  renderColorPicker() {
    const {edit, color, onChange} = this.props;
    const {active} = this.state;
    if (active === true && edit === true) {
      return (
        <div className="color-input-picker">
          <SketchPicker color={color} onChange={(color) => onChange(color.hex)}/>
        </div>
      )
    }
    return null
  }

  toggleActive() {
    if (this.props.edit === true) {
      const active = this.state.active === false;
      this.setState({active})
    }
  }

  onCopy() {
    this.setState({copied: true})
    setTimeout(() => {
      this.setState({copied: false})
    }, 1200)
  }
}

export default clickOutside(ColorLabel);