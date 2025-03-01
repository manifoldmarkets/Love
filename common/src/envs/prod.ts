export type EnvConfig = {
  domain: string
  loveDomain: string
  loveDomainAlternate: string
  firebaseConfig: FirebaseConfig
  supabaseInstanceId: string
  supabaseAnonKey: string
  twitchBotEndpoint: string
  apiEndpoint: string

  // IDs for v2 cloud functions -- find these by deploying a cloud function and
  // examining the URL, https://[name]-[cloudRunId]-[cloudRunRegion].a.run.app
  cloudRunId: string
  cloudRunRegion: string

  // Access controls
  adminIds: string[]
  visibility: 'PRIVATE' | 'PUBLIC'

  // Branding
  moneyMoniker: string // e.g. 'Ṁ'
  spiceMoniker: string // e.g. 'S'
  bettor: string // e.g. 'predictor'
  nounBet: string // e.g. 'prediction'
  verbPastBet: string // e.g. 'predicted'
  faviconPath: string // Should be a file in /public
  newQuestionPlaceholders: string[]
  expoConfig: {
    iosClientId?: string
    expoClientId?: string
    androidClientId?: string
  }
}

type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  region?: string
  storageBucket: string
  privateBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}

export const PROD_CONFIG: EnvConfig = {
  domain: 'manifold.markets',
  loveDomain: 'manifold.love',
  loveDomainAlternate: 'manifoldlove.com',
  supabaseInstanceId: 'lltoaluoavlzrgjplire',
  supabaseAnonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdG9hbHVvYXZsenJnanBsaXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NTE4MDksImV4cCI6MjA1NjAyNzgwOX0.du6UI3YkcwUxTrYqYficcsT9zT5PTLsUYDIk_IkzVus',
  firebaseConfig: {
    apiKey: 'AIzaSyB_62i1KZ1_gk5vIlefi96G6lJ5dB0tXOo',
    authDomain: 'polylove-57eab.firebaseapp.com',
    projectId: 'polylove',
    region: 'us-west1',
    storageBucket: 'polylove.firebasestorage.app',
    privateBucket: 'mantic-markets-private',
    messagingSenderId: '226356461961',
    appId: '1:226356461961:web:ff99f7f74861454e146158',
  },
  twitchBotEndpoint: 'https://twitch-bot.manifold.markets',
  apiEndpoint: 'api.manifold.love',
  cloudRunId: 'nggbo3neva',
  cloudRunRegion: 'uc',

  adminIds: [
    'igi2zGXsfxYPgB0DJTXVJVmwCOr2', // Austin
    '5LZ4LgYuySdL1huCWe7bti02ghx2', // James
    'tlmGNz9kjXc2EteizMORes4qvWl2', // Stephen
    '0k1suGSJKVUnHbCPEhHNpgZPkUP2', // Sinclair
    'IPTOzEqrpkWmEzh6hwvAyY9PqFb2', // Manifold
    'AJwLWoo3xue32XIiAVrL5SyR1WB2', // Ian
    'uglwf3YKOZNGjjEXKc5HampOFRE2', // D4vid
    'GRwzCexe5PM6ThrSsodKZT9ziln2', // Inga
    '62TNqzdBx7X2q621HltsJm8UFht2', // Marshall
    'z0cH5XmIM9XgWFOBAILQWt0fTHr1', // Rachel W
    'cA1JupYR5AR8btHUs2xvkui7jA93', // Genzy
    'vuI5upWB8yU00rP7yxj95J2zd952', // Manifold Politics
    '8lZo8X5lewh4hnCoreI7iSc0GxK2', // Manifold AI
    'mwaVAaKkabODsH8g5VrtbshsXz03', // Ian's alt
  ],
  visibility: 'PUBLIC',

  moneyMoniker: 'Ṁ',
  spiceMoniker: 'P',
  bettor: 'trader',
  verbPastBet: 'traded',
  nounBet: 'trade',
  faviconPath: '/favicon.ico',
  newQuestionPlaceholders: [
    'Will anyone I know get engaged this year?',
    'Will humans set foot on Mars by the end of 2030?',
    'Will any cryptocurrency eclipse Bitcoin by market cap this year?',
    'Will the Democrats win the 2024 presidential election?',
  ],
  expoConfig: {
    iosClientId:
      '128925704902-n0ic4j1s5tk51t2vu8anu8glh3t5jimo.apps.googleusercontent.com',
    expoClientId:
      '128925704902-bpcbnlp2gt73au3rrjjtnup6cskr89p0.apps.googleusercontent.com',
    androidClientId:
      '128925704902-ur9hevfika2rs0sni6ju236u82hbct3i.apps.googleusercontent.com',
  },
}
