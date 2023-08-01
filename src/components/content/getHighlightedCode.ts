// @ts-ignore
import Prism from "prismjs"

export default function getHighlightedCode(code: string): string{
    return Prism.highlight(code, Prism.languages.javascript, 'javascript')
}
