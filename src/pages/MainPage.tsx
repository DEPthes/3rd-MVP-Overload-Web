import PostPreview from "../components/PostPreview";
import dummy from "../assets/soyeon-dummydata.json"
import "../style/mainPage.css"

function MainPage() {
    return (
        <>
        <div className="total">
            <div className="gnb">
                gnb
                {/* <GNB/> */}
            </div>
            <div className="banner">
                banner
                {/* <Banner/> */}
            </div>
            <div className="post-preview">
                <ul>
                {dummy.map((item, index) => (
                    <li key={index}>
                        <div className="post-preview-content">
                            <PostPreview 
                            title={item.title}
                            content={item.content}
                            date={item.date}
                            writer={item.writer}
                            view={item.view}
                            like={item.like}
                            scrap={item.scrap}
                            picture="link"
                            />
                        </div>
                    </li>
                ))}
                </ul>
            </div>
            
        </div>
        </>
        
      );
}

export default MainPage;