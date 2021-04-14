import React, { useState,useEffect } from 'react'
import "./MarkDetail.css";
import Modal from "../../UI/Modal/Modal";
import { useDispatch } from 'react-redux';
import * as markAction from "../../Store/Redux/MarkReducer";

const MarkDetail = (props) =>{
    const dispatch = useDispatch();
    console.log(props);

    const[markState,setMarkState] = useState({
        semester: {
            value: "",
            touched: false,
            valid: false
        },
        marks: [
            {
                subject: {
                    value: "",
                    touched: false,
                    valid: false
                },
                markObtained: {
                    value: "",
                    touched: false,
                    valid: false
                }
            }
        ],
        isValid: false,
        addBtnDisable : false,
        subBtnDisable : true
    })
    const[editMarkMode,setEditMarkMode] = useState(false);
    // const[studentName,setStudentName] = useState("");

    useEffect(() => {      
            if (editMarkMode !== props.editMarkMode && props.editMarkMode !== undefined ) {
                if (props.studentMarkObject !== null) {
                    const updatedStateEditCondition = { ...markState };
                    updatedStateEditCondition.semester.value = props.studentMarkObject.semester;
                    updatedStateEditCondition.semester.touched = true;
                    updatedStateEditCondition.semester.valid = true;
                    setMarkState(updatedStateEditCondition);
                    setEditMarkMode(true);
                    // setStudentName(props.studentName);
                    // setMarkState({...markState,isValid : true,editMarkMode : true,studentName : props.studentName});
                    let array = [];
                    let editMarks = props.studentMarkObject.marks;
                    for(let index in editMarks){
                        let object = {};
                        object.subject = {}
                        object.subject.value = editMarks[index].subject;
                        object.subject.touched = true;
                        object.subject.valid = true;
                        object.markObtained = {};
                        object.markObtained.value = editMarks[index].markObtained
                        object.markObtained.touched = true;
                        object.markObtained.valid = true;
                        array.push(object);
                    }
                    setMarkState({...markState,marks : array});
                }
            }
    }, [markState.editMarkMode,props.editMarkMode,markState,props.studentMarkObject,props.studentName])
    const  inputHandler = (event) => {
        if (event.target.value >= 0 && event.target.value.trim() !== "") {
           setMarkState({...markState,
                semester: {
                    value: event.target.value,
                    touched: true,
                    valid: true
                }
            })
        }
        else {
            setMarkState({...markState,
                semester: {
                    value: event.target.value,
                    touched: true,
                    valid: false
                }
            })
        }
    }
    const addButtonHandler = () => {
        const values = [...markState.marks];
        if(values.length <=4){
            setMarkState({...markState,
                marks:[...markState.marks,
                {
                    subject: {
                        value: "",
                        touched: false,
                        valid: false
                    },
                    markObtained: {
                        value: "",
                        touched: false,
                        valid: false
                    }
                }
            ],
            addBtnDisable : false,
            subBtnDisable : false})
        }
        else {
            setMarkState({...markState,
                marks:
                    [...markState.marks,
                    {
                        subject: {
                            value: "",
                            touched: false,
                            valid: false
                        },
                        markObtained: {
                            value: "",
                            touched: false,
                            valid: false
                        }
                    }
                ],
                addBtnDisable : true,
                subBtnDisable : false
            })
        }
    }

    const subractButtonHandler = (index) => {
        const values = [...markState.marks];
        if(values.length === 1){
            setMarkState({...markState,addBtnDisable : false,subBtnDisable : true})
        }
        else{
            values.splice(index, 1);
            setMarkState({...markState , marks: values,subBtnDisable:false,addBtnDisable:false})
        }
    }

    const onChangeHandler = (index, event) => {
        const subjectMark = [...markState.marks];
        if (event.target.value >= 0 && event.target.value < 101 && event.target.value.trim() !== "" && event.target.name === "markObtained") {
            subjectMark[index][event.target.name].value = event.target.value;
            subjectMark[index][event.target.name].touched = true;
            subjectMark[index][event.target.name].valid = true
        }
        else if (event.target.value.trim() !== "" && event.target.name === "subject") {
            subjectMark[index][event.target.name].value = event.target.value;
            subjectMark[index][event.target.name].touched = true;
            subjectMark[index][event.target.name].valid = true
        }
        else {
            subjectMark[index][event.target.name].value = event.target.value;
            subjectMark[index][event.target.name].touched = true;
            subjectMark[index][event.target.name].valid = false
        }
        setMarkState({...markState, marks: subjectMark });
        validityCheck(event);
    }
    const validityCheck = (event) => {
        let formIsValid = true;
        let formValidityCheck = { ...markState.marks }
        for (let inputIdentifier in formValidityCheck) {
            formIsValid = markState.semester.valid && formValidityCheck[inputIdentifier].subject.valid && formValidityCheck[inputIdentifier].markObtained.valid && formIsValid
        }
        setMarkState({...markState,isValid: formIsValid });
    }
    const addMarkToStudent = (event) => {
        event.preventDefault();
        const markData = {};
        markData.studentId = props.studentId;
        markData.studentName = props.studentName;
        markData.semester = markState.semester.value;
        markData.marks = [];
        for (let index in markState.marks) {
            let object = {};
            object.id = +index + 1;
            object.subject = markState.marks[index].subject.value;
            object.markObtained = markState.marks[index].markObtained.value;
            markData.marks.push(object);
        }
        dispatch(markAction.addMarkToStudentInit(editMarkMode, markData)) 
        resetState();
    }
    const resetState =() =>{
        setMarkState({...markState,
            semester: {
                value: "",
                touched: false,
                valid: false
            },
            marks: [
                {
                    subject: {
                        value: "",
                        touched: false,
                        valid: false
                    },
                    markObtained: {
                        value: "",
                        touched: false,
                        valid: false
                    }
                }
            ],
            isValid: false,
            addBtnDisable : false,
            subBtnDisable : true
        })
        setEditMarkMode(false);
        // setStudentName("");
    }

    const inputClasses = ["form-control mb-2"];
    if (markState.semester.valid && markState.semester.touched) {
        inputClasses.push("is-valid");
    }

    if (!markState.semester.valid && markState.semester.touched) {
        inputClasses.push("is-invalid");
    }
    let markContentDetail = (
        <div className="form-group">
            <form onSubmit={addMarkToStudent}>
                <p>{props.studentName}</p>
                <div className="form-row Input justify-content-center align-items-start ">
                    <div className="col-md-12 mb-2 form-inline ">
                        <label className="col-5">Semester :</label>
                        <input type="number"
                            placeholder="Semester"
                            className={inputClasses.join(' ')}
                            name="semester"
                            value={markState.semester.value}
                            onChange={inputHandler}
                        />
                    </div>
                </div>
                <h3>Marks Detail</h3>
                {markState.marks.map((e, index) => {
                    const inputClasse = ["col-3 form-control mb-2"];
                    if (e.subject.valid && e.subject.touched) {
                        inputClasse.push("is-valid");
                    }
                    if (!e.subject.valid && e.subject.touched) {
                        inputClasse.push("is-invalid");
                    }
                    const inputClass = ["col-3 form-control mb-2"]

                    if (e.markObtained.valid && e.markObtained.touched) {
                        inputClass.push("is-valid");
                    }
                    if (!e.markObtained.valid && e.markObtained.touched) {
                        inputClass.push("is-invalid");
                    }
                    return (
                        <div className="form-row Input justify-content-between align-items-center" key={index}>
                            <div className="col-md-12 mb-1 form-inline justify-content-between ">
                                <label className="col-2 mb-2">Subject :</label>
                                <select
                                    className={inputClasse.join(' ')}
                                    name="subject"
                                    value={e.subject.value}
                                    onChange={(event) => onChangeHandler(index, event)} >
                                    <option value="" disabled >Select Subject</option>
                                    <option value="Physics"> Physics</option>
                                    <option value="Mathamatics"> Mathamatics</option>
                                    <option value="Chemistry">Chemistry </option>
                                    <option value="Economics"> Economics</option>
                                    <option value="Taxation"> Taxation</option>
                                    <option value="Accounts">Accounts </option>
                                    <option value="Moral Values">Moral Values </option>
                                    <option value="History">History </option>
                                </select>
                                <input
                                    className={inputClass.join(' ')}
                                    type="number"
                                    name="markObtained"
                                    placeholder="Marks"
                                    value={e.markObtained.value}
                                    onChange={(event) => onChangeHandler(index, event)} />
                                <button type="button" className="btn btn-outline-primary mb-2 col-1" disabled = {markState.addBtnDisable} onClick={() => addButtonHandler()}>+</button>
                                <button type="button" className="btn btn-outline-primary mb-2 col-1" disabled = {markState.subBtnDisable} onClick={() => subractButtonHandler(index)}>-</button>
                            </div>
                        </div>
                    )
                })}
                <div className="row justify-content-center">
                    <button className="btn btn-outline-primary my-3" disabled={!markState.isValid}>Save Marks</button>
                </div>
            </form>
        </div>
    )
    return (
        <>
            <Modal show={props.activePopup}>
                {markContentDetail}
            </Modal>
        </>
    )
}
export default MarkDetail;