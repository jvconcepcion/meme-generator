import HomeContainer from '@containers/HomeContainer';
import HeroContainer from '@containers/HeroContainer';

export default function Home() {
  return (
    <div className='flex flex-col justify-center sm:w-full xs:w-auto'>
      <HomeContainer />
      <HeroContainer />
    </div>
  )
}
