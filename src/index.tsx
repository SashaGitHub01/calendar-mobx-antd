import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from "react";
import { RootStore } from './store';

const store = new RootStore();

interface IRootStore {
   store: RootStore
}

export const Context = createContext<IRootStore>({
   store
})

ReactDOM.render(
   <BrowserRouter>
      <Context.Provider value={{ store }}>
         <App />
      </Context.Provider>
   </BrowserRouter>,
   document.getElementById('root')
);


reportWebVitals();
