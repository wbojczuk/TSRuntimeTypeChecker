import ReactDOM from "react-dom/client"
import App from "./App"
import "./css/style.css"
import "./css/content.css"
import "../node_modules/prismjs/themes/prism-okaidia.min.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<App />)
