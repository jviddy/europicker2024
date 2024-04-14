document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('football-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const team = document.getElementById('team').value;
        const email = document.getElementById('email').value;
        const goals = document.getElementById('goals').value;
        const lastGoalTime = document.getElementById('last-goal-time').value;

        if (!name || !team || !email || !goals || !lastGoalTime) {
            messageDiv.innerText = 'Please fill in all fields.';
            return;
        }

        if (!validateEmail(email)) {
            messageDiv.innerText = 'Please enter a valid email address.';
            return;
        }

        const data = {
            gameName: 'Euro2024',
            leagueName: 'test',
            name: name,
            team: team,
            email: email,
            goals: goals,
            lastGoalTime: lastGoalTime
        };

        // Call Firebase function to submit data
        submitDataToFirebase(data);
    });

    function validateEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }
});
