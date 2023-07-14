import { styled } from "styled-components"

const SyledDiv = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`

function Center({children}) {
  return (
    <SyledDiv>{children}</SyledDiv>
  )
}

export default Center