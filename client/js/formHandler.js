import {sendToServer} from './api'
import {renderTrip} from './ui'

export async function handleSubmit(event) {
  event.preventDefault();

  const inputs = new FormData(event.target)
  let valid = true;
  const payload = {}
  for (const [name, value] of inputs) {
    if (!value) {
      valid = false
    } else {
      payload[name] = value
    }
  }

  // If the URL is valid, send it to the server using the serverURL constant above
  if (valid) {
    let result = await sendToServer(payload);
    renderTrip(result)
    event.target.classList.add('hidden')
  } else {
    alert("Sorry url you provided is not valid");
  }
}