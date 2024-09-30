import React from 'react';
import ReservationForm from './components/ReservationForm';
import MenuList from './components/MenuList';

function App() {
  return (
    <div className="App">
      <h1>Our Restaurant</h1>
      <MenuList />
      <h2>Make a Reservation</h2>
      <ReservationForm />
    </div>
  );
}

export default App;