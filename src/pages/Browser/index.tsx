import { useLocation } from 'react-router-dom';

function Browser() {
  const location = useLocation();
  const { from } = location.state || {}
  console.log(from,'接收的参数');
  
  return (
    <>22222</>
  )
}
export default Browser