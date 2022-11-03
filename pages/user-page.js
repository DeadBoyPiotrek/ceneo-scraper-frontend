import Link from 'next/link';
import styled from 'styled-components';
import { getCollectionsNames } from '../mongodb/dbFunctions';
import { deleteItemHandler, addItemHandler } from '../helpers/helpersFunctions';
import { useState } from 'react';
const Wrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  gap: 40px;
  text-align: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #15151b;
  color: white;
`;
const Products = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
`;
const Product = styled.div`
  display: flex;
`;
const WhiteBg = styled.div`
  background: white;
  color: black;
  border-radius: 10px;
  padding: 10px;
  margin: 0 5px;
`;
const Button = styled.button`
  color: white;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 5px;

  transition: all, cubic-bezier(0.075, 0.82, 0.165, 1), 0.3s;
  &:hover {
    transform: scale(1.3);
  }
  // change visibility to none after click
  // on click
`;

const Nav = styled.div`
  display: flex;
  gap: 50px;
  padding: 10px;
`;

const AddItem = styled.div`
  display: flex;
  input {
    border-radius: 10px;
    padding: 10px;
    border: none;
    font-family: inherit;
    margin-right: 5px;
  }
`;

const UserPage = props => {
  const [itemName, setItemName] = useState('');
  const [products, setProducts] = useState(props.items);

  const products2 = products.map((item, index) => (
    <Product key={index}>
      <WhiteBg>{item}</WhiteBg>
      <WhiteBg>
        <Button
          onClick={() => {
            deleteItemHandler(item);
            setProducts(products.filter(product => product !== item));
          }}
        >
          ❌
        </Button>
      </WhiteBg>
    </Product>
  ));

  return (
    <Wrapper>
      <h1>User Page</h1>
      <Products>{products2}</Products>
      <AddItem>
        <input
          placeholder="product name"
          onChange={e => setItemName(e.target.value)}
          type="text"
        />
        <WhiteBg>
          <Button
            onClick={() => {
              addItemHandler(itemName);
              () => setItemName('');
            }}
          >
            ✅
          </Button>
        </WhiteBg>
      </AddItem>

      <Nav>
        <Button>
          <Link href="/">Home Page</Link>
        </Button>
        <Button>
          <Link href="/api/auth/logout">Log Out </Link>
        </Button>
      </Nav>
    </Wrapper>
  );
};

export const getServerSideProps = async () => {
  //TODO: get items data from db
  const items = await getCollectionsNames();
  // console.log(items);
  return {
    props: { items },
  };
};

export default UserPage;
