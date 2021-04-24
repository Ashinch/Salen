import CalCard from '../component/CalCard'
import Header from '../component/Header'
import { Loading, Spacer } from '@geist-ui/react'

const onTabsSelected = (index) => {
  console.log('select ' + index)
}

const index = () => {
  return (
    <>
      <Header tabsNames={['全 部', '赛 事', '会 议', '生 活', '天 文', '影 视']} onTabsSelected={onTabsSelected} />
      <main className="container mx-auto px-5 mt-20 mb-24">
        <div className="relative grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => {
            return (
              <CalCard key={index} id={item} />
            )
          })}
        </div>
        <Spacer y={2} />
        {/* loading */}
        <div className="flex justify-center">
          <Loading type="success" size="large" />
        </div>
      </main>
    </>
  )
}
export default index
