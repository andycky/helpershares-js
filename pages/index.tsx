import { InferGetStaticPropsType } from 'next';

type Data = {
  employers: [
    employer:{
      name: string;
      N: string;
    },
  ];
};

export const getStaticProps = async () => {
  const res = await fetch('https://script.google.com/macros/s/AKfycbyKW4XeaHWRlumGIyYzTsrdLtz8fOPJNufDf5fAabfDp7_iuwAIsWIdJnqyAJfEHhi6Ew/exec');
  const swapis: Data = await res.json();

  return {
    props: {
      swapis,
    },
  };
};

const FilmList = ({ swapis }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      {Object.entries(swapis.employers).map(([key,employer]) => (
          <p key={employer.name}>{employer.name}</p>
      ))}
    </>
  );
};

export default FilmList;
