import ContentBoxes from "./content/ContentBoxes"

export default function Content() {

  return (
    <div id="content">
        <article id="siteDescription">
        Created to make validating data types and content during runtime easier than ever! With an unzipped size of only <span className="highlight-green">~3kb</span>, simply use the CDN, the file from GitHub, or the NPM package to use the function.
        </article>
        
        <ContentBoxes />
    </div>
  )
}
