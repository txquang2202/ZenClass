import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StudentScoresTable = () => {
  const [students, setStudents] = useState([
    { id: '1', name: 'Student 1', score: 90 },
    { id: '2', name: 'Student 2', score: 85 },
    { id: '3', name: 'Student 3', score: 78 },
    // Add more students as needed
  ]);

  const handleAddStudent = () => {
    const newStudent = { id: Date.now().toString(), name: 'New Student', score: 0 };
    setStudents([...students, newStudent]);
  };

  const handleDeleteStudent = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);
  };

  const handleEditStudent = (studentId, newName, newScore) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, name: newName, score: newScore } : student
    );
    setStudents(updatedStudents);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list
    const reorderedStudents = Array.from(students);
    const [movedStudent] = reorderedStudents.splice(result.source.index, 1);
    reorderedStudents.splice(result.destination.index, 0, movedStudent);
    setStudents(reorderedStudents);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="students">
        {(provided) => (
          <TableContainer
            component={Paper}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <Draggable key={student.id} draggableId={student.id} index={index}>
                    {(provided) => (
                      <TableRow
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.score}</TableCell>
                        <TableCell>
                          <TextField
                            label="Name"
                            value={student.name}
                            onChange={(e) =>
                              handleEditStudent(student.id, e.target.value, student.score)
                            }
                          />
                          <TextField
                            label="Score"
                            type="number"
                            value={student.score}
                            onChange={(e) =>
                              handleEditStudent(student.id, student.name, parseInt(e.target.value))
                            }
                          />
                          <Button onClick={() => handleDeleteStudent(student.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Droppable>
      <Button onClick={handleAddStudent}>Add Student</Button>
    </DragDropContext>
  );
};

export default StudentScoresTable;
