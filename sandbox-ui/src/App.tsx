import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ApiHealthStatus } from './delegates/ApiHealthStatus'
import { ScenariosMenu } from './delegates/ScenariosMenu'
import { ScenarioPage } from './pages/ScenarioPage'
import { Container, Menu } from 'semantic-ui-react'

export const App = () => {
  return (
    <div>
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

      <Container style={{ marginTop: '3em' }}>
        <Switch>
          <Route exact path="/">
            <div>Home!</div>
          </Route>
          <Route
            exact
            path="/scenarios/:scenarioSlug"
            component={ScenarioPage}
          />
        </Switch>
      </Container>
    </div>
  )
}
