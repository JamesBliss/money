import { Manrope } from '@next/font/google'

// styles
import '../styles/globals.css'

// load font styles
const manrope = Manrope()

//
function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${manrope.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default App;