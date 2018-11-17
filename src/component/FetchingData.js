export const FetchingData = () => {
    fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${call}`)
    .then(response => response.json())
}