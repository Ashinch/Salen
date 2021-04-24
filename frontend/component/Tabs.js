import { useRef, useState } from 'react'

const Tabs = ({ names, selected, onSelected }) => {
  const [select, setSelected] = useState(selected || 0)
  const scrollView = useRef()
  return (
    <>
      <style jsx>{`
        .item:hover p {
          color: black;
        }

        .scroll-list {
          overflow-y: scroll;
        }

        .scroll-list::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="scroll-list flex flex-nowrap" ref={scrollView}>
        {names?.map((item, index) => {
          return (
            <div
              key={index}
              className={'flex-shrink-0 item px-3 py-4 cursor-pointer select-none ' + (select === index ? 'border-b-2 border-black' : '')}
              onClick={() => {
                setSelected(index)
                let i = 0
                let timer = setInterval(() => {
                  // scrollLeft += 55
                  scrollView.current.scrollLeft += index > 1 ? 2.75 : 0
                  if (++i >= 20) clearInterval(timer)
                }, 10)
                onSelected?.(index)
              }}
            >
              <p className={'item-p text-sm duration-100 transition-all ease-linear ' + (select === index ? 'text-black' : 'text-gray-400')}>
                {item}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Tabs
