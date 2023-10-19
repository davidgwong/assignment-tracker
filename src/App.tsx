import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";

type AssignmentProp = {
  id: number;
  description: string;
  isCompleted: boolean;
  dueDate: Date | undefined;
};

function App() {
  let arr: AssignmentProp[] = [];
  const [assignments, setAssignments] = useState(arr);
  const assignmentLength = assignments.length;
  const numOfCompleted = () => {
    let completed = 0;
    assignments.forEach((val) => {
      if (val.isCompleted) completed++;
    });
    return completed;
  };
  return (
    <>
      <Header assignments={assignments} setAssignments={setAssignments} />

      <Assignments
        assignments={assignments}
        setAssignments={setAssignments}
        assignmentLength={assignmentLength}
        numOfCompleted={numOfCompleted}
      />
    </>
  );
}

export default App;
