// import Head from 'next/head';
import { getData } from '../mongodb/dbFunctions';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { scrapeNowHandler } from '../helpers/helpersFunctions.js';
import { getCollectionsNames } from '../mongodb/dbFunctions';
import { useUser } from '@auth0/nextjs-auth0';
const shadow = css`
  -webkit-box-shadow: 8px 8px 24px 0px rgba(24, 24, 24, 1);
  -moz-box-shadow: 8px 8px 24px 0px rgba(24, 24, 24, 1);
  box-shadow: 8px 8px 24px 0px rgba(24, 24, 24, 1);
`;

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  color: #2e2f35;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
`;

const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ItemSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  background: #2e2f35;
  color: white;
  border-radius: 10px;
  padding: 30px;
  margin: 20px;
  display: inline-block;
  width: 400px;
  min-height: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${shadow}
`;
const ImageWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  width: 300px;
  height: 200px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 300px;
    max-height: 200px;
  }
  ${shadow}
  transition: all, cubic-bezier(0.075, 0.82, 0.165, 1), 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.div`
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  ${shadow}
`;
const Price = styled.div`
  font-weight: 600;
  padding: 10px;
  border-radius: 10px;
  ${shadow}
`;
const DateDiv = styled.div`
  font-weight: 600;
  text-align: center;
`;

const DateSpan = styled.span`
  font-size: large;
  color: #ff6400;
`;
const CeneoSpan = styled.span`
  color: #ff6400;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  background: #2e2f35;
  color: white;
  margin: 20px;
  padding: 30px;
  border-radius: 10px;
  gap: 20px;
`;
const OptionsDiv = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  padding: 10px;
  ${shadow}
  transition: all, cubic-bezier(0.075, 0.82, 0.165, 1), 0.1s;

  &:before {
    width: 100%;
    height: 100%;
    background: #2e2f35;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // center text vertically

    justify-content: center;
    align-items: center;
    display: none;

    cursor: auto;
    content: 'Log in 🚔';
  }

  // add before element

  &:hover {
    transform: scale(1.05);
  }
  // if props is true then add hover effect
  ${props =>
    props.user &&
    css`
      &:hover {
        transform: scale(1);
        &:before {
          display: flex;
        }
      }
    `}

  button {
    background: none;
    border: none;
    color: inherit;
    font: inherit;
  }
`;
export default function Home({ items, collectionsNames }) {
  const { user, error, isLoading } = useUser();

  // if (user) {
  //   // change OptionsDiv style to display: none
  //   OptionsDiv.style.display = 'none';
  // }

  const itemsList = items.map((array, index) => {
    const dateScrapedDate = new Date(array[0].date);
    const dateScraped = dateScrapedDate.toLocaleString('pl-PL');
    return (
      <ItemSection key={index}>
        <DateDiv>
          Data scraped at <DateSpan>{dateScraped}</DateSpan>
        </DateDiv>
        {array[0].data.map(item => (
          <Item key={item.itemTitle}>
            <a href={item.itemLink} target="blank">
              <ImageWrapper>
                <Image
                  src={item.itemImage.url}
                  alt={item.itemTitle}
                  quality={100}
                  width={item.itemImage.width}
                  height={item.itemImage.height}
                ></Image>
              </ImageWrapper>
            </a>

            <Title>{item.itemTitle}</Title>
            <Price>{item.itemPrice}zł</Price>
          </Item>
        ))}
      </ItemSection>
    );
  });

  return (
    <Wrapper>
      <h1>
        <CeneoSpan>Ceneo </CeneoSpan>
        Scraper
      </h1>
      <Options>
        <OptionsDiv>
          <Link href="/user-page">User Page / Edit products 👷</Link>
        </OptionsDiv>
        <OptionsDiv user={!user}>
          <button
            onClick={() => {
              scrapeNowHandler(collectionsNames);
            }}
          >
            Scrape Now 🤖
          </button>
        </OptionsDiv>
        {!user && (
          <OptionsDiv>
            <Link href="/api/auth/login">Log in 🤗</Link>
          </OptionsDiv>
        )}
        {user && (
          <OptionsDiv>
            <Link href="/api/auth/logout">Log out 🫡</Link>
          </OptionsDiv>
        )}
      </Options>
      <Columns>{itemsList}</Columns>
    </Wrapper>
  );
}

export async function getServerSideProps() {
  try {
    const data = await getData();

    const items = data;
    const collectionsNames = await getCollectionsNames();

    return {
      props: { items, collectionsNames },
    };
  } catch (err) {
    console.log('error', err);
    return { props: { connection: 'false' } };
  }
}
