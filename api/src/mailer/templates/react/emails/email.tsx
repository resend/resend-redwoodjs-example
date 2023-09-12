import * as React from 'react'

import { Button } from '@react-email/button'
import { Html } from '@react-email/html'

export const Email = (message: string) => {
  return (
    <Html>
      <h1>Hello world</h1>
      <h2>{message}</h2>
      <Button
        pX={20}
        pY={12}
        href="https://www.redwoodjs.com"
        style={{ background: '#000', color: '#fff' }}
      >
        Visit RedwoodJS
      </Button>
    </Html>
  )
}
