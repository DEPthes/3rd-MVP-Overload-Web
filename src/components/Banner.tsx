
import banner from "../images/DEPthLogo.png"
import "../style/banner.css"

// 메인페이지의 banner component
const Banner:React.FC = () => {
    return(
        <>
        <a className="banner" href="https://depth-mju.co.kr/">
            <img src={banner}/>
        </a>
        </>
    );
}

export default Banner;