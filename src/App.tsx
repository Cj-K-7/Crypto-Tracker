import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const App = () => {
  //useState
  const [count, setCount] = useState(0);

  //React Query

  return (
    <div className="App">
      <header className="App-header">
        Hello World
        <hr></hr>
        this is count : {count}
      </header>
      <Container >
        <button onClick={()=>{setCount( count + 1 )}}>+</button>
        <button onClick={()=>{if(count>0){setCount( count - 1 )}}}>-</button>
      </Container>
    </div>
  );
}

export default App;
