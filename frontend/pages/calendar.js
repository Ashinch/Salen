import Header from '../component/Header'
import { Button, Divider } from '@geist-ui/react'
import { Activity, AtSign, Clock, Flag, Rss } from '@geist-ui/react-icons'
import CONFIG from '../config'
import CalView from '../component/CalView'

const onTabsSelected = (index) => {
  console.log('select ' + index)
}

const calendar = () => {
  return (
    <>
      <Header tabsNames={CONFIG.tabsNames.calendar} onTabsSelected={onTabsSelected} />
      <main className="container mx-auto px-5 my-24">
        {/* info */}
        <div className="border border-gray-100 p-5 rounded-md overflow-hidden shadow-lg">
          {/* title */}
          <div style={{ fontWeight: 'bold' }}>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-xl mb-5 sm:mb-0">LPL2020夏季赛赛程</h1>
              <div className="w-full sm:w-auto">
                <Button icon={<Rss />} type="secondary" ghost style={{ width: '100%' }}>订阅日历</Button>
              </div>
            </div>
          </div>
          {/* description */}
          <p className="text-sm my-5 break-words">
            发现 iOS 上的日历订阅挺好用的的日历 Gist 订阅源
            https://gist.githubusercontent.com/ChengLuffy/
            518e327cafeb0f87e066a51cc12b11de/raw/LPL2020.icstee.com/c20/raw/ 发现 iOS
            上的日历订阅挺好用的，至少查询这方面比打开一个软件等待响应快多了，也不用管大小写，没有那么多无用的信息。 iPhone 用户可以在 设置 -> 密码和账户 -> 添加账户 -> 其他 -> 添加已 订阅的日历
            Gist 订阅源
          </p>
          <Divider y={.5} />
          {/* display */}
          <div className="flex mt-5 sm:mt-5 flex-col items-center text-sm sm:flex-row sm:justify-between">
            <div className="w-full flex flex-wrap leading-10 sm:flex-row">
              {/* 1 */}
              <div className="w-1/2 sm:w-1/4 flex justify-center items-center border-r cursor-pointer">
                <AtSign size={20} color={'#2b2eeb'} />
                <span className="ml-1">Ashinch</span>
              </div>
              {/* 2 */}
              <div className="w-1/2 sm:w-1/4 flex justify-center items-center sm:border-r cursor-pointer">
                <Clock size={20} color={'#21a0c6'} />
                <span className="ml-1">2020/12/13</span>
              </div>
              {/* 3 */}
              <div className="w-1/2 sm:w-1/4 flex justify-center items-center border-r cursor-pointer">
                <Flag size={20} color={'#6f34c2'} />
                <span className="ml-1">438 订阅</span>
              </div>
              {/* 4 */}
              <div className="w-1/2 sm:w-1/4 flex justify-center items-center cursor-pointer">
                <Activity size={20} color={'green'} />
                <span className="ml-1">低延迟</span>
              </div>
            </div>
          </div>
        </div>
        {/* calendar */}
        <CalView />
      </main>
    </>
  )
}

export default calendar
