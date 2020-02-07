import React from 'react'
import { safeStringify } from '../utils'

export const ErrorState = ({ error }: any) => (
  <div>
    <pre>{decodeURIComponent(safeStringify(error))}</pre>
  </div>
)
