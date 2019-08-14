import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Nav,NavItem,NavLink,NavbarToggler,
    Collapse
} from 'reactstrap'
const Header = () =>{
    const [open,setopen] = useState(false)
    const toggle = () =>{
        setopen(!open)
    }
    return(
        <Navbar color='dark' dark  expand="md">
        <div className="container">
            <NavbarBrand style={{color:"#fff"}} tag={Link} to="/">Minhas Séries</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
             <Collapse isOpen={open} navbar> 
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/Series"> Séries</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/Generos"> Gêneros</NavLink>
                    </NavItem>
                </Nav>
             </Collapse>
             </div>
        </Navbar>
    )
}

export default Header