import { urlre } from '../pages/add';
import { get } from './superfetch';

export default function launchUnblocker(
  unblocker: 'womginx' | 'corrosion',
  url: string
) {
  const windowRef = window.open();
  
  if (!url) return 'Please input a url';
  get(`/api/proxy/${unblocker}`).then((proxy) => {
    if (!proxy.proxy) return 'Failed to get unblocker ' + unblocker;

    const lowerURL = url.toLowerCase();
    if (urlre.test(lowerURL)) {
      windowRef.location = `${proxy.proxy}${url}/`;
    } else {
      windowRef.location = `${proxy.proxy}https://${url}/`;
    }
  });
}
