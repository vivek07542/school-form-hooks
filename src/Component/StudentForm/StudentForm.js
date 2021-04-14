import React, { useState,useEffect } from 'react';
import Input from "../../UI/Input/Input";
import {checkValidatity} from "../../Utilities/validity";

const StudentForm = (props) =>{
    const[studentForm,setStudentForm] = useState({
        studentDetail: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name',
                },
                className: "form-control mb-2",
                value: "",
                label: "First name",
                validation:{
                    required : true
                },
                valid:false,
                touched :false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name',
                },
                className: "form-control mb-2",
                value: "",
                label: "Last name",
                validation:{
                    required : true
                },
                valid:false,
                touched :false
            },
            gender: {
                elementType : "select",
                elementConfig : {
                    placeholder: "Select Gender",
                  options:[
                  { name : "Male"},
                  { name : "Female"},]
                },
                className:"form-control mb-2",
                label : "Gender",
                value: "--Choose Gender--",
                valid:false,
                validation:{},
                touched :false
            },
            street: {
                elementType: "textarea",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                className: "form-control mb-2",
                value: "",
                label: "Street",
                validation:{
                    required : true
                },
                valid:false,
                touched :false
            },
            country: {
                elementType: "select",
                elementConfig: {
                    placeholder: "Country",
                    options:[]
                },
                className: "form-control mb-2",
                label: "Country",
                value : "--Choose Country--",
                validation:{
                    required : true
                },
                valid:false,
                touched :false
            },
            state: {
                elementType: "select",
                elementConfig: {
                    placeholder: "State",
                    options:[]                    
                },
                className: "form-control mb-2",
                label: "State",
                value : "--Choose State--",
                validation:{
                    required : true
                },
                valid:false,
                touched :false
            },
            city: {
                elementType: "citySel",
                elementConfig: {
                    placeholder: "City",
                    options : []
                },
                className: "form-control mb-2",
                label: "City",
                value : "--Choose City--",
                validation:{
                    required : true
                },
                valid:false,
                touched :false
            },
            mobileNumber: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Mobile Number",
                },
                className: "form-control mb-2",
                value: "",
                label: "Mobile Number",
                validation:{
                    required : true,
                    absolute : 10
                },
                valid:false,
                touched :false

            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail",
                },
                className: "form-control mb-2",
                value: "",
                label: "E-Mail Address ",
                validation:{
                    required : true,
                    isEmail:true
                },
                valid:false,
                touched :false
            }
        },
        formIsValid: false,
        // editStudentDetailMode : false,
        // id : null
    })
    // const[formIsValid,setFormIsValid] = useState(false);
    const[editStudentDetailMode , setEditStudentDetailMode] = useState(false);
    const[id , setId] = useState(null);

    useEffect(() => {
        const updatedstudentDetail = { ...studentForm.studentDetail };
        for(let key in updatedstudentDetail){
            if(key === "country"){
                const updatedFormElement = { ...updatedstudentDetail[key]};
                updatedFormElement.elementConfig.options = [
                    {
                        name: 'Germany',
                        states: [
                            { name: 'A', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'] }
                        ]
                    },
                    {
                        name: 'Spain',
                        states: [
                            { name: 'B', cities: ['Barcelona'] }
                        ]
                    },
                    {
                        name: 'USA',
                        states: [
                            { name: 'California', cities: ["Los Angeles", "San Diego"] },
                            { name: 'Texas', cities: ["Dallas", "Austin"] },
                        ]
                    },
                    {
                        name: 'Mexico',
                        states: [
                            { name: 'D', cities: ['Puebla'] }
                        ]
                    },
                    {
                        name: 'India',
                        states: [
                            { name: "Assam", cities: ["Dispur", "Guwahati"] },
                            { name: "Gujarat", cities: ["Vadodara", "Surat", "Bharuch"] },
                            { name: "Madhya Pradesh", cities: ["Indore", "Gwalior", "Bhopal", "Guna"] },
                        ]
                    },
                ]
                updatedstudentDetail[key] = updatedFormElement;
                setStudentForm({...studentForm,studentDetail : updatedstudentDetail});
            }
        }
    },[])

    useEffect(() => {
        if(editStudentDetailMode !== props.editStudentDetailMode ){
            // setFormIsValid(true);
            console.log(studentForm);
            console.log(props.editStudentDetailModeObject)
            setEditStudentDetailMode(true);
            setId(props.editStudentDetailModeObject.id);
            const updateStudentDetail = {...studentForm.studentDetail};
            const editStudentDetail = props.editStudentDetailModeObject;
            for(let key in updateStudentDetail){
                for(let property in editStudentDetail){
                    if(key === property){
                        updateStudentDetail[key].value = editStudentDetail[property];
                        updateStudentDetail[key].touched = true;
                        updateStudentDetail[key].valid = true;
                    }
                } 
            }            
            setStudentForm({...studentForm,studentDetail:updateStudentDetail});
        }
    }, [props.editStudentDetailMode, editStudentDetailMode,props.editStudentDetailModeObject])

    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedstudentDetail = { ...studentForm.studentDetail};
        const updatedFormElement = { ...updatedstudentDetail[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        if (inputIdentifier === "country") {
            changeCountry(event,updatedstudentDetail,updatedFormElement);
        }
        else if (inputIdentifier === "state") {
            changeState(event,updatedstudentDetail,updatedFormElement);
        }
        updatedFormElement.valid = checkValidatity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedstudentDetail[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedstudentDetail){
            formIsValid = updatedstudentDetail[inputIdentifier].valid && formIsValid
        }
        setStudentForm({...studentForm,studentDetail : updatedstudentDetail,formIsValid : formIsValid});
    }
    
    const changeCountry = (event,updatedstudentDetail,updatedFormElement) => {
        for(let key in updatedstudentDetail){
            if(key === "state"){
                const updatedFormElementState = { ...updatedstudentDetail[key]};
                updatedFormElementState.elementConfig.options = updatedFormElement.elementConfig.options.find(cntry => cntry.name === event.target.value).states;
                updatedstudentDetail[key] = updatedFormElementState;
                setStudentForm({...studentForm,studentDetail : updatedstudentDetail});
            }
        }
    }

    const changeState = (event,updatedstudentDetail,updatedFormElement) => {
        for(let key in updatedstudentDetail){
            if(key === "city"){
                const updatedFormElementCity = { ...updatedstudentDetail[key]};
                updatedFormElementCity.elementConfig.options = updatedFormElement.elementConfig.options.find(cntry => cntry.name === event.target.value).cities;
                updatedstudentDetail[key] = updatedFormElementCity;
                setStudentForm({...studentForm,studentDetail : updatedstudentDetail});
            }
        }
    }
    const resetForm=()=>{
        const updateStudentDetail = {...studentForm};
        for(let key in updateStudentDetail.studentDetail){
            updateStudentDetail.studentDetail[key].valid = false;
            updateStudentDetail.studentDetail[key].touched = false;
            if(key === "gender"){
                updateStudentDetail.studentDetail[key].value = "--Choose Gender--" 
            }        
            else if(key === "country"){
                updateStudentDetail.studentDetail[key].value = "--Choose Country--" 
            }
            else if(key === "state"){
                updateStudentDetail.studentDetail[key].value = "--Choose State--" 
            }
            else if(key === "city"){
                updateStudentDetail.studentDetail[key].value = "--Choose City--" 
            }
            else{
                updateStudentDetail.studentDetail[key].value = " ";
            }    
        }   
        updateStudentDetail.formIsValid = false;
        setId(null);
        setEditStudentDetailMode(false);
        setStudentForm(updateStudentDetail);
    }
    const submitHandler = (event)=>{
        event.preventDefault();
        const studentData = {};
        console.log(studentForm);
        studentData.id = id;
        for(let formIdentifier in studentForm.studentDetail){
            studentData[formIdentifier] = studentForm.studentDetail[formIdentifier].value;
        }
        props.submitForm(props.editStudentDetailMode,studentData);
        resetForm();
    }
   
        const studentDetailArray = [];
        for (let key in studentForm.studentDetail) {
            studentDetailArray.push({
                id: key,
                config: studentForm.studentDetail[key]
            })
        }
        let form = (
            <div className="form-group ">
                <form onSubmit={submitHandler}>
                    {studentDetailArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            componentClasses = {formElement.config.className}
                            inValid = {!formElement.config.valid}
                            touched ={formElement.config.touched}
                            shouldValidate = {formElement.config.validation}
                            label={formElement.config.label}
                            changed={(event) => { inputChangeHandler(event, formElement.id) }}
                        />
                    ))}
                    <div className="row justify-content-center">
                        <button className="btn btn-outline-primary my-3" disabled ={!studentForm.formIsValid}>Save form</button>
                    </div>
                </form>
            </div>
        )
        return (
            <div>
                {form}
            </div>
        )
}
export default StudentForm;