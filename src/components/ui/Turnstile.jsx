import { useEffect, useRef, useState } from 'react';

let scriptPromise;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => resolve(window.turnstile);
    script.onerror = () => { scriptPromise = null; reject(new Error('Güvenlik doğrulaması yüklenemedi.')); };
    document.head.append(script);
  });
  return scriptPromise;
}

export default function Turnstile({ siteKey, onVerify, attempt }) {
  const container = useRef(null);
  const callback = useRef(onVerify);
  const [failed, setFailed] = useState(false);
  callback.current = onVerify;
  useEffect(() => {
    if (!siteKey) return;
    let widget;
    let cancelled = false;
    setFailed(false);
    loadTurnstile().then((api) => {
      if (cancelled) return;
      widget = api.render(container.current, {
        sitekey: siteKey, action: 'membership', theme: 'light', size: 'flexible',
        callback: (token) => callback.current(token),
        'expired-callback': () => callback.current(''),
        'error-callback': () => { callback.current(''); setFailed(true); },
      });
    }).catch(() => setFailed(true));
    return () => { cancelled = true; if (widget !== undefined) window.turnstile?.remove(widget); };
  }, [siteKey, attempt]);
  return <div className="mt-6"><div ref={container} />{failed && <p role="alert" className="text-sm text-red-700 mt-2">Güvenlik doğrulaması yüklenemedi. Sayfayı yenileyip yeniden deneyin.</p>}</div>;
}
