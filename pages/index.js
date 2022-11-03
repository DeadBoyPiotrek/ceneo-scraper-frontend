import Head from 'next/head';
import { getData } from '../mongodb/dbFunctions';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import Link from 'next/link';
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
  flex-wrap: wrap;
  color: #2e2f35;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
`;

const Column = styled.div`
  display: flex;
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
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  padding: 10px;
  ${shadow}
  transition: all, cubic-bezier(0.075, 0.82, 0.165, 1), 0.1s;
  &:hover {
    transform: scale(1.05);
  }

  button {
    background: none;
    border: none;
    color: inherit;
    font: inherit;
  }
`;
export default function Home({ items }) {
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
        <Link href="/user-page">
          <OptionsDiv>User Page / Edit products 👷</OptionsDiv>
        </Link>
        <OptionsDiv>
          <button>Scrape Now 🤖</button>
        </OptionsDiv>
      </Options>
      <Column>{itemsList}</Column>
    </Wrapper>
  );
}

export async function getServerSideProps() {
  try {
    const data = await getData();

    const items = data;

    return {
      props: { items },
    };
  } catch (err) {
    console.log('error', err);
    return { props: { connection: 'false' } };
  }
}
