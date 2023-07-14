import { styled } from "styled-components"

const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    margin: 3px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
`

function Input(props) {
  return (
    <StyledInput {...props} />
  )
}

export default Input