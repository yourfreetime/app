import { useContext, useEffect, useState } from 'react';

import StorageContext from './Context';

function useStorage() {
  const context = useContext(StorageContext);
  const [data, setData] = useState(context);

  useEffect(() => setData(context), [context]);

  return data;
}

export default useStorage;
