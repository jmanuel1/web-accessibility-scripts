import { useLocation } from 'react-router-dom';

export default function useDeployURLofCurrentPage() {
  const location = useLocation();
  const DEPLOY_URL = 'https://web-accessibility-scripts.jason-manuel.com/';
  const pageURL = `${DEPLOY_URL}#${location.pathname}`;
  return pageURL;
}
