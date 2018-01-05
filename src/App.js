import React, {Component} from 'react';

import './App.css';
import GradientCard from "./components/gradient-card";
import Footer from "./components/footer/index";

const makeGradientObject = (colors) => {
  return {
    colors: colors.map((color, position) => ({
      color,
      position: position / (colors.length - 1),
    })),
  };
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      gradients: [
        makeGradientObject(['#fcdf8a', '#f38381']),
        makeGradientObject(['#f54ea2', '#ff7676']),
        makeGradientObject(['#17ead9', '#6078ea']),
        makeGradientObject(['#622774', '#c53364']),
        makeGradientObject(['#7117ea', '#ea6060']),
        makeGradientObject(['#42e695', '#3bb2b8']),
        makeGradientObject(['#f02fc2', '#6094ea']),
        makeGradientObject(['#65799b', '#5e2563']),
        makeGradientObject(['#184e68', '#57ca85']),
        makeGradientObject(['#5b247a', '#1bcedf']),
        makeGradientObject(['#fad961', '#f76b1c']),
        makeGradientObject(['#f2d50f', '#da0641']),
        makeGradientObject(['#F5515F', '#A1051D']),
        makeGradientObject(['#F36265', '#961276']),
        makeGradientObject(['#FF57B9', '#A704FD']),
        makeGradientObject(['#C56CD6', '#3425AF']),
        makeGradientObject(['#13f1fc', '#0470dc']),
        makeGradientObject(['#0FF0B3', '#036ED9']),
        makeGradientObject(['#c3ec52', '#0ba29d']),
        makeGradientObject(['#b1ea4d', '#459522']),
        makeGradientObject(['#DFEC51', '#73AA0A']),
        makeGradientObject(['#E3E3E3', '#5D6874']),
      ]
    };
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div>
        <div className="App">
          {
            this.state.gradients.map((gradient, index) => (
              <GradientCard
                gradient={gradient}
                key={index}
                onChange={(gradient) => this.onChange(index, gradient)}/>
            ))
          }
        </div>
        <Footer/>
      </div>
    );
  }

  onChange(index, result) {
    this.setState({
      gradients: this.state.gradients.map((gradient, gradientIndex) => {
        if (index === gradientIndex) {
          return {
            ...gradient,
            colors: [
              ...result
            ]
          };
        }
        return gradient
      })
    })
  }
}

export default App;
