import Link from "next/link"
import { styled } from "styled-components"
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";

const SyledHeader = styled.header`
    background-color:#444;
`;
const Logo = styled(Link)`
    color:#fff;
    text-decoration:none;
    position: relative;
    z-index: 3;
`;

const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;
    padding: 20px 0;
`;

const StyledNav = styled.nav`
    ${props => props.$navActive ? 'display: block;' : 'display: none;'}
    gap: 15px;
    position : fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 70px 20px 20px;
    background-color: #444;
    @media screen and (min-width: 768px) {
        display: flex;
        position: static;
        padding: 0;
    }
`

const NavLink = styled(Link)`
    display: block;
    color:#aaa;
    text-decoration:none;
    padding: 10px 0;
    @media screen and (min-width: 768px) {
        padding: 0;
    }
`

const NavButton = styled.button`
    background-color: transparent;
    width: 40px;
    heigth: 40px;
    border: 0;
    color: white;
    cursor: pointer;
    z-index: 3;
    @media screen and (min-width: 768px) {
        display: none;
    }
`

function Header() {
    const {cartProducts} = useContext(CartContext)
    const [navActive, setNavActive] = useState(false)

  return (
    <SyledHeader>
        <Center>
            <Wrapper>
                <Logo href={'/'}>Tienda</Logo>
                <StyledNav $navActive={navActive}>
                    <NavLink href={'/'}>Inicio</NavLink>
                    <NavLink href={'/products'}>Productos</NavLink>
                    <NavLink href={'/categories'}>Categorias</NavLink>
                    <NavLink href={'/account'}>Perfil</NavLink>
                    <NavLink href={'/cart'}>Carrito ({cartProducts.length})</NavLink>
                </StyledNav>
                <NavButton onClick={() => setNavActive(prev => !prev)}>
                    <BarsIcon/>
                </NavButton>
            </Wrapper>
        </Center>
    </SyledHeader>
  )
}

export default Header