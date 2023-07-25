import { css, styled } from "styled-components"
import { primary } from "@/lib/colors"

export const ButtonStyle = css`
  border:0;
  padding:5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  aling-items:center;
  text-decoration:none;
  svg {
    height: 16px;
    margin-right:5px;
  }
  ${props => props.$white && !props.$outline && css`
    background-color: #fff;
    color:#000;
  `}
  ${props => props.$white && props.$outline && css`
    background-color: transparent;
    color:#fff;
    border: 1px solid #fff;
  `}
  ${props => props.$black && !props.$outline && css`
    background-color: #000;
    color:#fff;
  `}
  ${props => props.$black && props.$outline && css`
    background-color: transparent;
    color:#000;
    border: 1px solid #000;
  `}
  ${props => props.$primary && !props.$outline && css`
    background-color: ${primary};
    color:#fff;
    border: 1px solid  ${primary};
  `}
  ${props => props.$primary && props.$outline && css`
    background-color: transparent;
    color: ${primary};
    border: 1px solid  ${primary};
  `}
  ${props => props.$size === 'l' && css`
      text-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
  `}
  ${props => props.$block && css`
      display:blox;
      width: 100%;
      justify-content: center;
  `}
`

const StyledButton = styled.button`
    align-items: center;
    font-family: 'Poppins';
    ${ButtonStyle}
`

function Button({children, ...rest}) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}

export default Button