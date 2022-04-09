import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Feedback from 'react-bootstrap/Feedback'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SignUpForm.css"

function SignUpForm() {
    document.addEventListener("DOMContentLoaded", () => {
        var textarea = document.getElementById('fun-fact');
        textarea.addEventListener('keyup', textareaLengthCheck, false);
        textarea.addEventListener('keydown', textareaLengthCheck, false);
        let count = 0;
        function textareaLengthCheck() {
            var textArea = textarea.value.length;
            var charactersLeft = 150 - textArea;
            var count = document.getElementById('charLeft');
            count.innerHTML = "Characters left: " + charactersLeft;
        }
    })

const [values, setValues] = useState({
    name: "",
    email: "",
    funFact: "",
});

const [formErrors, setErrors] = useState({});

const handleFormChange = e => {
    console.log(values)
    setValues( (values) => ({
        ...values,
        [e.target.name]: e.target.value,
    }));
};

const validate = () => {
    let errors = {};
    if (!values.name) {
      errors.name = "Full name is required";
    } else {
        delete errors['name']
    }
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
      errors.email = "Email address is invalid";
    } else {
        delete errors['email']
    }
    if (!values.funFact) {
        errors.funFact = 'Fun Fact is required'
    } else {
        delete errors['funFact']
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
};

const handleSubmit = () => {
    if (validate(values)) {
        const api_request = `https://hack-tech-app-endpoint.herokuapp.com/test?name=${values.name}&email=${values.email}&funfact=${values.funFact}`
        fetch(api_request).then(response => {
            console.log(response)
            toast("Application Submitted!!!");

            setValues( values => ({
                name: '',
                email: '',
                funFact: '',
            }));
        });
    } else {
        console.log(formErrors)
    }
}

    return (
        <div className='left'>
            <div className="form-background">
                <Form className='form'>
                <h3>Hack UCI Application</h3>
                <h5>Name</h5>
                <Form.Group className="mb-3">
                    <Form.Control className={formErrors.name ? 'error' : 'inputField'} placeholder="Name" value={values.name} name='name' onChange={handleFormChange}/>
                    <div id='charRight' className='errormsg'>{formErrors.name && formErrors.name}</div>
                </Form.Group>
                <h5>Email</h5>
                <Form.Group className="mb-3">
                    <Form.Control className={formErrors.email ? 'error' : 'inputField'} type="email" placeholder="Enter email" value={values.email} name='email' onChange={handleFormChange}/>
                    <div id='charRight' className='errormsg'>{formErrors.email && formErrors.email}</div>
                </Form.Group>
                <h5>Fun Fact</h5>
                <Form.Group className="mb-3">
                    <Form.Control as='textarea' rows={3} maxlength={150} id='fun-fact' className={formErrors.funFact ? 'error' : 'inputField'} placeholder="Fun Fact" name='funFact' value={values.funFact} onChange={handleFormChange}/>
                    <div style={{display:'flex', justifyContent: "space-between", marginTop:'-12px'}}>
                        <p id='charRight' className='errormsg' style={{paddingTop:'2px'}}>{formErrors.funFact && formErrors.funFact}</p>
                        <p id='charLeft'>Characters left: 150</p>
                    </div>
                </Form.Group>
                </Form>
                <Button id='button' type="submit" onClick={handleSubmit}>
                    Submit
                </Button>    
            </div>
            <ToastContainer />           
        </div>
    )
}

export default SignUpForm;