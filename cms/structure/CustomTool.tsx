import {Card, Text, Stack} from '@sanity/ui'
import {DashboardIcon} from '@sanity/icons'

const CardCSS = {
  width: '100%',
}

export function userGuide() {
  function customComponent() {
    return (
      <Stack
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          margin: '20px auto',
        }}
      >
        <Card style={CardCSS}>
          <Text>
            <h1>Brukerguide for Sanity Studio</h1>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="overview">Innholdsfortegnelse</h2>
            <p>Her finner du en oversikt over alle sider og artikler i denne guiden</p>
            <ul>
              <li>
                <a href="#frontpage">Forside</a>
              </li>
              <li>
                <a href="#infopage">Informasjonsside</a>
              </li>
              <li>
                <a href="#programpage">Programside</a>
              </li>
              <li>
                <a href="#articles">Artikler</a>
              </li>
              <li>
                <a href="#events">Forestillinger</a>
              </li>
              <li>
                <a href="#roles">Roller</a>
              </li>
            </ul>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="frontpage">Forside</h2>
            <p>Her kan du endre på hva som vises på forsiden</p>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="infopage">Informasjonsside</h2>
            <p>Her kan du endre på hva som vises på Informasjonssiden</p>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="programpage">Programside</h2>
            <p>Her kan du endre på hva som vises på Programsiden</p>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="articles">Artikler</h2>
            <p>Her kan du opprette, endre og slette artikler</p>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="events">Forestillinger</h2>
            <p>Her kan du opprette, endre og slette forestillinger</p>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="roles">Roller</h2>
            <p>Her kan du opprette, endre og slette roller</p>
          </Text>
        </Card>
      </Stack>
    )
  }

  const customTool = {
    title: 'Brukerguide',
    name: 'user-guide',
    icon: DashboardIcon,
    component: customComponent,
  }
  return customTool
}
