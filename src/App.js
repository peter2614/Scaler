import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';


class Performance extends React.Component {
  render() {
    return (
      <div>Performance Here</div>
    )
  }
}

class Graph extends React.Component {
  
}

class Board extends React.Component {
  render() {
    return (
      <Container>
        <Row style={{justifyContent: "center", paddingBottom: "20px"}}>
          <h1>Scaler</h1>
        </Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>AD_ID</th>
                <th>Performance</th>
                <th>Graph</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td><Performance /></td>
                <td></td>
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

async function getAdInsights() {
  try {
    encodeURIComponent();
    let res = await fetch('https://interview-api.sbly.com', { method: 'get' });
    let data = await res.json();
  }
  catch(err) {console.log(err);}
}