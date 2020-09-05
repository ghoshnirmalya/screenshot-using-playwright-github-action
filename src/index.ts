require('dotenv').config()

import launchPlaywright from './lib/launch-playwright'
;(async () => {
  await launchPlaywright(
    'chromium',
    ['--no-sandbox'],
    'http://whatsmyuseragent.org/'
  )
  await launchPlaywright('webkit', [], 'http://whatsmyuseragent.org/')
  await launchPlaywright('firefox', [], 'http://whatsmyuseragent.org/')
})()