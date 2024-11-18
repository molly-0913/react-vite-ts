import { useLocation } from 'react-router-dom';

function Browser() {
    const location = useLocation();
    const { from } = location.state || {}
    console.log(from,'接收的参数');
  
    return (
        <>
            <div>浏览器页面</div>
        </>
    )
}
export default Browser