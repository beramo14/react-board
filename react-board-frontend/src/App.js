import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Write from './pages/Write';
import List from './pages/List';
import Detail from './pages/Detail';
import Modify from './pages/Modify';
import styled from 'styled-components';

let MainWrapper = styled.div`
  width: 80%;
  min-width: 600px;
  margin: 10px auto;
`;

function App() {
  return (
    <div className="App">
      <Header/>
      <MainWrapper>
        <Routes>
          <Route path='/' element={<List/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/write' element={<Write/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/modify/:id' element={<Modify/>}/>
        </Routes>
      </MainWrapper>
    </div>
  );
}

export default App;
