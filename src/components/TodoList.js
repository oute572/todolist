import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Loading from './Loading';
import axios from 'axios';
import Pagination from './Pagination';


const TodoList = () => {

    const [todo, setTodo] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (todo) => {
        setShow(true);
        setTodo(todo)
    };

    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(10);

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {

        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then((result) => {
                setTodos(result.data);
            });

    }, []);

    return (
        <div className="mt-3">
            {currentTodos ?
                <div className='container'>
                    <h1 className="mb-4">Liste des Todos</h1>
                    <table className="table table-sm table-striped table-bordered">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col" >#</th>
                                <th scope="col">User ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Completed</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTodos.map((todo) =>
                                <tr key={todo.id} className='text-center align-middle'>
                                    <td>{todo.id}</td>
                                    <td>{todo.userId}</td>
                                    <td>{todo.title}</td>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            id="disabledFieldsetCheck"
                                            label={todo.completed === true ? 'Oui' : 'Non'}
                                            checked={todo.completed}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn" onClick={() => handleShow(todo)}><i className="bi bi-eye-fill"></i></button>
                                    </td>
                                </tr>

                            )}

                        </tbody>
                    </table>
                    <div className='col-12'>
                        <Pagination todosPerPage={todosPerPage} totalTodos={todos.length} paginate={paginate} />
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Detail du todo N°:{todo.id}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <fieldset disabled>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledTextInput">ID</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder="Disabled input" value={todo.id} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledTextInput">ID USER</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder="Disabled input" value={todo.userId} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledTextInput">TITLE</Form.Label>
                                        <Form.Control id="disabledTextInput" placeholder="Disabled input" value={todo.title} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="disabledSelect">COMPLETED</Form.Label>
                                        <Form.Select id="disabledSelect">
                                            <option selected={todo.completed === true ? true : false}>Oui</option>
                                            <option selected={todo.completed === false ? true : false}>Non</option>
                                        </Form.Select>
                                    </Form.Group>
                                </fieldset>
                            </Form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Fermer
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                : <div className='container'>
                    <Loading />
                </div>
                
                }

        </div>);
}

export default TodoList;