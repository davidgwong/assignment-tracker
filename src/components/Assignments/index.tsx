import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

type AssignmentProp = {
  id: number;
  description: string;
  isCompleted: boolean;
  dueDate: Date | undefined;
};

type Props = {
  assignments: AssignmentProp[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentProp[]>>;
  assignmentLength: number;
  numOfCompleted: () => number;
};

export function Assignments(props: Props) {
  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{props.assignmentLength}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>
            {props.numOfCompleted()} of {props.assignmentLength}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {props.assignments.map((val, id) => (
          <Assignment
            assignment={val}
            key={id}
            assignments={props.assignments}
            setAssignments={props.setAssignments}
          />
        ))}
      </div>
    </section>
  );
}
