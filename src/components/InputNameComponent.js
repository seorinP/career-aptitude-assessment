import React from "react";
import styled from "styled-components";

const InputField = styled.input`
  background-color: "#fff";
  font-family: 'Binggrae';
  border: #e0e0e0;
  :focus {
    color: #cbf;
    outline: none;
  }
  font-size: 1.27rem;
  padding: 24px;
  border-radius: 16px;
  border-width: 1px;
  color: #451919;
  margin: auto;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 2.3rem;
`;

const InputName = React.forwardRef((props, ref) => {

    return (
        <>
            <InputField 
                type='text'
                name="name"
                ref={ref}
                className={[
                    "form-control",
                    props.errors.name && "is-invalid",
                ].join(" ")}
                placeholder='ex) 김영희, Jasmine 등'
            />

            <div className="invalid-feedback">
                {props.errors.name?.message}
            </div>
        </>
    );
});

export default InputName;