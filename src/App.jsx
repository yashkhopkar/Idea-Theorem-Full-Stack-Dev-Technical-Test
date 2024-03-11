import RegistrationForm from './components/RegistrationForm';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <div className='container'>
        <RegistrationForm />
      </div>
    </>
  );
}

export default App;
