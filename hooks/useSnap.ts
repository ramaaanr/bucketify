import { MIDTRANS_API_URL, MIDTRANS_CLIENT_ID } from '@/config/midtrans';
import { useState, useEffect } from 'react';

const useSnap = () => {
  const [snap, setSnap] = useState<any>(null);

  useEffect(() => {
    const myMidtransClientKey = MIDTRANS_CLIENT_ID;
    const script = document.createElement('script');
    script.src = `${MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute('data-client-key', myMidtransClientKey);
    script.onload = () => {
      setSnap(window.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token: string, embedId: string, action: any) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result: any) {
          console.log(result);
          action.onSuccess(result);
        },
        onPending: function (result: any) {
          console.log('pending', result);
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };

  return { snapEmbed };
};

export default useSnap;
