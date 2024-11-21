import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { increment, decrement, addNum } from "@/store/reducer/counterReducer"
import { Button } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { getBulletins } from "@/api/bulletin"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import i18n from '@/i18n'
import Header from "@/components/Header"
import useWindowSize from "@/hooks/useWindowSize"


function Home() {
  const { t } = useTranslation()
  const count = useAppSelector((state) => state.counter.count)
  const ax = useAppSelector((state) => state.counter.ax)
  const lang = useAppSelector((state) => state.common.lang)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { width, height } = useWindowSize()

  useEffect(() => {
    getBulletins({type: 1}).then(res => {
      console.log(res,'res=======')
    })
  }, [])

  return (
    <div>
      <Header/>
      <span className="home_span">1111 == {count}</span>
      <div onClick={() => dispatch(increment())}>+</div>
      <div onClick={() => dispatch(decrement())}>-</div>
      <div onClick={() => dispatch(addNum())}>222 {ax} + </div>
      <div>当前的语言 {lang}</div>
      <div className="home_div">
        <span>scss</span>
      </div>
      <div className="flex justify-center w-16 md:w-32 lg:w-48 bg-[pink] md:bg-slate-400">
        <span className="text-[33px]">tailwincss</span>
      </div>
      <div>
        <span>多语言 {t('home_title')}</span>
        <p className="my-2" onClick={() => {
          i18n.changeLanguage(i18n.language.includes('en') ? 'zh_CN' : 'en_US')
        }}>
          点击切换语言
        </p>
      </div>
      <div className="mb-3">
        hooks -- {width} {height}
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