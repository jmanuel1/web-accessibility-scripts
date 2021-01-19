import useScriptLinks from './script-links';
import jsInjectorLinks from './js-injector-links';
import CommentForm from './CommentForm';
import { useState, useEffect } from 'react';
import { Grommet, Header, Heading, Main, Form, FormField, TextInput } from 'grommet';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

const firebase = window.firebase;

function App() {
  const scriptLinks = useScriptLinks();
  const [scriptDescription, setScriptDescription] = useState('');
  const [scriptURL, setScriptURL] = useState('');
  const [derivativeScripts, setDerivativeScripts] = useState([]);
  const theme = {
    global: {
      family: 'Roboto',
      size: '14px',
      height: '20px'
    }
  };

  function onScriptDescriptionChange(event) {
    setScriptDescription(event.target.value);
  }

  function onDerivativeScriptDescriptionChange(index){
    return (event) => {
      const descs = [...derivativeScripts];
      descs[index].name = event.target.value;
      setDerivativeScripts(descs);
    }
  }

  function onScriptURLChange(event) {
    setScriptURL(event.target.value);
  }

  function onDerivativeScriptURLChange(index) {
    return event => {
      const descs = [...derivativeScripts];
      descs[index].link = event.target.value;
      setDerivativeScripts(descs);
    };
  }

  function onDerivativeScriptNoteChange(index) {
    return event => {
      const descs = [...derivativeScripts];
      descs[index].note = event.target.value;
      setDerivativeScripts(descs);
    };
  }

  function onScriptSubmit(event) {
    event.preventDefault();
    const db = firebase.database();
    db.ref('scripts/').push().set({
      name: scriptDescription, link: scriptURL, forks: derivativeScripts
    });
  }

  function onRemoveDerivativeScript(index) {
    return event => {
      const descs = [...derivativeScripts];
      descs.splice(index, 1);
      setDerivativeScripts(descs);
    };
  }

  function onAddDerivativeScript() {
    const descs = [...derivativeScripts];
    descs.push({ name: '', link: '', note: '' });
    setDerivativeScripts(descs);
  }

  return (
    <Router>
      <Grommet theme={theme}>
        <Header>
          <Heading level='1'>
            Userscripts and Custom Scripts to Improve Accessibility of Websites
          </Heading>
        </Header>
        <Main>
          <Switch>
            <Route path='/script/:scriptID' component={({ match: { params: { scriptID } } }) => <Script id={scriptID} />} />
            <Route exact path='/'>
              <Heading level='2'>Scripts</Heading>
              <Heading level='3'>Submit a Script</Heading>
              <Form>
                <FormField label="Name or short description of script(s)">
                  <TextInput name='script-description' placeholder='A short description of the script...' value={scriptDescription} onChange={onScriptDescriptionChange} />
                </FormField>
                <FormField label="Link to homepage of script(s)">
                  <input type='url' name='script-url' placeholder='The URL of a page about the script(s)' value={scriptURL} onChange={onScriptURLChange} />
                </FormField>
                {derivativeScripts.map(({ name, link, note }, index) => {
                  return (
                    <div>
                      <FormField label="Name or short description of script(s)">
                        <TextInput name='script-description' placeholder='A short description of the script...' value={derivativeScripts[index].name} onChange={onDerivativeScriptDescriptionChange(index)} />
                      </FormField>
                      <FormField label="Link to homepage of script(s)">
                        <input type='url' name='script-url' placeholder='The URL of a page about the script(s)' value={derivativeScripts[index].link} onChange={onDerivativeScriptURLChange(index)} />
                      </FormField>
                      <FormField label="Relationship with original script">
                        <input type='url' name='script-note' value={derivativeScripts[index].note} onChange={onDerivativeScriptNoteChange(index)} />
                      </FormField>
                      <button type='button' name='remove-derivative-script' onClick={onRemoveDerivativeScript(index)}>Remove derivative script</button>
                    </div>
                  );
                })}
                <button type='button' name='add-derivative-script' onClick={onAddDerivativeScript}>Add derivative script</button>
                <button type='submit' name='sumbit-script' onClick={onScriptSubmit}>Submit script</button>
              </Form>
              <ul>
                {scriptLinks && scriptLinks.map(({ link, name, forks = [], id }) => (
                  <li>
                    <a href={link}>{name}</a>
                    <ul>
                      {forks.map(({ link, name, note }) => (
                        <li>
                          <a href={link}>{name}</a> &mdash; {note}
                        </li>
                      ))}
                    </ul>
                    <Link to={`/script/${id}`}>View and make comments about this script</Link>
                  </li>
                ))}
              </ul>
              <Heading level='2'>How to Run Scripts</Heading>
              <Heading level='3'>Bookmarklets</Heading>
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
              <Heading level='3'>Browser Extensions for Injecting Scripts into Web Pages</Heading>
              <p>
                There may be extensions for your browser that you can use to run code
                on particular websites every time you load that website. Many of them
                work by allowing you to paste a script into their interface and choose
                which websites the script should run on.
              </p>
              <p>Custom script injector extensions:</p>
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
              <Heading level='3'>Userscript Managers</Heading>
              <p>
                A userscript is a piece of code designed to augment your web browsing
                experience. There are are various userscript managers to help your
                organize userscripts that you use.
              </p>
              <p>List of userscript managers:</p>
              <ul>
                <li>
                  <a href='https://greasyfork.org/en/help/installing-user-scripts'>
                    Greasy Fork's list of userscript managers
                  </a>
                </li>
                <li>
                  <a href='https://www.greasespot.net'>
                    Greasemonkey
                  </a>
                </li>
                <li>
                  <a href='https://www.tampermonkey.net'>
                    Tampermonkey
                  </a>
                </li>
              </ul>
              <Heading level='2'>Other Resources</Heading>
              <ul>
                <li>
                  <a href='https://github.com/jcsteh/axSHammer'>
                    AxSHammer - Firefox add-on that can manipulate a page to try to
                    make it more accessible
                  </a>
                </li>
              </ul>
            </Route>
          </Switch>
        </Main>
      </Grommet>
    </Router>
  );
}

