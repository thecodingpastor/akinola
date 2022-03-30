import { useRef, useEffect } from "react";

import classes from "./Input.module.scss";

const Input = ({
  type,
  name,
  placeholder,
  required,
  id,
  autoComplete,
  onChange,
  value,
  style,
  innerStyle,
  className,
  label,
  element,
  options,
  defaultValue,
  border,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.style.height = "1rem";
    const scrollHeight = textareaRef.current?.scrollHeight;
    textareaRef.current?.style.height = scrollHeight + "px";
  }, [value]);

  const handleScrollClear = () => {
    textareaRef.current?.style.height = "1rem"
  }

  let elementToReturn;
  if (element === "autotextarea") {
    elementToReturn = (
      <>
      <textarea
        ref={textareaRef}
        name={name}
        id={id || ""}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required || ""}
        autoComplete={autoComplete || "off"}
        className={`${classes.AutoTextArea} ${border ? classes.border : ""}`}
        style={innerStyle}
      />
      <span onClick={handleScrollClear} className={classes.SpanClear}>Shrink height</span>
      </>
    );
  } else if (element === "textarea") {
    elementToReturn = (
      <textarea
        name={name}
        id={id || ""}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required || ""}
        autoComplete={autoComplete || "off"}
        className={border ? classes.border : ""}
        style={innerStyle}
      />
    );
  } else if (element === "select") {
    elementToReturn = (
      <select
        className={`${border ? classes.border : ""} ${classes.Input}`}
        onChange={onChange}
        name={name}
        required={required || ""}
        id={id || ""}
        defaultValue={defaultValue}
      >
        <option hidden>{defaultValue}</option>
        {options.map((opt) => (
          <option key={opt.label} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else {
    elementToReturn = (
      <input
        className={`${border ? classes.border : ""} ${classes.Input}`}
        type={type || "text"}
        name={name || ""}
        id={id || ""}
        required={required || ""}
        autoComplete={autoComplete || "off"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    );
  }
  return (
    <div
      className={`${className ? className : ""} ${classes.InputContainer}`}
      style={style}
    >
      {elementToReturn}
      {label && (
        <label htmlFor={id || ""} className={classes.Label}>
          {element === "autotextarea" && !value ? "" : element !== "select" ? label : value ? label : ""}
        </label>
      )}
    </div>
  );
};

export default Input;
