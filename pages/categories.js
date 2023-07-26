import Center from '@/components/Center'
import Header from '@/components/Header'
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from '@/components/ProductsGrid';
import { styled } from 'styled-components';
import Link from 'next/link';

const Title = styled.h2`
  display: inline-block;
  margin-right: 20px;
`

const CategoryLink = styled(Link)`
  text-decoration: none;
  color: #888;
  font-size: 15px;
`

function CategoriesPage() {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  
  useEffect(() => {
    showCategories()
  }, []);

  async function showCategories() {
    const response = await axios.get("/api/categories");
    setCategoriesWithProducts(response.data);
  } 

  return (
    <>
      <Header />
      <Center>
        {categoriesWithProducts.map((category) => (
          <div key={category._id}>
            <Title>{category.name}</Title>
            <CategoryLink href={`/categories/${category.name}`}>mostrar mas...</CategoryLink>
            <ProductsGrid products={category.products} showButton={true} category={category}/>
          </div>
        ))}
      </Center>
    </>
  )
}

export default CategoriesPage