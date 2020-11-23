import React from 'react';
import Table from 'react-bootstrap/Table';
import Performance from './performance';
import Graph from './graph';
import Row from 'react-bootstrap/Row';

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
        obj[id] = {...obj[id],
          budget: adBudget ? adBudget.budget : '',
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
  }

  render() {
      return this.state.data.map((val, index) => 
        (
          <Row key={index}>
            <Table className="board" bordered responsive>
              <thead>
                <tr>
                  <th colSpan="2" style={{fontSize: '22px'}}>AD_ID: {Object.keys(val)}</th>
                </tr>
                {/* <tr>
                  <th>Performance</th>
                  <th>Graph</th>
                </tr> */}
              </thead>
              <tbody>
                <tr>
                  <td style={{ maxWidth: "500px" }}><Performance data={val[Object.keys(val)[0]]}/></td>
                  <td style={{ minWidth: "500px" }}><Graph data={val[Object.keys(val)[0]]}/></td>
                </tr>
              </tbody>
            </Table>
          </Row>
        )
      )
  }
}

export default Board;

// get ad-insights (spend, revenue, impressions, clicks)
async function getAdInsights(d, m) {
  try {
    var date = encodeURIComponent(d);
    var metrics = encodeURIComponent(m);
    let res = await fetch(`https://interview-api.sbly.com/ad-insights?date=${date}&metrics=${metrics}`, { 
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

// get ad budget
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