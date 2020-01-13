import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import { ScenariosMenu } from './delegates/ScenariosMenu'
import { ScenarioPage } from './pages/ScenarioPage'
import logo from './assets/brand/mode-logotype.svg'
import './styles.css'

const containerStyles = {
  marginTop: '6em',
  width: '100vw',
}

export const App = () => {
  return (
    <>
      <Container>
        <Menu fixed="top">
          <Menu.Item>
            <img src={logo} alt="Mode Banking Logotype" />
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

      <Container style={{ textAlign: 'center', paddingTop: '1.5em' }}>
        <p className="boring text">
          Mode is a registered trademark of Fibermode Limited. Fibermode Limited
          is a private limited company incorporated and registered under the
          laws of England and Wales with company number 11085143 and registered
          office address at Finsgate, 5-7 Cranwood Street, London, United
          Kingdom, EC1V 9EE. Fibermode Limited is part of R8 Group.
        </p>
      </Container>
    </>
  )
}
