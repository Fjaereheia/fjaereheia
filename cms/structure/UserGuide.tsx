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
                <a href="#persons">Personer</a>
              </li>
            </ul>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="frontpage">Forside</h2>
            <p>
              Her kan du endre på hva som vises på forsiden. Hvis ingen forestilling er valgt vil
              det du skriver inn her vises på forsiden, ellers vil dataen hentes fra forestillingen.
            </p>
            <p>Uten Forestilling:</p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/8996b1e04f67cc48ae1a4ceced97cfc84dcde584-3584x2070.png"
              alt="Frontpage without event"
            />
            <p>Forside med eksempelvis Björk valgt:</p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/90884aa476d7ac7ae0ff453a6fd980eb9efa7d3d-3584x2070.png"
              alt="Frontpage with event"
            />
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="infopage">Informasjonsside</h2>
            <p>
              Her kan du endre på hva som vises på Informasjonssiden, hovedsaklig hvilker artikler
              du vil fremheve for besøkende. Valgte sider under “Undersider” er det som bestemmer
              hva som står over “…”. Alle artikler dirigerer besøkende videre til eldre artikler.
            </p>
          </Text>
          <img
            style={{width: '80%'}}
            src="https://cdn.sanity.io/images/0chpibsu/development/e457ee74de009c8ecac6d437749a7f010de1984f-3584x2070.png"
            alt="Programpage"
          />
        </Card>
        <Card style={CardCSS}>
          <h2 id="programpage">Programside</h2>
          <Text>
            <p>
              Her kan du endre på hva som vises på Programsiden, på samme måte som på Infosiden. I
              tillegg kan man legge til en gif fil som spilles av i bakgrunnen av siden, bak
              teksten.
            </p>
            <p>Eksempel på gif:</p>
          </Text>
          <img
            style={{width: '40%', height: '40%'}}
            src="https://cdn.sanity.io/images/0chpibsu/development/2abe0efff6c1400417faee4565cf8e320404e1c2-720x1280.gif"
            alt="Gif av Aurora"
          />
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="articles">Artikler</h2>
            <p>
              Her kan du opprette, endre og slette artikler. Det som legges til i tekstfeltet
              bestemmer hva som vises på hovedinnholdet av siden, se{' '}
              <a href="#richtexteditor">RichTextEditor</a>.
            </p>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="events">Forestillinger</h2>
            <p>
              Her kan du opprette, endre og slette Forestllinger. Det som legges til i tekstfeltet
              bestemmer hva som vises på hovedinnholdet av siden, se{' '}
              <a href="#richtexteditor">RichTextEditor</a>.
            </p>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="persons">Roller</h2>
            <p>
              Her kan du opprette, endre og slette personer. Her kan du legge til Navn, bilde (med
              bildetekst) og en kort biografi. Sistnevnte bør holdes kort. Når en person er
              opprettet, kan denne kobles opp mot ulike program. På program-siden blir da navn,
              bilde og biografi vist.{' '}
            </p>
          </Text>
        </Card>
        <Card
          style={{
            width: '50%',
            backgroundColor: '#808080',
            borderRadius: '20px',
            padding: '5px',
          }}
        >
          <Text>
            <p>
              <span style={{fontWeight: 'bold'}}>NB:</span> Personer må opprettes før de kan kobles
              til et event.{' '}
            </p>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="internationalization">Internasjonalisering</h2>
            <p>
              Man kan ha forskjellige versjoner av samme dokument, med forskjellige språk. Dette er
              hva som bestemmer hva som skjer når man trykker på “NO / EN” på nettsiden. Når man
              velger andre referanser i et dokument med språk blir valgene automatisk filtrert til
              dokumenter med samme språk. Noen viktig ting å vite om dette er:{' '}
            </p>
            <ul>
              <li>Sjekke hvilket språk et dokument er på:</li>
            </ul>
            <p>
              Dette kan sjekkes ved å forsikre seg om at man har gått inn i riktig mappe (dvs.
              Artikler (NB), Forestilling (NB), etc) eller så står det nederst til venstre inne i
              dokumentet
            </p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/02657bfa463ce88e48c8fc34b2c226fa91e62fe8-2872x1950.png"
              alt="Språk valg"
            />
            <ul>
              <li>Opprette nytt dokument på et annet språk:</li>
            </ul>
            <p>For et helt nytt dokument, velg ønsket språk ved å trykke på “+”-ikonet slik:</p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/a8174623e0c76afa1552ea71dafc69b58ec50133-826x384.png"
              alt="Språk velger"
            />
            <ul>
              <li>Opprette nytt dokument fra eksisterende dokument:</li>
            </ul>
            <p>
              Hvis du skal ha en engelsk versjon av et eksisterende dokument må du gå inn på
              dokumentet og velge det fra “translations” for å opprette en lenket versjon. Uten
              dette vil det ikke være mulig å bytte til engelsk/norsk fra samme side. Translations
              knappen skal dukke opp øverst i høyre hjørne.
            </p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/42983124fe436fd0691baa151ecd8c8984519569-2848x1956.png"
              alt="Språk velger"
            />
            <ul>
              <li>Slette et dokument som har oversettelser: </li>
            </ul>
            <p>
              Da dokumenter inneholder referanser til sine oversatte søsken er det viktig å fjerne
              disse referansene før man eventuelt sletter dokumentet. Dette gjør man ved å trykke
              “Delete translations” først{' '}
            </p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/3fe6fee13e8daf7aeb03a5e0f0170a5dce97dc98-1446x984.png"
              alt="Slette dokument med språk ref"
            />
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/0e21b985576fe17a03f8bd30f1cbcc3772e4dce9-1360x916.png"
              alt="Slette dokument med språk ref"
            />
            <p>Deretter kan man slette dokumentet som vanlig.</p>
          </Text>
        </Card>
        <Card
          style={{
            width: '70%',
            backgroundColor: '#808080',
            borderRadius: '20px',
            padding: '5px',
          }}
        >
          <Text>
            <p>
              <span style={{fontWeight: 'bold'}}>NB:</span> Ved å opprette et nytt engelsk dokument
              vil all den norske teksten og de norske referansene kopieres over. Dobbeltsjekk at det
              ligger referanser til riktig språkversjon der det er hensiktsmessig. For eksempel at
              en engelsk artikkel ikke lenker til en norsk forestilling o.l.
            </p>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="video">Mux Video</h2>
            <p>
              Video filer håndteres av <a href="https://www.mux.com">Mux.com</a>, men kan vises i
              Sanity Studio for enklere oversikt. Man kan sjekke videoer ved å trykke på “Videos”
              taben.
            </p>
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="media">Media oversikt</h2>
            <p>
              Ved å klikke på “Media” taben vil man få en oversikt over alle bilder man har lagret i
              Sanity, og har mulighet til å laste opp flere bilder på en gang om det er ønskelig.
              Hvis bilder skal slettes herfra må de fjernes fra dokumentet de eventuelt er referert
              i først.
            </p>
          </Text>
          <img
            style={{width: '80%'}}
            src="https://cdn.sanity.io/images/0chpibsu/development/a137a6535421f4bbfc6aa030b752aeb55d91c293-3550x800.png"
            alt="Media oversikt"
          />
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="richtexteditor">RichTextEditor</h2>
            <p>
              Tekstboksen bestemmer hovedinnholdet på en side, og gir deg mulighet til å bestemme
              rekkefølgen på tekst, bilder, video, sitat, anmeldelser. Du kan også legge til lenker
              og tabeller.
            </p>
            <p>Standard visning:</p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/06550bc96d7bbb3a4fa1ff4d5b58089b32eb78d7-1294x820.png"
              alt="RichTextEditor"
            />
            <p>Utvidet visning:</p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/10993b3ace0a41b7ef518fe4418f1a7c8fdcf627-2000x1304.png"
              alt="RichTextEditor"
            />
            <p>Ekspander “…” for å skrive anmeldelser:</p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/57a3ee15cf617ab13bfad7048320e18f37d8b824-1308x746.png"
              alt="RichTextEditor"
            />
          </Text>
        </Card>
        <Card style={CardCSS}>
          <Text>
            <h2 id="SEO">SEO - Search Engine Optimization</h2>
            <p>Følgene dokumenter har en egen SEO gruppe:</p>
            <ul>
              <li>Forside</li>
              <li>Artikler</li>
              <li>Forestillinger</li>
            </ul>
            <p>Gruppene finner du på siden slik:</p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/e5f3fc997f98fa3679c8252b73d780a8d222284a-393x80.png"
              alt="SEO"
            />
            <p>
              Disse feltene bidrar til å forbedre søkeresultatene i søkemotorer som for eks. Google.{' '}
            </p>
            <br />
            <p>
              <span style={{fontWeight: 'bold'}}>SEO tittel:</span>Brukes som fanens navn:
            </p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/a91f3c71610b614c27149eac0f28005ba6c737d9-726x82.png"
              alt="SEO tittel"
            />
            <ul>
              <li>Standardvisning på forsiden: Bruddet</li>
              <li>Artikkel: Overskrift på artikkel</li>
              <li>Forestilling: Navn på stykket/artist navn</li>
            </ul>
            <p>
              <span style={{fontWeight: 'bold'}}>SEO Beskrivelse: </span> Et kort sammendrag av
              innholdet, som vises i søkeresultatet hos brukeren.
            </p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/b51cac6928c2d56fc0061977dea0e821b06275de-664x126.png"
              alt="SEO beskrivelse"
            />
            <p style={{fontWeight: 'bold'}}>ALT - Alternativ tekst</p>
            <p>
              På alle bilder, videoer og GIF’er som brukes på siden skal det være en tilhørende
              beskrivende tekst. Dette er en del av Universell Utforming, og bidrar til at siden er
              tilgjengelig for flere brukere.
            </p>
            <img
              style={{width: '80%'}}
              src="https://cdn.sanity.io/images/0chpibsu/development/95aa8a63c49893cadafdd3d8e02e6e692a71ae4c-632x498.png"
              alt="SEO ALT"
            />
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
