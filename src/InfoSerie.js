import React,{useState,useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input,Badge } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const InfoSerie = ({ match }) => {
    const [form,setform] = useState({})
    const [sucesso,setsucesso] = useState(false)
    const [data,setdata] = useState([])
    const [mode,setmode] = useState('INFO')
    const [genero,setgenero] = useState([])

    useEffect(()=>{
        axios.get('/api/series/'+ match.params.id)
        .then(res =>{
            setdata(res.data)
            setform(res.data)
        })

        axios.get('/api/genres')
        .then(res=>{
            setgenero(res.data.data)
        })
    },[match.params.id])


    //custom header
    const masterHeader = {
        height : '50vh',
        minHeight: '500px',
        backgroundImage : `url('${data.background}')`,
        backgroundSize : 'cover',
        backgroundPosition : 'center',
        backgroundRepeat:'no-repeat'
    }
    const onchange = field => evt =>{
        setform({
            ...form,
            [field]: evt.target.value
        })
    }
    const selecione = value => () =>{
        setform({
            ...form,
            status:value
        })
    }
    const Save = () =>{ 
        axios.put('/api/series/'+ match.params.id,
            form
        ).then(res=>{
            setsucesso(true)
        })
    }
    if(sucesso){
        return <Redirect to='/series'/>
    }
    
    return(
        <div>
            <header style={masterHeader}>
            <div className='h-100' style={{'background': 'rgba(0,0,0,0.7)'}}>
                <div className='h-100 container'>
                    <div className='row h-100 align-items-center'>
                        <div className='col-3'>
                            <img className='img-fluid img-thumbnail' src={data.poster} alt={data.name}/>
                        </div>
                        <div className='col-8'>
                            <h1 className='font-weight-light text-white'>{data.name}</h1>
                            <div className='lead text-white'>
                                {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                {data.status === 'PARA ASSISTIR' &&<Badge color='warning'>Para assistir</Badge>}
                                Gênero:{data.genre}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </header>
            <div className='container'>
                <Button onClick={() => setmode('EDIT')} color='primary'> EDITAR </Button>
            </div>
            { mode === 'EDIT' && 
            <div className='container'>
            <h1>Editar Série</h1>  
                     
            <Button onClick={() => setmode('INFO')} color='primary'> Cancelar edição </Button>
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
            }
        </div>
    )
}

export default InfoSerie
