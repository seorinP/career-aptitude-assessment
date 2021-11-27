// import React from "react";
// import styled from "styled-components";

// const RadioInputWrapper = styled.div`
//   font-size: 1.0625rem;
//   font-family: sans-serif;
//   label {
//     display: inline-block;
//     background-color: #e8eeef;
//     padding: 10px 20px;
//     font-family: sans-serif, Arial;
//     font-size: 16px;
//     border-radius: 4px;
//     margin: 20px;
//   }
//   label:hover {
//     background-color: #f4f7f8;
//   }
//   input {
//     opacity: 0;
//     position: fixed;
//     width: 0;
//   }
//   input:checked + label {
//     background: #1abc9c;
//   }
// `;

// const GenderRadioButton = React.forwardRef((props, ref) => {
//     return (
//       <RadioInputWrapper>
//         <input 
//              type='radio'
//              name='gender'
//              className="form-check-input"
//              value='100323'
//              ref={ ref }
//              checked={select === '100323'}
//              onChange={(event) => handleSelectChange(event)}
//         />
//         <label>남자</label>

//         <input
//           type='radio'
//           name='gender'
//           className="form-check-input"
//           value='100324'
//           ref={ ref }
//           checked={select === '100324'}
//           onChange={(event) => handleSelectChange(event)}
//         />
//         <label>newcomer</label>
//       </RadioInputWrapper>
//     );
// })


// export default GenderRadioButton;





import React, {
  useMemo,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect
} from "react";
import "./styles.css";
import styled, { css } from "styled-components";
import { useSpring, animated, config } from "react-spring";

const RadioGroupContext = React.createContext(null);

const StyledRadioGroup = styled.div`
  background-color: #f3f4f6;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  position: relative;
  overflow: visible;
  white-space: nowrap;

  :focus-within::after {
    content: "";
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #00aaff;
  }
`;

const WhiteBackground = styled(animated.div)`
  position: absolute;
  top: -1px;
  bottom: -1px;
  /* left: ${props => props.left || 0}px;
  width: ${props => props.width || 0}px; */
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 2px 0px 0px rgb(229, 231, 235);
  /* transition: left 300ms; */
`;

const RadioLabel = styled.label`
  cursor: pointer;
  min-width: 102px;
  color: #3b424e;
  padding: 14px 10px;
  display: inline-block;
  position: relative;
  border-radius: 12px;
  transition: color 300ms;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
  ${props =>
    !props.selected &&
    css`
      :first-child::before {
        content: none;
      }
      :not(:nth-child(2)):not(:hover)::before {
        content: "";
        position: absolute;
        left: 0;
        top: 13px;
        bottom: 13px;
        width: 1px;
        background-color: #d8dbe1;
      }
    `}
  :hover {
    /* background-color: white; */
    color: #00aaff;
  }

  &&&:hover + & {
    ::before {
      background-color: transparent;
    }
  }

  ${props =>
    props.selected
      ? css`
          /* background-color: white; */
          color: #00aaff;
          ::before {
            background-color: transparent;
          }
          &&& + & {
            ::before {
              background-color: transparent;
            }
          }
        `
      : ""}
`;

const RadioInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

const RadioButton = ({ children, value }) => {
  const { name, value: selectedValue, onChange, onMouseOver } = useContext(
    RadioGroupContext
  );
  return (
    <RadioLabel
      selected={value && selectedValue === value}
      onMouseOver={onMouseOver}
    >
      <RadioInput
        name={name}
        value={value}
        checked={value && value === selectedValue}
        onChange={onChange}
        type="radio"
      />
      {children}
    </RadioLabel>
  );
};

const RadioGroup = ({ name, value, onChange, children, options }) => {
  const [active, setActive] = useState();
  const [current, setCurrent] = useState();
  const groupRef = useRef();
  const onMouseOut = useCallback(() => {
    if (active) {
      setCurrent(active);
    } else {
      // setCurrent((cur) => ({ left: cur.left }));
      setCurrent(null);
    }
  }, [active, setCurrent]);
  const animations = useSpring({
    left: current?.left || 0,
    width: current?.width || 0,
    config: { ...config.stiff }
  });
  const onMouseOver = useCallback(
    e => {
      const leftRect = e.target.getBoundingClientRect();
      const targetLeft = leftRect.left;
      const containerLeft = groupRef.current.getBoundingClientRect().left;
      setCurrent({ left: targetLeft - containerLeft, width: leftRect.width });
    },
    [groupRef]
  );
  const wrappedOnChange = useCallback(
    e => {
      const rect = e.target.parentNode.getBoundingClientRect();
      const containerLeft = groupRef.current.getBoundingClientRect().left;
      setActive({ left: rect.left - containerLeft, width: rect.width });
      setCurrent({ left: rect.left - containerLeft, width: rect.width });
      e.persist();
      onChange(e);
    },
    [onChange]
  );
  const values = useMemo(
    () => ({ name, value, onChange: wrappedOnChange, onMouseOver }),
    [name, value, wrappedOnChange, onMouseOver]
  );
  return (
    <StyledRadioGroup ref={groupRef} onMouseOut={onMouseOut}>
      <WhiteBackground {...current} style={animations} />
      <RadioGroupContext.Provider value={values}>
        {options.map(({ label, value }) => (
          <RadioButton value={value}>{label}</RadioButton>
        ))}
      </RadioGroupContext.Provider>
    </StyledRadioGroup>
  );
};


const GenderRadioButton = React.forwardRef((props, ref) => {
    const [select, setSelect] = useState('');
    const [value, setValue] = useState("");

    const handleSelectChange = (event) => {
      const value = event.target.value;
      setSelect(value);
    };

    return (
        <>
            <RadioGroup
                value={value}
                onChange={e => setValue(e.target.vaule)}
                name = 'duration'
                options = {[
                    { label : '남자', value:'100323' },
                    { label : '여자', value:'100324' }
                ]}
            >
                <RadioButton 
                    type='radio'
                    name='gender'
                    className="form-check-input"
                    value="100323"
                    ref={ ref }
                    checked={select === '100323'}
                    onChange={(event) => handleSelectChange(event)}
                >
                    남자
                </RadioButton>

                <RadioButton 
                    type='radio'
                    name='gender'
                    className="form-check-input"
                    value='100324'
                    ref={ ref }
                    checked={select === '100324'}
                    onChange={(event) => handleSelectChange(event)}
                >
                    여자
                </RadioButton>
            </RadioGroup>
        </>
    );
});

export default GenderRadioButton;