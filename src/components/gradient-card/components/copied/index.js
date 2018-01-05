import React from 'react';

import './style.css';

export default ({active = false}) => (
  <div className={`css-copied ${active ? 'show' : ''}`}>
    <i className="fa fa-clipboard"/>
    <span>Copied</span>
  </div>
)