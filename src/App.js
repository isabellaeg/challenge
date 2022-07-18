import './App.css';
import Spreadsheet from './components/Spreadsheet/Spreadsheet';

function App() {
  return (
    <div className="App">
      <Spreadsheet rows={10} columns={10} />
    </div>
  );
}

export default App;
