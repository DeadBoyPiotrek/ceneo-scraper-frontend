import { getData } from '../mongodb/dbFunctions';
import Image from 'next/image';
const PhotosPage = props => {
  const date = new Date(props.date);

  if (props?.photo1) {
    const imageString1 = `data:image/png;base64,${props.photo1}`;
    const imageString2 = `data:image/png;base64,${props.photo2}`;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Screenshots taken at {date.toLocaleString('pl-PL')}
        </h1>
        <Image src={imageString1} alt="Red dot" width="1920" height="1080" />
        <Image src={imageString2} alt="Red dot" width="1920" height="1080" />
      </div>
    );
  } else {
    return <div>Couldn&#39;t connect to database.</div>;
  }
};

export async function getServerSideProps(context) {
  try {
    const images = await getData();

    const photo1 = images[0].data.photo1dot2;
    const photo2 = images[0].data.photo2dot2;
    const date = images[0].date;

    return {
      props: { photo1, photo2, date },
    };
  } catch (err) {
    console.log('error', err);
    return { props: { connection: 'false' } };
  }
}

export default PhotosPage;
