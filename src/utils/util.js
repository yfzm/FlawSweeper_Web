export function parse_time(sec) {
    if (typeof sec === 'number') {
        let date = new Date(sec);
        return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    } else {
        return sec;
    }
}
