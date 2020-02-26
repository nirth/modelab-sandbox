import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-github'

export const AppEditor = ({ appSourceCode, onChange }) => (
  <AceEditor
    mode="javascript"
    theme="github"
    value={appSourceCode}
    setOptions={{ useWorker: false }}
    style={{ height: '100%', width: '100%' }}
    onChange={onChange}
  />
)
