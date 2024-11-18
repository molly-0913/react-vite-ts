import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { increment, decrement, addNum } from "@/store/reducer/counterReducer"
import { Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';


function Home() {
    const count = useAppSelector((state) => state.counter.count)
    const ax = useAppSelector((state) => state.counter.ax)
    const lang = useAppSelector((state) => state.common.lang)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return (
        <div>
            <span className="home_span">1111 == {count}</span>
            <div onClick={() => dispatch(increment())}>+</div>
            <div onClick={() => dispatch(decrement())}>-</div>
            <div onClick={() => dispatch(addNum())}>222 {ax} + </div>
            <div>当前的语言 {lang}</div>
            <div className="home_div">
                <span>scss</span>
            </div>
            <div className="flex justify-center w-16 md:w-32 lg:w-48 bg-[pink] md:bg-slate-400">
                <span className="text-base">tailwincss</span>
            </div>
            <Button block color='primary' size='large' onClick={() => {
                navigate(`/browser`, {
                    state: {
                        from: 'home'
                    }
                })
            }}>
                Block Button
            </Button>
        </div>
    )
}
export default Home