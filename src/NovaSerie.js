import React,{useState,useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovaSerie = () => {
    const [form,setform] = useState({})
    const [sucesso,setsucesso] = useState(false)
    const [genero,setgenero] = useState([])

    useEffect(()=>{        

        axios.get('/api/genres')
        .then(res=>{
            setgenero(res.data.data)
        })
    },[])
    const selecione = value => () =>{
        setform({
            ...form,
            status:value
        })
    }

    const onchange = field => evt =>{
        setform({
            ...form,
            [field]: evt.target.value
        })
    }
    const Save = () =>{
        axios.post('/api/series',form).then(res=>{
            setsucesso(true)
        })
    }
    if(sucesso){
        return <Redirect to='/series'/>
    }
    return(
        <div className='container'>
        <h1>Série</h1>
            <Form>
                <FormGroup>
                <Label for='serie'>Série</Label>
                <Input type='text' name='serie' id='serie' onChange={onchange('name')} value={form.name} placeholder='Digite o nome do novo série' />

                <Label for='comments'>Comentários</Label>
                <Input type='text' name='comments' id='comments' onChange={onchange('comments')} value={form.comments} placeholder='Digite o nome do novo série' />

                    <Label for='generos'>Gêneros</Label>
                    <select name='genre_id' id='genre_id' className='form-control' onChange={onchange('genre_id')} defaultValue={form.genre_id}>
                    
                        {
                            genero.map(genre => {
                                //let selected = genre.id === form.genre_id?'selected':''
                               // console.log(genre.id,form.genre_id,selected)
                             return  <option key={genre.id} value={genre.id} > {genre.name} </option>
                            }
                            )
                        }
                    </select>
                    <div className='form-check'>     
                    <input type='radio' className='form-check-input' name='status' id='assistido' value='ASSISTIDO'  
                    onChange={selecione('ASSISTIDO')}
                    checked={form.status === 'ASSISTIDO'}/>
                    <Label htmlFor='assistido' className='form-check-label'>Assistido</Label>
                    </div>

                    <div className='form-check'>
                    <input type='radio' className='form-check-input' name='status' id='paraAssistir' value='PARA ASSISTIR' 
                    onChange={selecione('PARA ASSISTIR')}
                    checked={form.status === 'PARA ASSISTIR'}/>
                    <Label htmlFor='paraAssistir' className='form-check-label'>Para assistir</Label>
                    </div>
                    
                    </FormGroup>          
                <Button color='primary' onClick={Save}>Salvar</Button>
            </Form>
        </div>
    )
}

export default NovaSerie
