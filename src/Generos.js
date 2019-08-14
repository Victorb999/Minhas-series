import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import {
    Table,Alert,Button
} from 'reactstrap'
import { Link } from 'react-router-dom'

const Generos = () => {
    const [data,setdata] = useState([])
    useEffect(()=>{
        axios.get('/api/genres')
        .then(res=>{
            setdata(res.data.data)
        })
    },[])

    const deletegenero = id =>{
        axios.delete('/api/genres/'+id)
        .then(res=>{
            const filtrado = data.filter(item => item.id !== id)
            setdata(filtrado)
        })
    }
    
    const renderLinha = registro =>{
        return(
            <tr key={registro.id}>
                <th scope='row'>{registro.id}</th>
                <td>{registro.name}</td>
                <td>
                    <Button onClick={() => deletegenero(registro.id)} color='danger'> Remover </Button> 
                    <Button tag={Link} to={'/generos/'+ registro.id} color='success'> Editar </Button>
                </td>            
            </tr>
        )
    }

    if( data.length===0){
        return(
            <div className='container'>
            <Button color='primary' tag={Link} to="/generos/novo">Novo gênero</Button>
                <Alert color='warning'>
                    Nenhum gênero cadastrado.
                </Alert>
            </div>
        )
    }
    return(
        <div className='container'>
        <h1>Gêneros</h1>
        <Button color='primary' tag={Link} to="/generos/novo">Novo gênero</Button>
        <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Gênero</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
                   
               {data.map(renderLinha)}   
        </tbody>
      </Table>
        </div>
    )
}

export default Generos