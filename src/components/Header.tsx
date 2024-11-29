import { useNavigate } from 'react-router-dom'
import { BsChevronLeft } from "react-icons/bs";

type HeadTypes = {
  title: string
}

function Header({
  title
}: HeadTypes) {
  const navigate = useNavigate()

  return (
    <div className='w-full h-11 bg-[#17171A] relative flex' onClick={() => {
      navigate(-1)
    }}>
      <div className='w-10 h-10 absolute left-0 flex items-center justify-center'>
        <BsChevronLeft className='text-white text-base' />
      </div>
      
      <div className=' h-11 flex justify-center items-center absolute left-1/2 transform -translate-x-1/2'>
        <span className='text-lg text-white'>{ title }</span>
      </div>
      
    </div>
  )
}
export default Header