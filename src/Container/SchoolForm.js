import React, { useEffect } from 'react'
// import {connect} from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import StudentForm from "../Component/StudentForm/StudentForm"
import MarkDetail from "../Component/MarkDetail/MarkDetail"
import StudentSummary from "../Component/StudentSummary/StudentSummary"
import MarkSummary from "../Component/MarkSummary/MarkSummary";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as formAction from "../Store/Redux/reducer";

const SchoolForm = ()=>{
    const editStudentDetailMode = useSelector(state => state.reducer.editStudentDetailMode);
    const editStudentDetailModeObject = useSelector(state => state.reducer.editStudentDetailModeObject);
    const studentDetail = useSelector(state => state.reducer.studentDetail);
    const initState = useSelector(state => state.reducer.initState);
    
    
    const editMarkMode = useSelector(state => state.MarkReducer.editMarkMode);
    const activePopup = useSelector(state =>state.MarkReducer.activePopup);
    const studentMarkObject = useSelector(state =>state.MarkReducer.studentMarkObject);
    const studentId = useSelector(state =>state.MarkReducer.studentId);
    const studentName = useSelector(state =>state.MarkReducer.studentName);
    const markDetail = useSelector(state =>state.MarkReducer.markDetail);
    const dispatch = useDispatch();

   useEffect(() => {
    dispatch(formAction.initilizerHandler());
   },[dispatch]);
   return(

    <div className="container px-5">
    <h2 className = "pl-lg-5">School Admission Form</h2>
    <StudentForm 
    submitForm = {(editStudentDetailMode,studentDetailObject)=>{dispatch(formAction.submitFormHandler(editStudentDetailMode,studentDetailObject))}}
    editStudentDetailMode = {editStudentDetailMode} 
    editStudentDetailModeObject ={editStudentDetailModeObject}
    initState = {initState}
    />
    {studentDetail.length !== 0 ? 
    <StudentSummary 
    studentDetail = {studentDetail}
    /> : 
    null }
    {activePopup ? 
    <MarkDetail
     activePopup = {activePopup}
     studentId = {studentId}
     studentName = {studentName}   
     editMarkMode = {editMarkMode}
     studentMarkObject = {studentMarkObject}
     /> : null}
     {markDetail.length !== 0 ? 
    <MarkSummary
     markDetail = {markDetail}

    /> : null}
</div>
   )
}
export default SchoolForm;