import { CssBaseline, GeistProvider } from '@geist-ui/react'
import Footer from '../component/Footer'
// import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { globalStyle } from '../styles/global'

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <CssBaseline />
      <style global jsx>
        {globalStyle}
      </style>
      <Component {...pageProps} />
      <Footer />
    </GeistProvider>
  )
}

export default MyApp
