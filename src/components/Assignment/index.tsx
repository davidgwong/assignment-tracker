import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";

type AssignmentProp = {
  id: number;
  description: string;
  isCompleted: boolean;
};

type Props = {
  assignment: AssignmentProp;
  key: number;
  assignments: AssignmentProp[];
  setAssignments: (value: AssignmentProp[]) => void;
};

export function Assignment(props: Props) {
  const setCompleted = () => {
    let temp = props.assignment;
    temp.isCompleted = !temp.isCompleted;

    const nextAssignments = props.assignments.map((val) => {
      if (val.id === props.assignment.id) {
        return temp;
      } else {
        return val;
      }
    });
    props.setAssignments(nextAssignments);
  };

  const deleteAssignment = () => {
    props.setAssignments(
      props.assignments.filter((a) => a.id !== props.assignment.id)
    );
  };

  return (
    <div className={styles.assignment}>
      <button className={styles.checkContainer} onClick={setCompleted}>
        {props.assignment.isCompleted ? <BsCheckCircleFill /> : <div />}
      </button>

      <p
        className={
          props.assignment.isCompleted ? styles.textCompleted : styles.p
        }
      >
        {props.assignment.description}
      </p>

      <button className={styles.deleteButton} onClick={deleteAssignment}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
