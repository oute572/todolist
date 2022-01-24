import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';


class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            np: '',
            email: ''
        }
    }

    onPassedVisitor = () => {
        let visitor = { np: this.state.np, email: this.state.email };
        this.props.parentCallback(visitor);
    }

    componentDidMount() {

    }

    handleChangeNp = (event) => {
        this.setState({ np: event.target.value });
    }
    
    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    render() {
        return (

            <div className='p-5 d-flex justify-content-center align-items-center align-content-center'>
                <Card className='col-6'>
                    <Card.Header>Information Visiteur</Card.Header>
                    <Card.Body>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nom-Prenom</Form.Label>
                                    <Form.Control type="text" placeholder="Entrer le nom et prenom" onChange={this.handleChangeNp} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="entrer votre email" onChange={this.handleChangeEmail} />
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={this.onPassedVisitor}>
                                    Soumettre
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </div>



        );
    }
}

export default Contact;
