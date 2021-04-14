import React from 'react'

// import * as formAction from "../../../Store/Redux/reducer";
// import * as markAction from "../../../Store/Redux/MarkReducer";

const StudentList = (props) => {
    
    const addButtonDisable = false;

    const editHandler = () => {
        const editStudentDetailMode = true;
        props.editClick(props.id, editStudentDetailMode)
    }
    const deleteHandler = () => {
        props.deleteClick(props.id);
    }
    const addClickHandler = () => {
        const activePopup = true;
        const editStudentMarksMode = false;
        props.addClick(props.id, props.studentName, activePopup,editStudentMarksMode);
    }
    let eachChild = (
        <tr key={props.id}>
            <td>{`enrol${props.id}`}</td>
            <td>{props.studentName}</td>
            <td>{props.gender}</td>
            <td>{props.address}</td>
            <td>{props.country}</td>
            <td>{props.state}</td>
            <td>{props.city}</td>
            <td>{props.mobileNumber}</td>
            <td>{props.email}</td>
            <td>
                <button className="btn btn-outline-primary btn-sm" onClick={editHandler}>Edit</button>
                <button className="btn btn-outline-primary btn-sm" onClick={deleteHandler}>Delete</button>
                <button className="btn btn-outline-primary btn-sm" disabled={addButtonDisable} onClick={addClickHandler}>Add Marks</button>
            </td>
        </tr>
    )
    return (
        <>
            <tbody>
                {eachChild}
            </tbody>
        </>
    )
}
export default StudentList;

// import React, { Component } from 'react'

// export default class StudentList extends Component {
//     state = {
//         activePopup: false,
//         editStudentDetailMode: false,
//         editStudentDetailModeObject: {},
//         editStudentMarksMode: false,
//         addButtonDisable : false,
//     }

//     editHandler = () => {
//         // State Does Not update Soon as asynchronous for that we have to write callback of updated state
//         this.setState({ editStudentDetailMode: true }, () => {
//             this.props.editClick(this.props.id, this.state.editStudentDetailMode)
//         });
//     }
//     deleteHandler = ()=>{
//         this.props.deleteClick(this.props.id);
//     }
//     addClickHandler = () =>{
//         // State Does Not update Soon as asynchronous for that we have to write callback of updated state
//         this.setState({activePopup : true},()=>{
//             this.props.addClick(this.props.id,this.props.studentName,this.state.activePopup,this.state.editStudentMarksMode)
//         });
//     }
//     render() {
//         let eachChild = (
//             <tr key={this.props.id}>
//                 <td>{`enrol${this.props.id}`}</td>
//                 <td>{this.props.studentName}</td>
//                 <td>{this.props.gender}</td>
//                 <td>{this.props.address}</td>
//                 <td>{this.props.country}</td>
//                 <td>{this.props.state}</td>
//                 <td>{this.props.city}</td>
//                 <td>{this.props.mobileNumber}</td>
//                 <td>{this.props.email}</td>
//                 <td>
//                     <button className="btn btn-outline-primary btn-sm" onClick = {this.editHandler}>Edit</button>
//                     <button className="btn btn-outline-primary btn-sm" onClick = {this.deleteHandler}>Delete</button>
//                     <button className="btn btn-outline-primary btn-sm" disabled = {this.state.addButtonDisable} onClick = {this.addClickHandler}>Add Marks</button>
//                 </td>
//             </tr>
//         )
//         return (
//             <>
//                 <tbody>
//                     {eachChild}
//                 </tbody>
//             </>
//         )
//     }
// }