import HomeContainer from '@containers/HomeContainer';
import HeroContainer from '@containers/HeroContainer';

async function getMemesList() {
  const maxRetries = 5;
  let retries = 0;
  let response;
  try {
    do {
      response = await fetch(`${process.env.baseUrl}/api/memes`, { next: { revalidate: 60 } });

      if (response.status === 200) {
        const { data } = await response.json();
        return data.memes
      }

      retries++;
    } while (retries < maxRetries);
  } catch (error) {
    console.error(`Data fetch attempt ${retries} failed. Retrying...`, (error as Error));
  }

  return new Error('Failed to fetch data after 5 attempts');
}

export default async function Home() {
  const memes = await getMemesList();

  return (
    <div className='flex flex-col justify-center sm:w-full xs:w-auto'>
      <HomeContainer />
      <HeroContainer memeList={memes} />
    </div>
  )
}
