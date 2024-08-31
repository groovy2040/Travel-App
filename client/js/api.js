import { serverURL } from "./constants";

// Function to send data to the server

export async function sendToServer(payload) {
    return fetch(`${serverURL}/location`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    }).then((res) => res.json());
}
export async function getTrips() {
    return fetch(`${serverURL}/trips`).then((res) => res.json());
}
export async function deleteTrip(id) {
    return fetch(`${serverURL}/trips/${id}`,{
        method:"DELETE"
    }).then((res) => res.json());
}