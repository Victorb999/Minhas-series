import React,{ useState,useEffect} from 'react'
import axios from 'axios'
import {
    Table,Alert,Button
} from 'reactstrap'
import { Link } from 'react-router-dom'

const Series = () => {
    const [data,setdata] = useState([])
    useEffect(()=>{
        axios.get('/api/series')
        .then(res=>{
            setdata(res.data.data)
        })
    },[])

    const deleteserie = id =>{
        axios.delete('/api/series/'+id)
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
                    <Button onClick={() => deleteserie(registro.id)} color='danger'> Remover </Button> 
                    <Button tag={Link} to={'/Series/'+ registro.id} color='success'> Info </Button>
                </td>            
            </tr>
        )
    }

    if( data.length===0){
        return(
            <div className='container'>
            <Button color='primary' tag={Link} to="/series/novo">Nova série</Button>
                <Alert color='warning'>
                    Nenhuma série cadastrada.
                </Alert>
            </div>
        )
    }
    return(
        <div className='container'>
        <h1>Séries</h1>
        <Button color='primary' tag={Link} to="/series/novo">Nova série</Button>
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

export default Series