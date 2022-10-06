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
        <Image
          src={imageString1}
          alt={props.photo1}
          width="1920"
          height="1080"
        />
        <Image
          src={imageString2}
          alt={props.photo2}
          width="1920"
          height="1080"
        />
      </div>
    );
  } else {
    return <div>Couldn&#39;t connect to database.</div>;
  }
};

export async function getServerSideProps() {
  try {
    const images = await getData();
    console.log('images', images);
    const photo1 = images[0].data.photo1base64;
    const photo2 = images[0].data.photo2base64;
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
