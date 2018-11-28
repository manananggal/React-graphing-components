import React, { Component } from 'react';
import './BarChart.css';

class BarChart extends Component {
  render() {
    return (
      <div className="BarChart">
        {
          this.props.ratesArray.map((item) => (
            <div key={item.currency} className="BarChart-bar" style={{height: item.barHeight + '%'}}>
              <div className="BarChart-label">{item.currency}</div>
              <div className="BarChart-label">{item.value}</div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default BarChart;
