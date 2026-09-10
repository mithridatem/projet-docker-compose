async function getVisits() {

    const response = await fetch("/api/visits");

    const data = await response.json();

    document.querySelector("#visits").textContent = data.visits;
}

getVisits();