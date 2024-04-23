import React from "react";

const TextInput = ({ title, errors, touched, ...rest }) => {
  return (
    <div className="w-full text-sm font-normal text-gray-500 dark:text-slate-300">
      <label htmlFor="firstname">{title}</label>
      <input
        {...rest}
        className={
          errors && touched
            ? "input-error w-full bg-gray-300 p-1 px-2 dark:bg-slate-700"
            : "w-full bg-gray-300 p-1 px-2 dark:bg-slate-700"
        }
      />
      {errors && touched && (
        <span className="mx-1 w-full text-xs text-red-500">{errors}</span>
      )}
    </div>
  );
};

export default TextInput;
