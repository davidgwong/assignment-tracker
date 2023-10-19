import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";

type AssignmentProp = {
  id: number;
  description: string;
  isCompleted: boolean;
  dueDate: Date | undefined;
};

type Props = {
  assignment: AssignmentProp;
  key: number;
  assignments: AssignmentProp[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentProp[]>>;
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

  const dateToday = new Date();

  const dateDiff = () => {
    if (props.assignment.dueDate != undefined) {
      return Math.ceil(
        (props.assignment.dueDate.getTime() - dateToday.getTime()) /
          (1000 * 60 * 60 * 24)
      );
    } else return 0;
  };

  const isDueUrgent = () => {
    if (dateDiff() <= 1) return true;
    else return false;
  };

  const dueDateDisplay = () => {
    if (dateDiff() == 1) return "Tomorrow";
    else if (dateDiff() == 0) return "Today";
    else if (dateDiff() == -1) return "Yesterday";
    else if (dateDiff() < -1) {
      return -dateDiff() + " days ago";
    } else if (dateDiff() > 1) {
      return dateDiff() + " days";
    } else {
      return "";
    }
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

      {!props.assignment.isCompleted && (
        <p className={isDueUrgent() ? styles.dueUrgent : styles.dueDate}>
          Due: {dueDateDisplay()}
        </p>
      )}

      <button className={styles.deleteButton} onClick={deleteAssignment}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
