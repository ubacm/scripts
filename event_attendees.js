const slackToken = 'REPLACE_WITH_SLACK_TOKEN'
const eventId = 'REPLACE_WITH_EVENT_CODE'

const chickenUsersUrl = 'https://checkin-chicken.herokuapp.com/users/scores'
const slackUsersListUrl = `https://slack.com/api/users.list?token=${slackToken}`

fetch(chickenUsersUrl)
.then(res => res.json())
.then(data => {
  const attendees = data
    .filter(person => person.events.includes(eventId))
    .map(attendee => attendee.slack_id)

  // Fetch Slack Users
  fetch(slackUsersListUrl)
  .then(res => res.json())
  .then(data => {
    const slackUsers = data.members
    slackUsers
      .filter(user => attendees.includes(user.id))
      .map(user => {
        console.log(`${user.profile.real_name} <${user.profile.email}>`)
      })
  })
})
.catch(error => console.error(error))
