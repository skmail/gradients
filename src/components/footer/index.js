import React from 'react'
import './style.css'

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" style={{marginTop: 50, padding: '1.5rem'}}>
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <strong>CSS Gears</strong> by Solaiman Kmail.
            </p>
            <p>
              <a href="https://twitter.com/SolaimanKmail" className="twitter" rel="noopener noreferrer" target="_blank"><i
                className="fa fa-twitter" /> </a>
              <a href="https://github.com/skmail" className="github" rel="noopener noreferrer" target="_blank"><i
                className="fa fa-github"/> </a>
            </p>
          </div>
        </div>
      </footer>
    )
  }
}