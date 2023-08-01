import getHighlightedCode from "./getHighlightedCode"
import { contentBoxData } from "./contentBoxData"

type contentType = {code: string, text: string, even: boolean}
type contentBoxProps = contentType


const contentBoxElems = contentBoxData.map((data, i)=>{
    const isEven = (i % 2 == 0);
    return(
        <ContentBox key={i} even={isEven} {...data} />
    )
})

function ContentBox(props: contentBoxProps){
   
    return(
        <div className={`content-box ${props.even ? "even" : "odd"}`}>
            <div className="code-wrapper">
                <div
                className="code"
                dangerouslySetInnerHTML={{__html: getHighlightedCode(props.code)}}
                ></div>
            </div>
            <div className="text">{props.text}</div>
        </div>
    )
}

export default function ContentBoxes() {
  return (
    <div id="contentBoxes">
        {contentBoxElems}
    </div>
  )
}
