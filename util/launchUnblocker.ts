import { urlre } from '../pages/add';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function launchUnblocker(
  unblocker: 'womginx' | 'corrosion',
  url: string
) {
  const womginx = await getDoc(doc(db, 'proxies', 'womginx'));
  const corrosion = await getDoc(doc(db, 'proxies', 'corrosion'));

  console.log(womginx.data());

  if (!url) {
    return 'Please input a url';
  }
  let unblockerUrl: undefined | string = undefined;

  if (unblocker == 'womginx' && womginx && womginx.exists()) {
    unblockerUrl = womginx.data().url;
  } else if (unblocker == 'corrosion' && corrosion && corrosion.exists()) {
    unblockerUrl = corrosion.data().url;
  }

  if (!unblocker) {
    return 'Failed to get unblocker ' + unblocker;
  }

  const lowerURL = url.toLowerCase();
  if (urlre.test(lowerURL)) {
    window.open(`${unblockerUrl}${url}`);
  } else {
    window.open(`${unblockerUrl}https://${url}`);
  }
}
