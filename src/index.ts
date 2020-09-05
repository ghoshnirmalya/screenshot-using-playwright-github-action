require('dotenv').config()

import launchPlaywright from './lib/launch-playwright'
;(async () => {
  const urlsString = process.argv[2]
  const urlsArray = JSON.parse(urlsString)

  urlsArray.map(async (url: string) => {
    await launchPlaywright('webkit', [], url)
    await launchPlaywright('firefox', [], url)
    await launchPlaywright('chromium', [], url)
  })
})()
