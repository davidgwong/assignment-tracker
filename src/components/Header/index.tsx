import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { SetStateAction, useState } from "react";
import DueDate from "../DueDate/DueDate";

type AssignmentProp = {
  id: number;
  description: string;
  isCompleted: boolean;
  dueDate: Date | undefined;
};

type Props = {
  assignments: AssignmentProp[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentProp[]>>;
};

export function Header(props: Props) {
  const [assignmentInput, setAssignmentInput] = useState("");
  const [assignmentId, setAssignmentId] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>("");

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
      dueDate: selectedDate,
    };
    props.setAssignments([...props.assignments, newAssignment]);
    setAssignmentInput("");
    setAssignmentId(assignmentId + 1);
    setSelectedDate(undefined);
    setInputValue("");
  }

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1 className={styles.title}>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={addAssignment}>
        <input
          placeholder="Add a new assignment"
          type="text"
          required
          value={assignmentInput}
          onChange={assignmentInputChange}
        />
        <DueDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <button
          type="submit"
          disabled={assignmentInput == "" || selectedDate == undefined}
        >
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
