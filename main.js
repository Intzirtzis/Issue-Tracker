// Προσθέτω έναν 'listener', καλώντας τη συνάρτηση saveIssue όταν η φόρμα υποβάλλεται (submit).
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    var issueDescription = document.getElementById('issueDescriptionInput').value;
    var issueSeriousness = document.getElementById('issueSeriousnessInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';
    // Δημιουργούμε ένα νέο αντικείμενο θέματος (issue) με τα δεδομένα παραπάνω.
    var issue = {
        id: issueId,
        description: issueDescription,
        seriousness: issueSeriousness,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };
    // Ελέγχουμε τον τοπικό αποθηκευτικό χώρο για υπάρχοντα θέματα και προσθέτουμε το νέο θέμα
    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    // Καθαρίζουμε τη φόρμα
    document.getElementById('issueInputForm').reset();
    // Ανανεώνουμε τη λίστα με τα θέματα
    fetchIssues();
    // Αποτρέπουμε την προεπιλεγμένη συμπεριφορά της φόρμας
    e.preventDefault();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = "Closed";
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function fetchIssues() {
    // Ανάκτηση θεμάτων από τον τοπικό αποθηκευτικό χώρο
    var issues = JSON.parse(localStorage.getItem('issues'));
    // Λήψη του στοιχείου HTML όπου θα εμφανίζονται τα θέματα
    var issuesList = document.getElementById('issueList');
    //Καθαρισμός του υπάρχοντος περιεχομένου στο στοιχείο issuesList
    issuesList.innerHTML = '';

    // Επανάληψη μέσω κάθε θέματος και δημιουργία στοιχείων HTML για την εμφάνισή τους
    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var description = issues[i].description;
        var seriousness = issues[i].seriousness;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        // Δημιουργία στοιχείων HTML για κάθε θέμα και προσθήκη τους στο issuesList
        issuesList.innerHTML += '<div class= "well">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + description + '</h3' +
            '<p><span class="glyphicon glyphicon-time"></span>' + seriousness + '</p>' +
            '<p><span class="glyphicon glyphicon-time"></span>' + assignedTo + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn bth-warning">Close</a>' +
            '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn bth-danger">Delete</a>' +
            '</div>';
    }
}
