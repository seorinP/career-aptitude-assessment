import React from "react";
import styled from "styled-components";

const InputField = styled.input`
    width: 100%;
    border: 1px solid #6B3FA0;
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-family: 'Binggrae';
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`

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