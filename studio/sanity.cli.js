import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'twrg43oo',
    dataset: 'production'
  },
  studioHost: 'ongrowing',
  deployment: {
    appId: 'ca03h2ino4jdyezd1kgj3rde',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
