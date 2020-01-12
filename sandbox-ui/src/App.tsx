import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ApiHealthStatus } from './delegates/ApiHealthStatus'
import { ScenariosMenu } from './delegates/ScenariosMenu'
import { ScenarioPage } from './pages/ScenarioPage'
import { Container, Menu } from 'semantic-ui-react'

const containerStyles = {
  marginTop: '6em',
  width: '100vw',
}

export const App = () => {
  return (
    <>
      <Container>
        <Menu fixed="top" inverted>
          <Menu.Item>
            <ApiHealthStatus />
          </Menu.Item>
          <Menu.Item>Mode Lab Sandbox</Menu.Item>
          <Menu.Item>
            <ScenariosMenu direction="left" />
          </Menu.Item>
        </Menu>
      </Container>

      <Container style={containerStyles}>
        <Switch>
          <Route exact path="/" component={ScenarioPage} />
          <Route
            exact
            path="/scenarios/:scenarioSlug"
            component={ScenarioPage}
          />
        </Switch>
      </Container>
    </>
  )
}
