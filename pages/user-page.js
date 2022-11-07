import Link from 'next/link';
import styled, { css } from 'styled-components';
import { getCollectionsNames } from '../mongodb/dbFunctions';
import { deleteItemHandler, addItemHandler } from '../helpers/helpersFunctions';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
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
const WhiteBgButton = styled(WhiteBg)`
  background: white;
  color: black;
  border-radius: 10px;
  padding: 10px;
  margin: 0 5px;
  &:before {
    width: 100%;
    background: #ffffff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: none;

    content: '🚔';
  }
  ${props =>
    props.user &&
    css`
      &:hover {
        transform: scale(1);
        &:before {
          display: block;
        }
      }
    `}
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

export default function UserPage(props) {
  const { user, error, isLoading } = useUser();
  const [itemName, setItemName] = useState('');
  const [products, setProducts] = useState(props.items);

  const products2 = products.map((item, index) => (
    <Product key={index}>
      <WhiteBg>{item}</WhiteBg>
      <WhiteBgButton user={!user}>
        <Button
          onClick={() => {
            deleteItemHandler(item);
            setProducts(products.filter(product => product !== item));
          }}
        >
          ❌
        </Button>
      </WhiteBgButton>
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
          value={itemName}
        />
        <WhiteBgButton user={!user}>
          <Button
            onClick={() => {
              addItemHandler(itemName);
              setItemName('');
            }}
          >
            ✅
          </Button>
        </WhiteBgButton>
      </AddItem>

      <Nav>
        <Button>
          <Link href="/">Home Page</Link>
        </Button>
      </Nav>
    </Wrapper>
  );
}

export const getServerSideProps = async () => {
  const items = await getCollectionsNames();

  return {
    props: { items },
  };
};

// export default UserPage;
