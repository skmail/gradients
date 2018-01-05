import React, {Component} from 'react';

import Copied from './components/copied'
import clickOutSide from '../click-outside';
import Slider from "./components/slider/index";
import Label from './components/label';
import {colorAtPoint, hex2rgb,getCssGradient} from '../../helpers/color'


import {CopyToClipboard} from 'react-copy-to-clipboard';

import './style.css'


class GradientCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      edit: false,
      originalColors: []
    };
    this.onCopy = this.onCopy.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.focused === false && this.props.focused === true) {
      this.setState({
        edit: false,
        copied: false
      });
    }
  }

  componentDidMount() {
    this.setState({
      originalColors: [...this.props.gradient.colors]
    })
  }

  render() {
    const {gradient} = this.props;
    const {colors} = gradient;

    return (
      <div className="color-card">

        <div className="gradient-box" style={{background: getCssGradient(gradient)}}/>

        <div className="color-card--content">
          <Slider
            background={getCssGradient({
              ...gradient,
              degree:135,
              colors:this.state.originalColors
            })}
            colors={colors}
            onChange={this.onSliderChange}
          />
          <div className="color-names">
            {
              colors.map((color, index) => (
                <Label
                  key={index}
                  onChange={(color) => {
                    this.changeColor(color, index)
                  }}
                  color={colors[index].color}
                  edit={this.state.edit}/>
              ))
            }
          </div>
        </div>

        <Copied active={this.state.copied}/>

        <CopyToClipboard text={`background:${getCssGradient(gradient)};`} onCopy={this.onCopy}>
          <i className="fa fa-css3 copy-to-css color-card--button"/>
        </CopyToClipboard>

        <button
          onClick={this.toggleEdit}
          className="colors-edit color-card--button">
          <i className={`fa ${this.state.edit === true ? 'fa-times' : 'fa-pencil'}`}/>
        </button>

      </div>
    );
  }

  onSliderChange(index, position) {

    const lastColor = this.state.originalColors[this.state.originalColors.length - 1].color;
    const firstColor = this.state.originalColors[0].color;
    const resultColor = colorAtPoint(
      position,
      hex2rgb(lastColor),
      hex2rgb(firstColor)
    );
    this.props.onChange(this.props.gradient.colors.map((color, colorIndex) => {
      if (colorIndex === index) {
        return {
          ...color,
          color: resultColor,
          position
        };
      }
      return color
    }))
  }


  changeColor(resultColor, index) {
    const {colors} = this.props.gradient;
    const result = colors.map((color, colorIndex) => {
      const position = colorIndex / (colors.length - 1);
      if (colorIndex === index) {
        return {
          ...color,
          position,
          color: resultColor
        };
      } else {
        return {
          ...color,
          position
        }
      }
    });
    this.setState({
      originalColors: result
    });
    this.props.onChange(result)
  }

  onCopy() {
    this.setState({copied: true})
    setTimeout(() => {
      this.setState({copied: false})
    }, 1200)
  }

  toggleEdit() {
    this.setState({
      edit: this.state.edit === false
    })
  }
}

export default clickOutSide(GradientCard);
