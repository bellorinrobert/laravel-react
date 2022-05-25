
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
    let navega = useNavigate()
    let params = useParams()
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [startDate, setStartDate] = useState(new Date());

    const updateEmployee = async (data) => {
        let employee = data
        employee.contract_date = `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`
        
        const rest = await fetch(`/api/employees/${params.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee),
        })
            .then(data => data.json())
            .catch(error => console.error('Error', error))

        Swal.fire({
            icon: 'success',
            text: rest.message
        })

        reset()
        // console.log(rest)
        setStartDate(new Date())
        navega("/home")

    }

    const getEmployee = async () => {
        
        const rest = await fetch(`/api/employees/${params.id}`, {
            method: "GET",
            cache: "no-cache",
        })
            .then(data => data.json())
            .then(data => data.employee)
            .catch(error => console.error('Error', error))

        for (const valor in rest) {
            setValue(`${valor}`, rest[valor])
        }


    }

    useEffect(() => {
        
        getEmployee()

    }, [])

    return (<Fragment>
        <form onSubmit={handleSubmit(updateEmployee)}>

            <label className="form-label" for="first_name">Nombre</label>
            <input {...register("first_name", {
                required: true,
                minLength: 5,
                maxLength: 20
            })} className="form-control" name="first_name" id="first_name" placeholder="Ingresa nombre" />


            {
                errors.first_name?.type === 'required' ? <div className="alert alert-danger" role="alert"> Error nombre </div>
                    : errors.first_name?.type === 'minLength' ? <div className="alert alert-danger" role="alert"> Error nombre muy corto minimo 5 caracteres </div>
                        : errors.first_name?.type === 'maxLength' && <div className="alert alert-danger" role="alert"> Error nombre muy largo maximo 20 caracteres </div>
            }



            <label className="form-label" for="last_name">Apellido</label>
            <input {...register("last_name", {
                required: true,
                minLength: 5,
                maxLength: 20
            })} className="form-control" name="last_name" id="last_name" placeholder="Ingresa apellido" ></input>
            {
                errors.last_name?.type === 'required' ? <div className="alert alert-danger" role="alert"> Error apellido </div>
                    : errors.last_name?.type === 'minLength' ? <div className="alert alert-danger" role="alert"> Error apellido muy corto minimo 5 caracteres </div>
                        : errors.last_name?.type === 'maxLength' && <div className="alert alert-danger" role="alert"> Error apellido muy largo maximo 20 caracteres </div>
            }

            <label className="form-label" for="phone">Phone</label>
            <input {...register("phone",
                {
                    required: true,
                    pattern: /\(\d{3}\) \d{3}-\d{4}/
                })} type={"phone"} className="form-control" name="phone" id="phone" placeholder="Ingresa telefono formato (XXX) XXX-XXXX" ></input>
            {
                errors.phone?.type === 'required' ? <div className="alert alert-danger" role="alert"> Error phone requerido </div>
                    : errors.phone?.type === 'pattern' && <div className="alert alert-danger" role="alert"> Error phone formato incorrecto, utiliza este formato (XXX) XXX-XXXX </div>
            }

            <label className="form-label" for="email">Email</label>
            <input  {...register("email",
                {
                    required: true,
                    pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
                })} className="form-control" name="email" id="Email" placeholder="Ingresa un email" ></input>
            {
                errors.email?.type === 'required' ? <div className="alert alert-danger" role="alert"> Error email requerido </div>
                    : errors.email?.type === 'pattern' && <div className="alert alert-danger" role="alert"> Error email formato incorrecto </div>
            }

            <label className="form-label">Fecha de contrato</label>

            <DatePicker
                selected={startDate}

                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy"
            />

            <button type="submit" className="btn btn-success">Guardar</button>
        </form>
    </Fragment>);
}

export default EditEmployee;