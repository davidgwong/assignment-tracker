import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { SetStateAction, useState } from "react";

type AssignmentProp = {
  id: number;
  description: string;
  isCompleted: boolean;
};

type Props = {
  assignments: AssignmentProp[];
  setAssignments: (value: AssignmentProp[]) => void;
};

export function Header(props: Props) {
  const [assignmentInput, setAssignmentInput] = useState("");
  const [assignmentId, setAssignmentId] = useState(0);

  const assignmentInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setAssignmentInput(event.target.value);
  };

  function addAssignment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let newAssignment: AssignmentProp = {
      id: assignmentId,
      description: assignmentInput,
      isCompleted: false,
    };
    props.setAssignments([...props.assignments, newAssignment]);
    setAssignmentInput("");
    setAssignmentId(assignmentId + 1);
  }

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={addAssignment}>
        <input
          placeholder="Add a new assignment"
          type="text" required
          value={assignmentInput}
          onChange={assignmentInputChange}
        />
        <button type="submit" disabled={assignmentInput == ""}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
