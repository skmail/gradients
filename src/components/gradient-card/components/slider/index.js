import React from 'react'


export default class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.sliderHandles = [];
  }

  render() {
    const {background, colors} = this.props;
    return (
      <div ref="slider" className="gradient-slider" style={{background}}>
        {
          colors.map((color, index) => {
            return (
              <div
                key={index}
                ref={(ref) => this.sliderHandles.push(ref)}
                className="gradient-slider--handle"
                style={{
                  background: color.color,
                  left: `${parseInt(color.position * 100, 10)}%`
                }}/>
            )
          })
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.colors.forEach((color, index) => {
      const handle = this.sliderHandles[index];
      this.handleEvents(handle, index);
    });
  }

  handleEvents(element, index) {
    let onMouseDown = (e) => {
      const sliderBounds = this.refs.slider.getBoundingClientRect();
      const bounds = element.getBoundingClientRect();
      const max = sliderBounds.width - bounds.width;
      const drag = (e) => {
        e.preventDefault();
        let x = (e.pageX - sliderBounds.left - (bounds.width / 2));
        if (x < 0) {
          x = 0
        } else if (x > max) {
          x = max
        }
        const position = x / max;
        this.props.onChange(index, position)
      };
      const up = () => {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mousemove', up);
      };
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', up);
    };
    onMouseDown = onMouseDown.bind(this);
    element.addEventListener('mousedown', onMouseDown);
  }

}