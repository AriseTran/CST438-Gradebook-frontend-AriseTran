import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';
import AddAssignment from "./AddAssignment";
import EditAssignment from "./EditAssignment";


function ListAssignment(props) {
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
   // called once after intial render
   fetchAssignments();
  }, [] )
 
  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  }

    const deleteAssignment = (event) => {
        const row_id = event.target.parentNode.parentNode.rowIndex - 1;
        const id = assignments[row_id].id;
        console.log("delete assignment "+id);
        fetch(`${SERVER_URL}/assignment/${id}`,
            {
                method: 'DELETE',
            }
        )
            .then((response) => {
                if (response.ok) {
                    setMessage('Assignment deleted.');
                    fetchAssignments();
                } else {
                    setMessage("Assignment delete failed.");
                }
            } )
            .catch((err) =>  { setMessage('Error. '+err) } );
    }
  
  
    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];

    return (
        <div>
            <h3>Assignments</h3>
            <div margin="auto" >
                <h4>{message}&nbsp;</h4>
                <table className="Center">
                    <thead>
                    <tr>
                        {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {assignments.map((row, idx) => (
                        <tr key={idx}>
                            <td>{row.assignmentName}</td>
                            <td>{row.courseTitle}</td>
                            <td>{row.dueDate}</td>
                            <td>
                                <Link to={`/gradeAssignment/${assignments[idx].id}`} >Grade</Link>
                            </td>
                            <td><EditAssignment assignment={assignments[idx]} onClose={fetchAssignments} /></td>
                            <td><button type="button" margin="auto" onClick={deleteAssignment}>Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <AddAssignment onClose={fetchAssignments}/>
            </div>
        </div>
    )
}  

export default ListAssignment;