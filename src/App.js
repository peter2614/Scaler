import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import './App.css';

// Canvas library
import CanvasJSReact from './lib/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Performance extends React.Component {
  render() {
    return (
      <Table bordered responsive>
        <thead>
          <tr>
            <th></th>
            <th>2020-01-01</th>
            <th>2020-01-02</th>
            <th>2020-01-03</th>
            <th>2020-01-04</th>
            <th>2020-01-05</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Profit Margin</td>
            <td>
              {this.props.data ? calculateProfitMargin(this.props.data['2020-01-01'].revenue, this.props.data['2020-01-01'].spend) : ''}
            </td>
            <td>
              {this.props.data ? calculateProfitMargin(this.props.data['2020-01-02'].revenue, this.props.data['2020-01-02'].spend) : ''}
            </td>
            <td>
              {this.props.data ? calculateProfitMargin(this.props.data['2020-01-03'].revenue, this.props.data['2020-01-03'].spend) : ''}
            </td>
            <td>
              {this.props.data ? calculateProfitMargin(this.props.data['2020-01-04'].revenue, this.props.data['2020-01-04'].spend) : ''}
            </td>
            <td>
              {this.props.data ? calculateProfitMargin(this.props.data['2020-01-05'].revenue, this.props.data['2020-01-05'].spend) : ''}
            </td>
          </tr>
          <tr>
            <td>Weighted Profit Margin</td>
            <td>
              {this.props.data ? calculateWeightedProfitMargin(this.props.data['2020-01-01'].spend, 4) : ''}
            </td>
            <td>
              {this.props.data ? calculateWeightedProfitMargin(this.props.data['2020-01-02'].spend, 3) : ''}
            </td>
            <td>
              {this.props.data ? calculateWeightedProfitMargin(this.props.data['2020-01-03'].spend, 2) : ''}
            </td>
            <td>
              {this.props.data ? calculateWeightedProfitMargin(this.props.data['2020-01-04'].spend, 1) : ''}
            </td>
            <td>
              {this.props.data ? calculateWeightedProfitMargin(this.props.data['2020-01-05'].spend, 0) : ''}
            </td>
          </tr>
          <tr>
            <td>Click Rate</td>
            <td>
              {this.props.data ? clickRate(this.props.data['2020-01-01'].impressions, this.props.data['2020-01-01'].clicks) : ''}
            </td>
            <td>
              {this.props.data ? clickRate(this.props.data['2020-01-02'].impressions, this.props.data['2020-01-02'].clicks) : ''}
            </td>
            <td>
              {this.props.data ? clickRate(this.props.data['2020-01-03'].impressions, this.props.data['2020-01-03'].clicks) : ''}
            </td>
            <td>
              {this.props.data ? clickRate(this.props.data['2020-01-04'].impressions, this.props.data['2020-01-04'].clicks) : ''}
            </td>
            <td>
              {this.props.data ? clickRate(this.props.data['2020-01-05'].impressions, this.props.data['2020-01-05'].clicks) : ''}
            </td>
          </tr>
          <tr>
            <td>Current Budget</td>
            <td colSpan="5">
              {this.props.data ? this.props.data.budget : ''}
            </td>
          </tr>
          <tr>
            <td>Proposed Budget</td>
            <td colSpan="5">
              {this.props.data ? recommendedBudget(this.props.data, this.props.data.budget) : ''}
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

class Graph extends React.Component {
  
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title:{
        text: "Bounce Rate by Week of Year"
      },
      axisY: {
        title: "Bounce Rate",
        suffix: "%"
      },
      axisX: {
        title: "Week of Year",
        prefix: "W",
        interval: 2
      },
      data: [{
        type: "line",
        toolTipContent: "Week {x}: {y}%",
        dataPoints: [
          { x: 1, y: 64 },
          { x: 2, y: 61 },
          { x: 3, y: 64 },
          { x: 4, y: 62 },
          { x: 5, y: 64 },
          { x: 6, y: 60 },
          { x: 7, y: 58 },
          { x: 8, y: 59 },
          { x: 9, y: 53 },
          { x: 10, y: 54 },
          { x: 11, y: 61 },
          { x: 12, y: 60 },
          { x: 13, y: 55 },
          { x: 14, y: 60 },
          { x: 15, y: 56 },
          { x: 16, y: 60 },
          { x: 17, y: 59.5 },
          { x: 18, y: 63 },
          { x: 19, y: 58 },
          { x: 20, y: 54 },
          { x: 21, y: 59 },
          { x: 22, y: 64 },
          { x: 23, y: 59 }
        ]
      }]
    }
    return (
      <div>
        <CanvasJSChart options = {options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
      );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        /*
          id: {
            budget: 10,
            2020-01-01: { ... },
            2020-01-02: { ... },
            2020-01-03: { ... },
            2020-01-04: { ... },
            2020-01-05: { ... },
          },
          id2: { ... }
        */
      ]
    };
  }

  async componentDidMount() {
    const dates = ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05'];
    var newData = [];
    var obj = {};

    for(let i=0; i<dates.length; i++) {
      let data = await getAdInsights(dates[i], 'spend,revenue,impressions,clicks');
      
      for(let j=0; j<data.length; j++) {
        var id = data[j].id;
        var adBudget = await getAdBudget(id);
        var date = dates[i];
        // var dateObj = {};
        obj[id] = {...obj[id],
          budget: adBudget.budget,
          [date]: {
            spend: data[j].spend,
            revenue: data[j].revenue,
            impressions: data[j].impressions,
            clicks: data[j].clicks
          }
        };
      }

    }
    for(var key in obj) {
      var temp = {};
      if(obj.hasOwnProperty(key)) {
        temp[key] = obj[key];
        newData.push(temp);
      }
    }

    this.setState({
      data: newData
    })
    console.log(this.state.data)
  }

  render() {
      return this.state.data.map((val, index) => 
        (
          <Row>
            <Table className="board" bordered responsive>
              <thead>
                <tr>
                  <th key={index} colSpan="2">AD_ID: {Object.keys(val)}</th>
                </tr>
                <tr>
                  <th>Performance</th>
                  <th>Graph</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ maxWidth: "500px" }}><Performance data={val[Object.keys(val)[0]]}/></td>
                  <td style={{ minWidth: "500px" }}><Graph data={val}/></td>
                </tr>
              </tbody>
            </Table>
          </Row>
        )
      )
    
  }
}

