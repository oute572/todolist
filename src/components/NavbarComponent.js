import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


import Contact from './Contact';
import TodoList from './TodoList';

class NavbarComponent extends Component {



    constructor(props) {
        super(props);
        this.state = {
            visitor: null
        }
    }


    handleCallback = (childData) => {
        this.setState({ visitor: childData })
    }

    render() {


        return (
            <Router>
                <div>
                    <Navbar bg="dark" variant={"dark"} expand="lg">
                        <Container>
                            <Navbar.Brand as={Link} to="/">Todos</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/" >Liste des Todos</Nav.Link>
                                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            {this.state.visitor!==null ? <Navbar.Brand className='justify-content-end'>
                                <span>Nom-Prenom:</span> <small className='text-muted'>{'   '+this.state.visitor.np+'   '}</small>
                                <span>Email:</span><small className='text-muted'>{'   '+this.state.visitor.email+'   '}</small>
                                </Navbar.Brand> : null}
                        </Container>
                    </Navbar>
                </div>
                <div>

                    <Routes>
                        <Route exact path="/" element={<TodoList />}>
                        </Route>
                        <Route exact path="/contact" element={<Contact parentCallback={this.handleCallback} />}>
                        </Route>


                    </Routes>

                </div>
            </Router>
        );
    }
}

export default NavbarComponent;
