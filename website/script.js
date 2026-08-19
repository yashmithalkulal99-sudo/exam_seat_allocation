emailjs.init("wG8UbpQgieb9CIYXc");

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm(
        "service_n48me89",
        "template_nsbbfi8",
        this
    )
    .then(function() {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset();
    })
    .catch(function(error) {
        alert("Failed to send message. Please try again.");
        console.log(error);
    });
});