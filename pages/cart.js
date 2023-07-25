import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRouter } from 'next/router';
import { isAuthenticated } from "@/lib/auth";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
}
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 2px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
    padding: 10px;
}
`;

const Image = styled.img`
  max-width: 80px;
  max-height: 80px; 
`

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
}
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const Mid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 15px;
`

function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLogged(isAuthenticated());
  }, []);

  useEffect(() => {
    if (isLogged) {
      
      const authToken = localStorage.getItem("token");

      axios.get("/api/account", {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          })
        .then((response) => {
          const { email } = response.data;
          setEmail(email)
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, [isLogged]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      localStorage.removeItem('cart');
      clearCart();
    }
  }, [])

  function goToLogin() {
    router.push('/login');
  }

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const authToken = localStorage.getItem('token');
    const response = await axios.post('/api/checkout', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,
    },  {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    })
    const data = await response.data
    window.location.href = data.init_point
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Gracias por su pedido!</h1>
              <p>Le estaremos enviando un email cuando su pedido se envie.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Carrito</h2>
            {!cartProducts?.length && <div>Tu carrito esta vacio</div>}
            {products.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <Image src={product.images[0]} alt="Imagen de Producto" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>${total}</td>
                </tr>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && isLogged && (
            <Box>
              <h2>Informacion del pedido</h2>
                <Input
                    type="text"
                    placeholder="Nombre Completo"
                    value={name}
                    name="name"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                <Input
                    type="text"
                    placeholder="Calle"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="Ciudad"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Codigo Postal"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Pais"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <Button $block={true} $black={true} onClick={goToPayment}>
                  Continuar pagando
                </Button>
            </Box>
          )}
          {!!cartProducts?.length && !isLogged && (
            <Box>
              <Mid>
                <h2>Inicia sesion para pagar</h2>
                <Button $block={true} $primary={true} onClick={goToLogin}>
                    Iniciar sesion
                </Button>
              </Mid>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}

export default CartPage;
