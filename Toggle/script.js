function fun(){
    document.getElementById("light").checked = true;
    document.body.style.color = 'var(--fg)';    

    document.getElementById("btn").classList.add("dvd")
    document.getElementById("btn").classList.remove("fade-one")
}

function toggleMode() {
    var button = document.getElementById("mode-toggle");
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        button.textContent = "Dark Mode";
    } else {
        button.textContent = "Light Mode";
        stopToggle();
        displayMessages();
    }
}

function stopToggle() {
    var button = document.getElementById("mode-toggle");
    button.disabled = true;
}

function displayMessages() {
    setTimeout(function() {
        alert("Message 1");
    }, 3000);
    setTimeout(function() {
        alert("Message 2");
    }, 6000);
    setTimeout(function() {
        alert("Message 3");
        var button = document.getElementById("mode-toggle");
        button.disabled = false;
    }, 9000);
}
