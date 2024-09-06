let matchCount = 0;
const playerWins = JSON.parse(localStorage.getItem('playerWins')) || {};
const records = JSON.parse(localStorage.getItem('records')) || [];
const players = JSON.parse(localStorage.getItem('players')) || [];

window.onload = function() {
    loadRecords();
    updatePlayerWinsTable();
    updatePlayerDropdowns();
};

function addPlayer() {
    const newPlayer = document.getElementById('newPlayer').value.trim();
    
    if (newPlayer === '') {
        alert('Please enter a valid player name.');
        return;
    }
    
    if (!players.includes(newPlayer)) {
        players.push(newPlayer);
        localStorage.setItem('players', JSON.stringify(players));
        updatePlayerDropdowns();
    } else {
        alert('Player already exists.');
    }
    
    document.getElementById('newPlayer').value = ''; // Clear the input field
}

function addRecord() {
    const date = document.getElementById('date').value;
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;
    const winner = document.getElementById('winner').value;

    if (date === '' || player1 === '' || player2 === '' || winner === '') {
        alert('Please fill out all fields!');
        return;
    }

    matchCount = records.length + 1;

    // Update the winner count
    const winnerName = winner === "Player 1" ? player1 : player2;
    playerWins[winnerName] = (playerWins[winnerName] || 0) + 1;

    // Save the record
    records.push({ matchCount, date, player1, player2, winnerName });
    localStorage.setItem('records', JSON.stringify(records));
    localStorage.setItem('playerWins', JSON.stringify(playerWins));

    // Add new row to the game record table
    addRecordToTable(matchCount, date, player1, player2, winnerName);

    // Update the player wins table
    updatePlayerWinsTable();

    // Clear input fields
    document.getElementById('date').value = '';
    document.getElementById('winner').value = '';
}

function addRecordToTable(matchCount, date, player1, player2, winnerName) {
    const recordsTable = document.getElementById('recordsTable').getElementsByTagName('tbody')[0];
    const newRow = recordsTable.insertRow();

    const cellMatch = newRow.insertCell(0);
    const cellDate = newRow.insertCell(1);
    const cellPlayer1 = newRow.insertCell(2);
    const cellPlayer2 = newRow.insertCell(3);
    const cellWinner = newRow.insertCell(4);

    cellMatch.textContent = matchCount;
    cellDate.textContent = date;
    cellPlayer1.textContent = player1;
    cellPlayer2.textContent = player2;
    cellWinner.textContent = winnerName;
}

function updatePlayerWinsTable() {
    const playerWinsTable = document.getElementById('playerWinsTable').getElementsByTagName('tbody')[0];
    playerWinsTable.innerHTML = ''; // Clear existing rows

    for (const player in playerWins) {
        const newRow = playerWinsTable.insertRow();
        const cellPlayerName = newRow.insertCell(0);
        const cellTotalWins = newRow.insertCell(1);

        cellPlayerName.textContent = player;
        cellTotalWins.textContent = playerWins[player];
    }
}

function loadRecords() {
    if (records.length > 0) {
        for (const record of records) {
            addRecordToTable(record.matchCount, record.date, record.player1, record.player2, record.winnerName);
        }
    }
}

function updatePlayerDropdowns() {
    const player1Select = document.getElementById('player1');
    const player2Select = document.getElementById('player2');

    // Clear existing options
    player1Select.innerHTML = '';
    player2Select.innerHTML = '';

    // Add a default option
    const defaultOption1 = document.createElement('option');
    defaultOption1.textContent = 'Select Player 1';
    defaultOption1.disabled = true;
    defaultOption1.selected = true;
    player1Select.appendChild(defaultOption1);

    const defaultOption2 = document.createElement('option');
    defaultOption2.textContent = 'Select Player 2';
    defaultOption2.disabled = true;
    defaultOption2.selected = true;
    player2Select.appendChild(defaultOption2);

    // Add player names as options
    players.forEach(player => {
        const option1 = document.createElement('option');
        option1.value = player;
        option1.textContent = player;
        player1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = player;
        option2.textContent = player;
        player2Select.appendChild(option2);
    });
}
