import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return(
        <div className="container">
            <div class="jumbotron">
            <h1 class="display-4">Bem vindo ao Minha Séries!</h1>
            <p class="lead">Este é um controle de séries assistidas.</p>
            <hr class="my-4"/>        
            <Link class="btn btn-primary btn-lg" to="/series" role="button">Acesse as séries</Link>
            </div>
        </div>
    )
}

export default Home
