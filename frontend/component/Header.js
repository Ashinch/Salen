import Head from 'next/head'
import Tabs from '../component/Tabs'
import { Button, Input, Modal, Popover, Spacer, useBodyScroll } from '@geist-ui/react'
import { Calendar, Code, Database, Divider, LogOut, Menu, Search } from '@geist-ui/react-icons'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import Link from 'next/link'

// Menu modal content
const menuContent = () => (
  <div
    className="absolute right-0 w-36 pt-2flex flex-col flex-nowrap items-center justify-center text-center bg-white border rounded-md shadow-2xl">
    <Link href="/overview">
      <div className="cursor-pointer">
        <Spacer y={.4} />
        <Popover.Item>
          <Database size={20} /><span className="pl-2">概览</span>
        </Popover.Item>
      </div>
    </Link>
    <Popover.Item line />
    <div className="cursor-pointer">
      <Popover.Item>
        <Calendar size={20} /><span className="pl-2">分享日历</span>
      </Popover.Item>
    </div>
    <div className="cursor-pointer">
      <Popover.Item>
        <Code size={20} /><span className="pl-2">Beta 0.0.1</span>
      </Popover.Item>
    </div>
    <Popover.Item line />
    <div className="cursor-pointer">
      <Popover.Item>
        <LogOut size={20} /><span className="pl-2">退出登录</span>
      </Popover.Item>
      <Spacer y={.4} />
    </div>
  </div>
)

const Header = ({ tabsNames, tabsSelected, onTabsSelected }) => {
  const [searchVisible, setSearchVisible] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [notScroll, setNotScroll] = useBodyScroll()
  // Do not scroll when the menu is open
  const menuChangeHandler = (b) => setNotScroll(b)

  // Hook scroll listener
  useEffect(() => {
    const listener = (e) => {
      setScrollTop(window.pageYOffset
        ?? e.target.document.documentElement.scrollTop
        ?? e.target.document.body.scrollTop
      )
    }
    window.addEventListener('scroll', listener, false)
    return () => window.removeEventListener('scroll', listener)
  }, [])

  return (
    <>
      <Head>
        <title>{CONFIG.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={'z-50 fixed flex top-0 w-full pt-2 pb-0.5 border-b bg-white transform transition-all ' + (scrollTop > 40 ? 'shadow-lg' : '')}>
        <div className="container mx-auto px-5 flex items-center justify-between h-12">
          {/* date icon */}
          <div className={'flex flex-shrink-0 overflow-hidden transform-gpu transition-width duration-500 ' + (scrollTop > 40 ? 'w-0 sm:w-20' : 'w-20')}>
            <a className="flex items-center pr-1" href="/">
              <h1 className="text-3xl font-black italic select-none">
                {new Date().getDate()}
              </h1>
            </a>
            <Divider size={36} color="rgba(229, 231, 235)" />
          </div>
          {/* tabs */}
          <div className="flex-grow min-w-0">
            <Tabs names={tabsNames} selected={tabsSelected} onSelected={onTabsSelected} />
          </div>
          {/* buttons */}
          <div className="flex-shrink-0 flex pl-5 items-center justify-center">
            {/* search button */}
            <div className="flex cursor-pointer" onClick={() => setSearchVisible(true)}>
              <Search />
            </div>
            <Spacer x={1} />
            {/* menu button */}
            <div className="flex cursor-pointer">
              <Popover content={menuContent} onVisibleChange={menuChangeHandler}><Menu /></Popover>
            </div>
          </div>
        </div>
      </div>
      {/* search modal */}
      <Modal width="auto" open={searchVisible} onClose={() => setSearchVisible(false)}>
        <Modal.Content style={{ padding: '0 16pt 0 16pt' }}>
          <div className="flex justify-center items-center">
            <Input className="w-40" icon={<Search />} size="large" placeholder="找些什么?" autoFocus></Input>
            <Spacer x={.2} />
            <Button auto type="secondary" onClick={() => setSearchVisible(false)}>搜索</Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default Header
