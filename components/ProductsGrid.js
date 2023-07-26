import { styled } from "styled-components";
import ProductBox from "./ProductBox";
import Link from "next/link";
import ArrowIcon from "./icons/Arrow";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: #888;
  cursor: pointer;
`;

const DivButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
  background-color: #e0e0e0;
  border-radius: 10px;
  color: #888;
`

const StyledProductContainer = styled.div`
  grid-column-end: ${({ productCount }) =>
    productCount < 4 ? "" : "auto"};
`;

function ProductsGrid({ products, category, showButton = false }) {
  const productCount = products.length;
  const productsToShow = showButton ? Math.min(3, productCount) : productCount;

  return (
    <StyledProductsGrid>
      {products.slice(0, productsToShow).map((product) => (
        <StyledProductContainer key={product._id} productCount={productCount}>
          <ProductBox {...product} />
        </StyledProductContainer>
      ))}
      {showButton && productCount > 3 && (
        <StyledProductContainer productCount={productCount}>
          <DivButton>
            <ButtonLink href={`/categories/${category.name}`}>Ver todo</ButtonLink>
          </DivButton>
        </StyledProductContainer>
      )}
    </StyledProductsGrid>
  );
}

export default ProductsGrid;
