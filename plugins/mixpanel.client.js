import mixpanel from 'mixpanel-browser'

const env = true
class Mixpanel {
  mixpanel

  constructor(token) {
    if (typeof token !== 'string' || token.length < 1) {
      throw new Error('Invalid mixpanel token')
    }

    mixpanel.init(token, {
      api_host: process.env.MIXPANEL_API,
      loaded: (mixpanel) => {
        this.mixpanel = mixpanel
      },
    })
  }

  identify = (id) => {
    if (env) this.mixpanel.identify(id)
  }

  alias = (id) => {
    if (!env) this.mixpanel.alias(id)
  }

  track = (name, props) => {
    if (env) this.mixpanel.track(name, props)
  }

  setPeople = (props) => {
    if (env) this.mixpanel.people.set(props)
  }

  setOnce = (props) => {
    if (env) this.mixpanel.people.set_once(props)
  }
}

export default function ({ $config }, inject) {
  inject('mixpanel', new Mixpanel($config.MIXPANEL_TOKEN))
}
