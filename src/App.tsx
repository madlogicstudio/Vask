import { useState } from 'react'
import './Style.css'
import Landing from "./pages/Landing"

function App() {

  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
      flex flex-col items-center justify-center`}>
      <Landing isDark={isDark} setIsDark={setIsDark} />
    </div>
  )
}

export default App