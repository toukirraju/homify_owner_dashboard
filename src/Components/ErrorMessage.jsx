import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div>
      {/* <!-- error messege  start--> */}
      <div class="error__wrapper">
        <div class="error__container">
          <span class="error__message">{message}</span>
        </div>
        {/* <div class="error__btn">
          <span class="error__btn__icon">X</span>
        </div> */}
      </div>

      {/* <!-- error messege  end--> */}
    </div>
  );
};

export default ErrorMessage;
