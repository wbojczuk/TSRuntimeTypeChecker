type downloadLinkType = {title: string, link: string}[]

const downloadLinks: downloadLinkType = [
    {
        title: "CDN",
        link: "https://cdn.jsdelivr.net/gh/wbojczuk/TSRuntimeTypeChecker/runtimetypechecker.js"
    },
    {
        title: "NPM",
        link: "Coming Soon!"
    }
]

interface downloadLinkProps {
    title: string,
    link: string
}
function DownloadLink(props: downloadLinkProps){
    return(
        <div className="download-link">
            <span className="title">{props.title}: </span>
            <span className='link'>{props.link}</span>
        </div>
    )
}

const downloadLinkElems = downloadLinks.map((obj)=>{
    return <DownloadLink key={obj.title} {...obj} />
})




export default function DownloadLinks() {
  return (
    <aside id="downloadLinks">
        {downloadLinkElems}
    </aside>
  )
}
