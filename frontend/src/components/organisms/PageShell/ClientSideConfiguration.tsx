'use client';
import {memo, useEffect} from 'react';
import {z} from 'zod';
import {errorMap} from 'zod-validation-error';

function ClientSideConfiguration() {
  useEffect(() => {
    // Provide custom message mapping for Zod issues
    z.setErrorMap(errorMap);
  });

  return null;
}

export default memo(ClientSideConfiguration);
