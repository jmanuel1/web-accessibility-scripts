import logo from './logo.svg';
import './App.css';
import scriptLinks from './script-links';
import jsInjectorLinks from './js-injector-links';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Userscripts and Custom Scripts to Improve Accessibility of Websites
        </h1>
      </header>
      <main rule='main'>
        <h2>Scripts</h2>
        <ul>
          {scriptLinks.map(({ link, name }) => (
            <li>
              <a href={link}>{name}</a>
            </li>
          ))}
        </ul>
        <h2>How to Run Scripts</h2>
        <h3>Bookmarklets</h3>
        <p>
          Bookmarklets are browser bookmarks that run a script embedded in the
          bookmark link when you click on them.
        </p>
        <p>Resources to learn about bookmarklets:</p>
        <ul>
          <li>
            <a href='https://support.mozilla.org/en-US/kb/bookmarklets-perform-common-web-page-tasks'>
              Use bookmarklets to quickly perform common web page tasks |
              Firefox Help
            </a>
          </li>
          <li>
            <a href='https://en.wikipedia.org/wiki/Bookmarklet'>
              Wikipedia page on bookmarkets
            </a>
          </li>
        </ul>
        <h3>Browser Extensions for Injecting Scripts into Web Pages</h3>
        <p>
          There may be extensions for your browser that you can use to run code
          on particular websites every time you load that website. Many of them
          work by allowing you to paste a script into their interface and choose
          which websites the script should run on.
        </p>
        <p>Custom Script Injector Extensions</p>
        <ul>
          {jsInjectorLinks.map(({ link, name, forks = [] }) => (
            <li>
              <a href={link}>{name}</a>
              <ul>
                {forks.map(({ link, name, note }) => (
                  <li>
                    <a href={link}>{name}</a> &mdash; {note}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
