import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-github'

export const AppEditor = ({ appCode, onChange }) => (
  <AceEditor
    mode="javascript"
    theme="github"
    value={appCode}
    setOptions={{ useWorker: false }}
    style={{ height: '100%', width: '100%' }}
    onChange={onChange}
  />
)
