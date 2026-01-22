import HeroCarousel from './carousel'

const categories = ({ data }: { data: string }) => {
  return (
    <div className="bg-white relative overflow-hidden h-[900px] z-30">
        <div className='flex flex-col justify-center items-center my-[40px]'>
          <h1 className="text-[50px] font-medium w-[465px] text-center">Shop By Intention</h1>
          <p className=" text-[20px] text-center">Pieces defined by natural beauty, vibrant energy,<br/> and a refined sense of timeless elegance.</p>
          <HeroCarousel/>
        </div>
    </div>
  )
}

export default categories