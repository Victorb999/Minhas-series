import React,{ useState,useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditaGenero = ({match}) => {
    const [genero,setgenero] = useState('')
    const [sucesso,setsucesso] = useState(false)
    
    useEffect(()=>{
        axios.get('/api/genres/' +match.params.id)
        .then(res=>{
            setgenero(res.data.name)
        })
    },[match.params.id])
    const onchange = evt =>{
        setgenero(evt.target.value)
    }
    const Save = () =>{
        axios.put('/api/genres/'+match.params.id,{
            name:genero
        }).then(res=>{
            setsucesso(true)
        })
    }
    if(sucesso){
        return <Redirect to='/generos'/>
    }
    return(
        <div className='container'>
        <h1>Editar gêneros</h1>
            <Form>
                <FormGroup>
                <Label for='genero'>Gênero</Label>
                <Input type='text' name='genero' id='genero' onChange={onchange} value={genero} placeholder='Digite o nome do novo gênero' />
                </FormGroup>       
                <Button color='primary' onClick={Save}>Salvar</Button>
            </Form>
        </div>
    )
}

export default EditaGenero
