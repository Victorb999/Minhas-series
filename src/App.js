import React from 'react'
import {
  BrowserRouter as Router,
  Route,Switch
} from 'react-router-dom'

import './estilao.css'
import Header from './Header'
import Home from './Home'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditaGenero from './EditaGenero'
import Series from './Series'
import NovaSerie from './NovaSerie'
import InfoSerie from './InfoSerie'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/generos' exact component={Generos}/>
        <Route exact path='/generos/novo' component={NovoGenero}/>
        <Route exact path='/generos/:id'  component={EditaGenero}/>

        <Route path='/series' exact component={Series}/>
        <Route exact path='/series/novo' component={NovaSerie}/>
        <Route exact path='/series/:id'  component={InfoSerie}/>
      </Switch>
    </Router>
  );
}

export default App
