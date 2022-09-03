export function getCurrentDate(){
    const today = Date.now();
    return new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(today)
}

export function getDate(d){
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
}