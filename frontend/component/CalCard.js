import { Activity } from '@geist-ui/react-icons'
import Link from 'next/link'

const getRandomColor = (seed) => {
  return '#D' + (((seed * 9301 + 49297) % 233280) / 233280.0 * 0xffff00 << 0)
    .toString(16)
    .substr(0, 5)
}

const CalCard = ({ id }) => {
  return (
    <>
      <style jsx>{`
        .day:after {
          position: absolute;
          bottom: 0;
          height: 100%;
          width: 110%;
          content: "";
          background: linear-gradient(to top,
          rgba(255, 255, 255, 1) 10%,
          rgba(255, 255, 255, 0) 60%);
          pointer-events: none;
        }
      `}</style>
      <Link href="/calendar">
        <div
          className="border border-gray-100 relative top-0 right-0 left-0 bottom-0 flex flex-col justify-between bg-white rounded-lg cursor-pointer transform transition-all shadow-lg hover:scale-105"
          style={{ height: 250 }}>
          {/* title */}
          <h2 className="z-10 flex-shrink-0 m-5 w-3/4 text-xl font-bold truncate">
            LPL2020夏季赛赛程
          </h2>
          {/* description */}
          <p className="flex-grow text-sm z-10 mx-5 overflow-ellipsis overflow-hidden text-gray-500">
            发现 iOS 上的日历订阅挺好用的，至少查询这方面比打开一个软件等待响应快多了，也不用管大小写，没有那么多无用的信息。 iPhone 用户可以在 设置 -> 密码和账户 -> 添加账户 -> 其他 -> 添加已
            订阅的日历 Gist 订阅源 https://gist.githubusercontent.com/ChengLuffy/
            518e327cafeb0f87e066a51cc12b11de/raw/LPL2020.icstee.com/c20/raw/ 发现 iOS
            上的日历订阅挺好用的，至少查询这方面比打开一个软件等待响应快多了，也不用管大小写，没有那么多无用的信息。 iPhone 用户可以在 设置 -> 密码和账户 -> 添加账户 -> 其他 -> 添加已 订阅的日历
            Gist 订阅源
            https://gist.githubusercontent.com/ChengLuffy/518e327cafeb0f87e066a51cc12b11de/raw/LPL2020.icstee.com/c20/raw/
          </p>
          {/* latest event */}
          <div className="flex-shrink-0 px-5 py-4 flex flex-col justify-center text-gray-800">
            {/* event closest */}
            <div className="flex flex-row items-center">
              <span className="flex-shrink-0 inline-block mr-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: getRandomColor(id) }} />
              <p className="text-xs font-bold truncate">
                败者组1/4决赛 TES VS RNG 2:3
              </p>
              <div className="text-xs flex flex-shrink-0 items-center ml-3 px-2 py-0 bg-gray-50 border rounded-full">
                <p>三天前</p>
              </div>
            </div>
            {/* event latest */}
            <div className="flex flex-row items-center mt-1">
              <span className="flex-shrink-0 inline-block mr-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: getRandomColor(id) }} />
              <p className="text-xs font-bold truncate">
                总决赛 JDG VS SN
              </p>
              <div className="text-xs flex flex-shrink-0 items-center ml-3 px-2 py-0 bg-gray-50 border rounded-full">
                <p>2020/11/23</p>
              </div>
            </div>
          </div>
          {/* footer */}
          <div className="flex-shrink-0 px-5 flex flex-row items-center justify-between h-11 border-t text-gray-600">
            {/* left */}
            <div className="flex items-center">
              {/* icon */}
              <div className="rounded-full bg-black h-4 w-4 mr-1" />
              {/* author category */}
              <p className="text-sm">Ashinch</p>
            </div>
            {/* right */}
            <div className="flex items-center">
              {/* icon */}
              <div className="text-green-600 flex justify-center items-center w-5 h-5 mr-1">
                <Activity />
              </div>
              {/* ago */}
              <p className="text-sm">赛事</p>
            </div>
          </div>
          {/* float day */}
          <div className="day absolute top-0 right-5 z-0 text-9xl font-bold italic select-none"
               style={{ color: getRandomColor(id) }}>
            <div>{id}</div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default CalCard
