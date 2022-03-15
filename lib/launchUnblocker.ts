import { urlre } from '../pages/add';
import { get } from './superfetch';

export default async function launchUnblocker(
  unblocker: 'womginx' | 'corrosion',
  url: string
) {
  const proxy = await get(`/api/proxy/${unblocker}`);

  if (!url) return 'Please input a url';

  if (!proxy.proxy) return 'Failed to get unblocker ' + unblocker;

  const lowerURL = url.toLowerCase();
  if (urlre.test(lowerURL)) {
    window.location.href = `${proxy.proxy}${url}`;
  } else {
    window.location.href = `${proxy.proxy}https://${url}`;
  }
}
