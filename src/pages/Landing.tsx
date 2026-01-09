import Header from "../layouts/Header";
import Content from "../layouts/Content";
import Footer from "../layouts/Footer";

function Landing() {
    return (
        <div className='h-auto w-full flex flex-col items-start justify-start'>
            <Header /> 
            <Content />
            <Footer />
        </div>
    )
}

export default Landing