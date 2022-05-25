import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ListEmployees(){

    const [employees, setEmployees] = useState([]);

    const getEmployees = async () => {
        return await fetch('/api/employees', {
            method: 'GET',

        }).then(data => data.json())
            .then(res => {
                setEmployees(res.data)
            })
    }

    const removeEmployee = async (e) => {
        const isConfirm = await Swal.fire({
            title: `Deseas Eliminar? ${e.first_name}` ,
            text: 'No puedes revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si lo quiero hacer!'
        }).then(((result) => {
            return result.isConfirm
        }));

        await fetch(`/api/employees/${e.id}`,{
            method: 'DELETE'
        }).then( data => data.json())
        .then(res => {
            Swal.fire({
                icon: 'success',
                text: res.message
            })

            getEmployees()
            
        })

        if(!isConfirm){
            return;
        }
        console.log(e)
    }
    
    const editEmployee = (e) => {
        console.log(e)
        let pregunta = confirm(`Desea Editar?`)
    }

    useEffect(() => {
        getEmployees()
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                
                    <div className="card">
                        <div className="card-header">Employee Component</div>
                    </div>
                        <Link className='btn btn-success' to="/home/crear" >Crear</Link>
                    <table className='table table-striped'>
                        <tr>
                            <th scope='col'>id</th>
                            <th scope='col'>nombre</th>
                            <th scope='col'>apellido</th>
                            <th scope='col'>phone</th>
                            <th scope='col'>email</th>
                            <th scope='col' colSpan={2}>acciones</th>
                        </tr>
                        <tbody>
                            {
                                employees.map((e) => {
                                    return <tr key={e.id}>
                                        <td scope='row' >{e.id}</td>
                                        <td>{e.first_name}</td>
                                        <td>{e.last_name}</td>
                                        <td>{e.phone}</td>
                                        <td>{e.email}</td>
                                        <td><Link className='btn btn-primary' to={`/home/employee/${e.id}`}>Editar</Link></td>
                                        <td><button onClick={() => removeEmployee(e) } className='btn btn-danger'>Eliminar</button></td>
                                    </tr>
                                })
                            }

                        </tbody>
                        <tfoot>
                            
                        </tfoot>
                    </table>


                
            </div>
        </div>
    );
}

export default ListEmployees