function App() {
  return (
    <div className="App">
      <Container>
        <Row style={{justifyContent: "center", paddingBottom: "20px"}}>
          <h1>Scaler</h1>
        </Row>
        <Board />
      </Container>
    </div>
  );
}

export default App;

async function getAdInsights(d, m) {
  try {
    var date = encodeURIComponent(d);
    var metrics = encodeURIComponent(m);
    let res = await fetch('https://interview-api.sbly.com/ad-insights?' + `date=${date}&metrics=${metrics}`, { 
      method: 'get',
      headers: new Headers({
        'Authorization': 'SHAREABLY_SECRET_TOKEN'
      })
    });
    let data = await res.json();
    return data;
  }
  catch(err) {console.log(err);}
}

async function getAdBudget(id) {
  try {
    const AD_ID = encodeURIComponent(id);
    let res = await fetch(`https://interview-api.sbly.com/ad/${AD_ID}`, { 
      method: 'get',
      headers: new Headers({
        'Authorization': 'SHAREABLY_SECRET_TOKEN'
      })
    });
    let data = await res.json();
    return data;
  }
  catch(err) {console.log(err);}
}

function calculateProfitMargin(revenue, spend) {
  var num = (revenue-spend)/revenue;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculateWeightedProfitMargin(spend, days) {
  // spend * (Math.pow(0.5, days from most recent performance))
  var num = spend * Math.pow(0.5, days);
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function recommendedBudget(data, budget) {
  var avgProfit = (
    calculateWeightedProfitMargin(data['2020-01-01'].spend, 4) +
    calculateWeightedProfitMargin(data['2020-01-02'].spend, 3) +
    calculateWeightedProfitMargin(data['2020-01-03'].spend, 2) +
    calculateWeightedProfitMargin(data['2020-01-04'].spend, 1) +
    calculateWeightedProfitMargin(data['2020-01-05'].spend, 0)
  ) / 5;
  var num = (1 + avgProfit) * budget;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function clickRate(impressions, clicks) {
  var num = clicks/impressions*100;
  return Math.round((num + Number.EPSILON) * 100) / 100 + "%";
}