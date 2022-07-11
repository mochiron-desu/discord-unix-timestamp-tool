function calculteRelTime(oldtime, newtime) {
    const difference = oldtime - newtime;
    let output = ``
    if (difference < 60) {
        // Less than a minute has passed:
        output = `${difference} seconds ago`;
    } else if (difference < 3600) {
        // Less than an hour has passed:
        output = `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
        // Less than a day has passed:
        output = `${Math.floor(difference / 3600)} hours ago`;
    } else if (difference < 2620800) {
        // Less than a month has passed:
        output = `${Math.floor(difference / 86400)} days ago`;
    } else if (difference < 31449600) {
        // Less than a year has passed:
        output = `${Math.floor(difference / 2620800)} months ago`;
    } else {
        // More than a year has passed:
        output = `${Math.floor(difference / 31449600)} years ago`;
    }
    return output;
}


//getting local time and assigning the values to a JSON obj
var cur_date = new Date();
var def_unix_time = Math.floor(cur_date.getTime() / 1000);
var time_data = {
    year: cur_date.getFullYear(),
    month: cur_date.getMonth(),
    day: cur_date.getDate(),
    hours: cur_date.getHours(),
    minutes: cur_date.getMinutes(),
    seconds: cur_date.getSeconds()
};

//assigning the input to variable
year_inp = document.querySelector("#year-input");
month_inp = document.querySelector("#month-input");
day_inp = document.querySelector("#day-input");
time_inp = document.querySelector("#input-time");
sec_inp = document.querySelector("#input-time-sec");



//check to see if minutes are in single digit
if (`${time_data.minutes}`.length <= 1) {
    var time = time_data.hours + ":0" + time_data.minutes;
}
else {
    var time = time_data.hours + ":" + time_data.minutes;
}

//displaying the defaut values
document.body.onload = function () {
    year_inp.value = time_data.year;
    month_inp.value = time_data.month;
    day_inp.value = time_data.day;
    time_inp.value = time;
    sec_inp.value = time_data.seconds;
}


//displaying the output on the button press
document.querySelector("#push").onclick = function () {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    //converting the date input to individual values
    var hours = time_inp.value.substring(0, 2)
    var minutes = time_inp.value.substring(3, 5)

    //getting the current values from the input
    var new_time_data = {
        year: year_inp.value,
        month: month_inp.value,
        day: day_inp.value,
        hours: hours,
        minutes: minutes,
        seconds: sec_inp.value
    }

    //assigning the values to the new_date variable
    var new_date = new Date()
    new_date.setFullYear(new_time_data.year, new_time_data.month, new_time_data.day);
    new_date.setHours(new_time_data.hours)
    new_date.setMinutes(new_time_data.minutes)
    new_date.setSeconds(new_time_data.seconds)


    //getting the UNIX timestamp
    var unix_time = Math.floor(new_date.getTime() / 1000);



    //showing the output
    document.querySelector(".output-container").innerHTML = `
    <table id="output-table">
                    <tr>
                        <th>Type</th>
                        <th>Format</th>
                        <th>Output</th>
                    <tr>
                        <td = "type">Default</td>
                        <td class = "format">&lt;t:${unix_time}&gt;</td>
                        <td id = "output">${monthNames[new_date.getMonth()]} ${new_date.getDate()}, ${new_date.getFullYear()} ${new_date.toLocaleString('en-IN', { hour: 'numeric', hour12: true })}</td>
                    </tr>
                    <tr>
                        <td>Short Time</td>
                        <td class = "format">&lt;t:${unix_time}:t&gt;</td>
                        <td class = "output">${new_date.toLocaleString('en-IN', { hour: 'numeric', hour12: true })}</td>
                    </tr>
                    <tr>
                        <td>Long Time</td>
                        <td class = "format">&lt;t:${unix_time}:T&gt;</td>
                        <td class = "output">${new_date.toLocaleTimeString('en-IN')}</td>
                    </tr>
                    <tr>
                        <td>Short Date</td>
                        <td class = "format">&lt;t:${unix_time}:d&gt;</td>
                        <td class = "output">${new_time_data.day}/${new_time_data.month}/${new_time_data.year}</td>
                    </tr>
                    <tr>
                        <td>Long Date</td>
                        <td class = "format">&lt;t:${unix_time}:D&gt;</td>
                        <td class = "output">${monthNames[new_date.getMonth()]} ${new_date.getDate()}, ${new_date.getFullYear()}</td>
                    </tr>
                    <tr>
                        <td>Short Date/Time</td>
                        <td class = "format">&lt;t:${unix_time}:f&gt;</td>
                        <td class = "output">${monthNames[new_date.getMonth()]} ${new_date.getDate()}, ${new_date.getFullYear()} ${new_date.toLocaleString('en-IN', { hour: 'numeric', hour12: true })}</td>
                    </tr>
                    <tr>
                        <td>Long Date/Time</td>
                        <td class = "format">&lt;t:${unix_time}:F&gt;</td>
                        <td class = "output">${weekdays[new_date.getDay()]}, ${monthNames[new_date.getMonth()]} ${new_date.getDate()}, ${new_date.getFullYear()} ${new_date.toLocaleString('en-IN', { hour: 'numeric', hour12: true })}</td>
                    </tr>
                    <tr>
                        <td>Relative Time</td>
                        <td class = "format">&lt;t:${unix_time}:R&gt;</td>
                        <td class = "output">${calculteRelTime(def_unix_time, unix_time)}</td>
                    </tr>
                </table>`
    var formatcollection = document.getElementsByClassName("format");
    for (let i = 0; i < formatcollection.length; i++) {
        formatcollection[i].onclick = function () {
            navigator.clipboard.writeText(`${formatcollection[i].innerHTML}`)
        }
    }
}

document.querySelector("#reset").onclick = function () {
    year_inp.value = "";
    month_inp.value = "";
    day_inp.value = "";
    time_inp.value = "";
    sec_inp.value = ""
}

