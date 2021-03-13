export default function Request(url){
    return new Promise((resolve, reject) =>{
        fetch(url)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error));
    })
}