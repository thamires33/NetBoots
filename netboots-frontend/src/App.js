import React from 'react';
import PreferenceForm from './components/PreferenceForm';
import ProductList from './components/ProductList';

function App() {
  return (
    <div>
      <h1>Shoe Recommendation App</h1>
      <PreferenceForm />
      <ProductList />
    </div>
  );
}

export default App;
