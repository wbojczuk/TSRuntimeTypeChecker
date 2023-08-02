import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
import animationData from "./assets/lottie/data_anim.json";
export default function BottomSection() {
  return (
    <section id="bottomSection">
        <h1>Why Was This Created?</h1>
        <div id="whyWrapper">
            <div className="text">
            This tool was made by William Bojczuk (me) to make validating data easy and accurate. Sure TypeScript allows you to validate data types during development and compile-time, but I needed a solution that ran in production. Tested on server and client environments. If you find this tool useful, consider <a href="https://github.com/wbojczuk/TSRuntimeTypeChecker/tree/main" target="_blank">leaving me a star on GitHub</a> or even <a href="https://williambojczuk.dev/#message" target="_blank">let me know!</a> Happy Coding!
            </div>
            <div className="anim">
                <Lottie
                animationData={animationData}
                style={{width: "100%", height: "100%", display: "inline-block"}}
                play
                loop
                />
            </div>
        </div>
    </section>
  )
}
