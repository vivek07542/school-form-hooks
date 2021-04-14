import React from 'react';
import { useDispatch } from "react-redux";
import * as markAction from "../../Store/Redux/MarkReducer";

const MarkSummary = (props) =>{
     const dispatch = useDispatch();

    const editStudentMark=(details,index,key) =>{
     const editMarkMode = true;
        dispatch(markAction.editStudentMarkInit(details,editMarkMode))
    }
    console.log(props.markDetail)
        let markSummary = (

           props.markDetail.map(details =>{
                return(
                    <div className="col-sm-6" key ={details.studentId}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{`${details.studentName} Mark's`}</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Subject</th>
                                        <th>Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.marks.map(score => {
                                        return (
                                        <tr key = {score.id}>
                                            <td>{score.id}</td>
                                            <td>{score.subject}</td>
                                            <td>{score.markObtained}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <button className="btn btn-outline-primary" onClick ={(index,key)=>editStudentMark(details,index,key)}>Edit</button>
                        </div>
                    </div>
                </div>
                )
            })
           
        )
        return (
            <div className="mt-5">
                <h3>Student Marks Summary</h3>
                <div className="row">
                    {markSummary}
                </div>
            </div>
        )
       
}
export default MarkSummary;