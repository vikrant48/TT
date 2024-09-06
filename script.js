let matchCount = 0;

function addRecord() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const winner = document.getElementById('winner').value;

    if (player1 === '' || player2 === '' || winner === '') {
        alert('Please fill out all fields!');
        return;
    }

    matchCount++;

    // Add new row to the table
    const table = document.getElementById('recordsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cellMatch = newRow.insertCell(0);
    const cellPlayer1 = newRow.insertCell(1);
    const cellPlayer2 = newRow.insertCell(2);
    const cellWinner = newRow.insertCell(3);

    cellMatch.textContent = matchCount;
    cellPlayer1.textContent = player1;
    cellPlayer2.textContent = player2;
    cellWinner.textContent = winner;

    // Clear input fields
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    document.getElementById('winner').value = '';
}
