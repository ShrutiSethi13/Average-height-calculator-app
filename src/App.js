import React from 'react';
import './App.css';

const StudentContext = React.createContext({
	students: [],
	addStudent: (name, height) => {},
});

const StudentList = (props) => {
	const contextConsumer = React.useContext(StudentContext);
	return (
		<table className="student-list">
		<thead>
		<tr>
		<th>Name of Student</th>
		<th>Height</th>
		</tr>
		</thead>
		<tbody>
		{contextConsumer.students.map((student, i) => (
			<tr key={student.name}>
				<td>{student.name}</td>
				<td>{student.height}</td>
			</tr>
			
		))}
		</tbody>
		</table>
	);
}

const AddStudentButton = (props) => {
	const consumerContext = React.useContext(StudentContext);	
	const [name , setName] = React.useState('');
	const submit = () => {
		consumerContext.addStudent(name , Math.ceil(Math.random() * 10));
		setName('');
	};
	return (
		<div className="add-student-form">
		<input className="input" value={name} onChange={(e) => setName(e.target.value)}/>
		<button className="input" onClick={submit}>Add</button>
		</div>
	);
}

const AverageHeightCalculator = (props) => {
	const consumerContext = React.useContext(StudentContext);

	if(consumerContext.students.length === 0) {
		return <div>Add some students in the list to view their average height.</div>
	}

	let total = 0;
	for(const student of consumerContext.students) {
		total += student.height;
	}
	const avg = total / consumerContext.students.length;
	return (
		<div>
		The average height of above sudents is {avg.toFixed(2)} foot
		</div>
	);
}

function App() {
	const [students , setStudents] = React.useState([]);

	const addStudent = (name , height) => {
		const newStudent = {name , height};
		setStudents(prevStu => [...prevStu, newStudent]);
	};

	return (
		<StudentContext.Provider value={{students, addStudent}}>
		<div className="student-overview">
		<h2>Average height calculator</h2>
		<StudentList />
		<AddStudentButton />
		<AverageHeightCalculator />
		</div>
		</StudentContext.Provider>
	)
} 

export default App;