function Script({ id }) {
  const { comments, refresh } = useComments();
  const script = useScript(id);

  if (!script) {
    return <p>Loading script information...</p>;
  }

  const { link, name, forks = [] } = script;

  return (
    <>
      <Heading level='2'>Script Information</Heading>
      <a href={link}>{name}</a>
      <ul>
        {forks.map(({ link, name, note }) => (
          <li>
            <a href={link}>{name}</a> &mdash; {note}
          </li>
        ))}
      </ul>
      <Heading level='2'>Submit a Comment</Heading>
      <CommentForm onSubmit={refresh} />
      <Heading level='2'>Comments</Heading>
      {comments ? <ol>
        {comments.map(comment => <li>{comment.content.text}</li>)}
      </ol> : <p>Loading comments...</p>}
    </>
  );
}

function useComments() {
  const [comments, setComments] = useState(null);
  const location = useLocation();

  // webmentions
  function refresh() {
    const DEPLOY_URL = 'https://web-accessibility-scripts.jason-manuel.com/';
    const pageURL = encodeURIComponent(`${DEPLOY_URL}#${location.pathname}`);
    const requestURL = `https://webmention.io/api/mentions.jf2?target=${pageURL}`;
    setComments(null);
    fetch(requestURL).then(
      response => response.json()
    ).then(
      json => {
        setComments(json.children);
      }
    )
  }

  useEffect(refresh, [location.pathname]);

  return { comments, refresh };
}

function useScript(id) {
  const [script, setScript] = useState(null);

  useEffect(() => {
    setScript(null);
    const db = firebase.database();
    db.ref(`${id}/`).once('value').then(snapshot => setScript(snapshot.val()));
  }, [id]);

  return script;
}

export default App;
