import { useState, useEffect } from 'react';

export default function useScriptLinks() {
  const [scripts, setScripts] = useState(null);

  useEffect(() => {
    setScripts(null);
    const firebase = window.firebase;
    const db = firebase.database();
    db.ref(`/`).once('value').then(snapshot => setScripts(toArray(snapshot.val())));
  }, []);

  return scripts;
}

function toArray(object) {
  return Object.keys(object).map(k => ({ ...object[k], id: k }));
}
