import "./topbar.css"; 

export default function Topbar() {
  return (
    <nav className="topbar">
        <div className="topbarTitle">
            <h3><a href="/">WikiDay</a></h3>
        </div>
        <div className="topbarAnchor">
            <a href="/about"><p className="about">About</p></a>
            <a href="https://github.com/melogtm/wikiday"><p className="about">Source Code</p></a>
        </div>
    </nav>
  )
}
