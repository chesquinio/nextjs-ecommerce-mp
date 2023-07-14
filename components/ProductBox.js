import { styled } from "styled-components"
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`

`

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding:20px;
    height: 120px;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:10px;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 80px;
`

const Title = styled(Link)`
    font-weigth: normal;
    font-size: .9rem;
    margin:0;
    color: inherit;
    text-decoration: none;
`

const ProductInfoBox = styled.div`
    margin-top: 5px;
`

const PriceRow = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-top: 2px;
`

const Price = styled.span`
    font-size: 1.5rem;
    font-weight:500;
`

function ProductBox({_id, title, description, price, images}) {
    const url = '/products/'+_id;
    const {addProduct} = useContext(CartContext)
  return (
    <ProductWrapper>
        <WhiteBox href={url}>
            <div>
                <Image src={images?.[0]} />
            </div>
        </WhiteBox>
        <ProductInfoBox>
            <Title href={url}>{title}</Title>
            <PriceRow>
                <Price>
                    ${price}
                </Price>
                <Button onClick={() => addProduct(_id)} $primary={true} $outline={true}><CartIcon/></Button>
            </PriceRow>
        </ProductInfoBox>
    </ProductWrapper>
  )
}

export default ProductBox