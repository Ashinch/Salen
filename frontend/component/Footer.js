import CONFIG from '../config'

const Footer = () => {
  return (
    <>
      <div className="z-50 fixed flex flex-col sm:flex-row items-center justify-center bottom-0 w-full h-10 bg-white border-t">
        <p className="text-gray-400 text-xs font-light text-center">
          {CONFIG.title} is Open source from
          <a className="border-b" href="https://github.com/Ashinch/Salen" target="_blank"> GitHub</a>
                         . Proudly deployed on
          <a className="border-b" href="https://vercel.com/" target="_blank"> ▲Vercel.</a>
        </p>
        <p className="text-gray-400 text-xs font-light text-center ml-1">
          Copyright © 2021 Ashinch
          <a className="border-b" href="https://beian.miit.gov.cn/" target="_blank"> 桂ICP备18011166号-2</a>.
        </p>
      </div>
    </>
  )
}

export default Footer
