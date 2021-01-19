import { Form, FormField, Button, Anchor, TextInput } from 'grommet';
import { useState } from 'react';
import useDeployURLofCurrentPage from './deploy-url';

export default function CommentForm({ onSubmit }) {
  const [formState, setFormState] = useState({ link: '' });
  const deployedPageURL = useDeployURLofCurrentPage();
  const [webmentionResultState, setWebmentionResultState] = useState('unsent');

  function onSubmitComment() {
    sendWebmentionFrom(formState.link);
  }

  function onFormStateChange(value) {
    setFormState(value);
    setWebmentionResultState('unsent');
  }

  async function sendWebmentionFrom(source) {
    const endpoint = document.querySelector('link[rel=webmention]').href;
    const body = new URLSearchParams();
    body.append('source', source);
    body.append('target', deployedPageURL);
    const response = await fetch(endpoint, { method: 'POST', body });
    setWebmentionResultState(response.ok ? 'success' : 'error');
    if (response.ok) {
      setFormState({ link: '' });
      onSubmit();
    }
  }

  const webmentionSendResult = {
    'unsent': null,
    'success': <p>Webmention sent successfully</p>,
    'error': <p>
      An error ocurred while trying to send the webmention. Check the URL you
      entered or the page content at that URL.
    </p>
  }

  return (
    <>
      <p>
        Share your thoughts using a <Anchor href='https://en.wikipedia.org/wiki/Webmention' label='webmention' />
      </p>
      <Form value={formState} onChange={onFormStateChange} onSubmit={onSubmitComment}>
        {/* TODO: Take comments from site directly */}
        <FormField label='Link to your comment'>
          <TextInput name='link' placeholder='Type of paste a URL here' type='url' required />
        </FormField>
        <Button type='submit'>Send webmention</Button>
      </Form>
      {webmentionSendResult[webmentionResultState]}
    </>
  );
}
