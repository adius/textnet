const SunCalc = require('suncalc')

function getText () {
  const now = new Date()
  const nowTimeString = now
    .toISOString()
    .slice(-13, -8)
  const sunData = SunCalc.getTimes(now, 52.397, 13.077)
  const daytimeDuration = sunData.sunset - sunData.sunrise
  const daytimeDuration24 = new Date(daytimeDuration)
    .toISOString()
    .slice(-13, -8)
  const passedDaytime = now - sunData.sunrise
  const percentageOfDaytime = Math.trunc(
    (passedDaytime / daytimeDuration) * 100
  )

  function getTime (date) {
    return date
      .toISOString()
      .slice(-13, -8)
  }

  const entries = [
    {
      type: 'sunrise',
      time: getTime(sunData.sunrise),
      icon: '🌅',
    },
    {
      type: 'solarNoon',
      time: getTime(sunData.solarNoon),
      icon: '🌞',
    },
    {
      type: 'sunset',
      time: getTime(sunData.sunset),
      icon: '🌇',
    },
    {
      type: 'nadir',
      time: getTime(sunData.nadir),
      icon: '🌑',
    },
    {
      type: 'current',
      time: nowTimeString +
        ` (${percentageOfDaytime}% of ${daytimeDuration24} h daytime)`,
      icon: '🕓',
    },
  ]

  const text = entries
    .sort((entryA, entryB) =>
      entryA.time.localeCompare(entryB.time)
    )
    .map(entry => entry.icon + '   ' + entry.time)
    .join('\n')

  return text + '\n'
}


module.exports = () => {
  const response = {
    statusCode: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      vary: 'Accept-Encoding',
    },
    body: getText(),
  }

  return response
}
