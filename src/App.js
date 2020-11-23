import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Board from './components/board';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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