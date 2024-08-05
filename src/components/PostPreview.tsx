import "../style/postPreview.css";

type postPreview = {
    title: string;
    content: string;
    date: string;
    writer: string;
    view: number;
    like: number;
    scrap: number;
    picture?: string;
}

const PostPreview:React.FC<postPreview> = (props) => {
    return(
        <>
        <div className="total">
        <div>
            <div className="top">
                <h2>{props.title}</h2>
                <p>{props.content}</p>
            </div>
            <div className="middle">
                <p>{props.date}</p>
                <p>{props.writer}</p>
            </div>
            <div className="bottom">
                <p>❤️</p>
                <p>{props.view}</p>
                <p>❤️</p>
                <p>{props.like}</p>
                <p>❤️</p>
                <p>{props.scrap}</p>
            </div>
        
        </div>
        <div>
            <p className="picture">{props.picture}</p>
        </div>
        </div>
        
            
        </>
    );
}
export default PostPreview;