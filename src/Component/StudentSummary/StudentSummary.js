import React from 'react'
import StudentList from "./StudentList/StudentList";
import * as formAction from "../../Store/Redux/reducer"
import * as markAction from "../../Store/Redux/MarkReducer";
import { useDispatch} from "react-redux";
import "./StudentSummary.css";

const StudentSummary = (props) =>{
    const dispatch = useDispatch();
    
    let student = (
        props.studentDetail.map(details =>{
            return(
                <StudentList 
                key = {details.id}
                id = {details.id}
                studentName = {`${details.firstName} ${details.lastName}`}
                gender = {details.gender}
                address = {details.street}
                country = {details.country}
                state = {details.state}
                city = {details.city}
                mobileNumber = {details.mobileNumber}
                email = {details.email}
                editClick = {(id,editStudentDetailMode)=>{dispatch(formAction.editStudentDetailHandler(id,editStudentDetailMode))}}
                deleteClick = {(id)=>{dispatch(formAction.deleteStudentDetailHandler(id))}}
                addClick = {(id,studentName,activePopup,editMarkMode)=>{dispatch(markAction.addMarkDetailHandler(id,studentName,activePopup,editMarkMode))}}
            
            />
            )
        })
    )
    return (
        <div className="StudentSummary">
             <h1>Student Summary </h1>
             <table className="table table-striped">
             <thead>
                <tr>
                    <th>Id</th>
                    <th>Student Name</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Mobile Number</th>
                    <th>E-mail</th>
                    <th>Action</th>
                </tr>
            </thead>
               {student}
             </table>
        </div>
    )
}

export default StudentSummary;