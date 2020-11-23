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
            <td>Spend</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Revenue</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Impressions</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Clicks</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Budget</td>
            <td colSpan="5">$10</td>
          </tr>
          <tr>
            <td>New Budget</td>
            <td colSpan="5">$10</td>
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
      data: [{
        /*
          AD_ID,
          spend,
          revenue,
          impressions,
          clicks,
          budget,
          new_budget
        */
      }]
    };
  }

  async componentDidMount() {
    let data = await getAdInsights('2020-01-02', 'spend');
    for(let i=0; i<data.length; i++) {
      var id = data[i].id;
      var adBudget = await getAdBudget(id);
      var dict = {
        id: {

        }
      }
    }
    this.setState({
      data: data
    })
  }

  render() {
    return (
      <Container>
        <Row style={{justifyContent: "center", paddingBottom: "20px"}}>
          <h1>Scaler</h1>
        </Row>
        <Row>
          <Table id="performance" bordered responsive>
            <thead>
              <tr>
                <th>AD_ID</th>
                <th>Performance</th>
                <th>Graph</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ maxWidth: "100px", minWidth: "60px" }}>ID</td>
                <td style={{ maxWidth: "500px", minWidth: "300px" }}><Performance /></td>
                <td style={{ minWidth: "500px" }}><Graph /></td>
              </tr>
            </tbody>
          </Table>
          </Row>
      </Container>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Board />
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
    console.log(data);
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