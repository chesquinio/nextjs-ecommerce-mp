import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";
import Header from "@/components/Header";
import Center from "@/components/Center";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-top: 20px;
  text-align: center;
`;

const BoxAccount = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-top: 20px;
`;

const LinkText = styled(Link)`
  text-decoration: none;
  background-color: #88f;
  color: #fff;
  padding: 4px 10px;
  border-radius: 5px;
`;

const FlexDiv = styled.div`
  display: grid;
  grid-template-row: 1fr 1fr;
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  text-align: center;
  padding-top: 10px;
  border-bottom: 1px solid #ccc;
  @media screen and (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const DivItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  text-align: center;
  padding: 25px 0 10px 0;
  border-bottom: 1px solid #eee;
  @media screen and (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const DivProductItem = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 10px;
  @media screen and (min-width: 768px) {
    gap: 20px;
    justify-content: flex-start;
    flex-direction: row;
  }
`;

const Span = styled.span`
  display: none;
  @media screen and (min-width: 768px) {
    display: inline;
  }
`;

/*
const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const Th = styled.th`
  border-bottom: 1px solid #666;
  height: 30px;
`;

const Td = styled.td`
  border-bottom: 1px solid #ccc;
  height: 60px;
  text-align: center;
  font-size: 15px;
`;
*/
function Perfil() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    setIsLogged(isAuthenticated());
  }, []);

  useEffect(() => {
    if (isLogged) {
      const authToken = localStorage.getItem("token");

      axios
        .get("/api/account", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          const { name, email, orders } = response.data;
          setUserName(name);
          setUserEmail(email);
          setUserOrders(orders);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, [isLogged]);

  if (!isLogged) {
    return (
      <>
        <Header />
        <Center>
          <Box>
            <LinkText href={"/login"}>
              No iniciaste sesion, hazlo aqui!
            </LinkText>
          </Box>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <BoxAccount>
          <h2>Bienvenido, {userName} </h2>
          <p>Email: {userEmail}</p>
        </BoxAccount>
        <h3>Mis Pedidos:</h3>
        {userOrders.length > 0 && (
          <BoxAccount>
            <FlexDiv>
              <Div>
                <span>Productos</span>
                <Span>Fecha</Span>
                <span>Direccion</span>
              </Div>
              {userOrders.map((userOrder) => (
                <DivItem key={userOrder._id}>
                  <div>
                    {userOrder.line_items.map((lineItem, indexItem) => (
                      <DivProductItem key={indexItem}>
                        <span>
                          {lineItem.title} x {lineItem.quantity}
                        </span>
                        <span>${lineItem.unit_price * lineItem.quantity}</span>
                      </DivProductItem>
                    ))}
                  </div>
                  <Span>
                    {new Date(userOrder.createdAt).toLocaleDateString()}
                  </Span>
                  <span>
                    {userOrder.streetAddress}, {userOrder.city},{" "}
                    {userOrder.country}
                  </span>
                </DivItem>
              ))}
            </FlexDiv>
          </BoxAccount>
        )}

        {!userOrders.length > 0 && (
          <BoxAccount>
            <h3>No has realizado ningun pedido</h3>
          </BoxAccount>
        )}
      </Center>
    </>
  );
}
export default Perfil;
