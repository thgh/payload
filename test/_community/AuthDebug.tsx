import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../src/admin/components/utilities/Auth';

export default function AuthDebug() {
  const [state, setState] = useState();
  const history = useRef([]);
  const { user } = useAuth();
  if (!history.current.includes(user)) { history.current.unshift(user); }
  useEffect(() => {
    fetch(`/api/users/${user.id}`).then((r) => r.json()).then((ok) => {
      console.log('ok', ok);
      setState(ok);

      fetch(`/api/users/${user.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ example: ok.example + 1 }),
          headers: { 'Content-Type': 'application/json' },
        }).then((r) => r.json()).then((ok) => {
        console.log('ok', ok);
        setState(ok.doc);
      });
    });
  }, []);
  return (
    <React.Fragment>
      Actual: (refresh several times to see the example increment)
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
      useAuth:
      {history.current.map((u) => (
        <pre key={u.id}>
          {JSON.stringify(u, null, 2)}
        </pre>
      ))}
    </React.Fragment>
  );
}
