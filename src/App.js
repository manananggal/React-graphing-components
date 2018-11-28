import React, { Component } from 'react';
import BarChart from './components/BarChart/BarChart.js';
import Button from './components/Button/Button.js';
import './App.css';

class App extends Component {
  state = {
    ratesArray: [],
  }

  dataFetch = (baseCurrency = 'EUR') => {
    fetch(`https://api.exchangeratesapi.io/latest?symbols=AUD,BRL,CAD,CHF,GBP&base=${baseCurrency}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          currencyData: responseJson,
        });
        this.rateLoop();
      });
  }

  // Loop through JSON response and create an array of rates
  rateLoop = () => {
    const rates = this.state.currencyData.rates;

    // Get max value of rates, to use as bar height ratio
    const ratesValuesArray = Object.values(rates);
    const maxRate = Math.max(...ratesValuesArray);

    let ratesArray = [];

    // Create rates as objects
    for (const key in rates) {
      const rateObj = {};
      const val = rates[key];
      const bar = (val / maxRate) * 100;
      rateObj.currency = key;
      rateObj.value = val;
      rateObj.barHeight = bar;
      ratesArray.push(rateObj);
    }

    this.setState({
      ratesArray: ratesArray,
    });
  }

  componentDidMount() {
    this.dataFetch();
  }

  render() {
    return (
      <div className="App">
        <section className="SelectorSection">
          <h1>Exchange Rates</h1>
          <h3>Select a base currency:</h3>
          <div className="SelectorContainer">
            <div className="SelectorButtonsContainer">
              <Button onClick={() => this.dataFetch('EUR')}>EUR</Button>
              <Button onClick={() => this.dataFetch('USD')}>USD</Button>
            </div>
          </div>
        </section>

        <BarChart ratesArray={this.state.ratesArray} />
      </div>
    );
  }
}

export default App;
