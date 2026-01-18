import Header from "../layouts/Header"
import Content from "../layouts/Content"
import Introduction from "../layouts/Introduction"
import Features from "../layouts/Features"
import Footer from "../layouts/Footer"

type ChangeTheme = {
    isDark: boolean
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

function Landing({ isDark, setIsDark}: ChangeTheme) {
    return (
        <div className={`${isDark? "text-[var(--light-color)] bg-[var(--dark-color)]" : "text-[var(--dark-color)] bg-[var(--light-color)]"}
            h-auto w-full flex flex-col items-center justify-start`}>
            <Header isDark={isDark} setIsDark={setIsDark}/>
            <Content isDark={isDark}/>
            <Introduction isDark={isDark}/>
            <Features isDark={isDark}/>
            <Footer isDark={isDark}/>
        </div>
    )
}

export default Landing