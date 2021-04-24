import Header from '../component/Header'
import CONFIG from '../config'
import CalView from '../component/CalView'

const onTabsSelected = (index) => {
  console.log('select ' + index)
}

const overview = () => {
  return (
    <>
      <Header tabsNames={CONFIG.tabsNames.overview} onTabsSelected={onTabsSelected} />
      <main className="container mx-auto px-5 my-24">
        <CalView />
      </main>
    </>
  )
}

export default overview
