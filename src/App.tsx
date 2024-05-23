
import './App.css'
import Chat from './components/jobs/Chat';
import LineGraph from './components/jobs/LineGraph';
import MainTable from './components/jobs/MainTable';

function App() {


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center p-4">Main Table</h1>
      <MainTable />
      <h1 className="text-2xl font-bold mt-8 mb-4 text-center p-4">Number of Jobs Over Time</h1>
      <LineGraph />

      <div className='p-4'>
        <h1 className="text-2xl font-bold mb-4 text-center p-4">Chat-Bot</h1>
        <Chat />
      </div>
    </div>
  );

}

export default App
