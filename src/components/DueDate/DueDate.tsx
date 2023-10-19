import styles from "./duedate.module.css";
import "react-day-picker/dist/style.css";

import { format, isValid, parse } from "date-fns";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import React, { ChangeEventHandler, useRef, useState } from "react";

import { usePopper } from "react-popper";

type Props = {
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>
};

export default function DueDate(props: Props) {
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      props.setSelectedDate(date);
    } else {
      props.setSelectedDate(undefined);
    }
  };

  const handleButtonClick = () => {
    setIsPopperOpen(!isPopperOpen);
  };

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    props.setSelectedDate(date);
    if (date) {
      props.setInputValue(format(date, "y-MM-dd"));
      closePopper();
    } else {
      props.setInputValue("");
    }
  };

  return (
    <div>
      <div ref={popperRef}>
        <input
          size={12}
          type="text"
          placeholder={format(new Date(), "y-MM-dd")}
          value={props.inputValue}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button
          ref={buttonRef}
          type="button"
          aria-label="Due date"
          onClick={handleButtonClick}
          className={styles.button}
        >
          Due date
        </button>
      </div>
      {isPopperOpen && (
        <div
          tabIndex={-1}
          style={popper.styles.popper}
          className="dialog-sheet"
          {...popper.attributes.popper}
          ref={setPopperElement}
          role="dialog"
          aria-label="DayPicker calendar"
        >
          <DayPicker
            className={styles.daypicker}
            initialFocus={isPopperOpen}
            mode="single"
            defaultMonth={props.selectedDate}
            selected={props.selectedDate}
            onSelect={handleDaySelect}
            modifiersClassNames={{
              today: styles.today
            }}
          />
        </div>
      )}
    </div>
  );
}
