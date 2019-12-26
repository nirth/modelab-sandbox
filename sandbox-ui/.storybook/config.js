import { configure } from '@storybook/react'
import 'semantic-ui-css/semantic.min.css'

configure(require.context('../src', true, /\.stories\.tsx?$/), module)
