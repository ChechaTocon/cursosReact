import React, {Component} from 'react'
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import Cursos from './Cursos';
import Agregar from './AgregarCurso';

const client= new ApolloClient({
  uri:'http://127.0.0.1:8000/graphql'
});

//se crea una nueva instancia del clinete con apollo provider
const App=()=>(
  <ApolloProvider client={client}> 
  <br></br>
  <div className="container">
    <div>
      <Agregar/>
    </div>
    <br></br>
    <div>
      <Cursos/>
    </div>
    </div>
  </ApolloProvider>
)

export default App;
