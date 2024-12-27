function displayHome() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <p>Choose a game and smash it in just 5 minutes!</p>
        <div class="home-images">
            <img src="../Backend/Simon/Simon.png" alt="Game Image 1" class="home-image" onclick="window.location.href='../Backend/Simon/index.html'">
            <img src="../Backend/WhackMole/WhackMole.png" alt="Game Image 2" class="home-image" onclick="window.location.href='../Backend/WhackMole/index.html'">
            <img src="../Backend/Candy/Candy.png" alt="Game Image 3" class="home-image" onclick="window.location.href='../Backend/Candy/index.html'">
        </div>
        <div class="home-icons">
            <div class="icon">
                <h3>🔥 Fast-Paced</h3>
                <p>Quick games for instant fun!</p>
            </div>
            <div class="icon">
                <h3>🏆 Compete</h3>
                <p>Challenge your friends and climb the leaderboard!</p>
            </div>
            <div class="icon">
                <h3>🎉 Fun</h3>
                <p>Engaging games that keep you coming back for more!</p>
            </div>
        </div>
    `;
}


function displayAbout() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h2>About 5minSmash</h2>
        <div class="about-container">
            <div class="about-card">
                <h3>🎯 Mission</h3>
                <p>Our mission is to provide fast-paced, fun, and engaging games that challenge your skills and entertain you.</p>
            </div>
            <div class="about-card">
                <h3>🚀 Vision</h3>
                <p>We envision a world where anyone can enjoy quick gaming experiences, enhancing their reflexes and problem-solving skills.</p>
            </div>
            <div class="about-card">
                <h3>💡 Values</h3>
                <p>We value creativity, community, and continuous improvement. Join us as we build a vibrant gaming community!</p>
            </div>
        </div>
    `;
}


function displayListOfGames() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h2>List of Games</h2>
        <div class="card-container">
            ${createGameCard('Game 1', 'Flappy Bird', 'FlappyBird')}
            ${createGameCard('Game 2', 'Tic Tac Toe', 'TicTacToe')}
            ${createGameCard('Game 3', 'Chess', 'Chess')}
            ${createGameCard('Game 4', 'Whack a Mole', 'WhackMole')}
            ${createGameCard('Game 5', 'Sudoku', 'Sudoku')}
            ${createGameCard('Game 6', 'Doodle Jump', 'DoodleJump')}
            ${createGameCard('Game 7', 'Connect Four', 'ConnectFour')}
            ${createGameCard('Game 8', 'Simon', 'Simon')}
            ${createGameCard('Game 9', 'Candy', 'Candy')}
            ${createGameCard('Game 10', 'Rock, Paper & Scissor', 'RockPaperScissor')}
            ${createGameCard('Game 11', 'Bubble', 'Bubble')}
            ${createGameCard('Game 12', 'Typing Test', 'TypingTest')}
        </div>
    `;
}

function createGameCard(title, description, folderName) {
    return `
        <div class="card" style="background-image: url('../Backend/${folderName}/${folderName}.png');background-size: 100%;">
        
    <h3 >${title}</h3>
        <p>${description}</p>
        <button onclick="window.location.href='../Backend/${folderName}/index.html'">Play Now</button>
        </div>
    `;
}

function displayLogin() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h2>Login</h2>
        <form>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required style="margin-bottom: 10px;">
            <br>
            <label for="password" >Password:</label>
            <input type="password" id="password" name="password" required style="margin-bottom: 10px;">
            <br>
            <button type="submit">Login</button>
        </form>
    `;
}

function displayListOfUsers() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '<h2>Leaderboard</h2><p>Here will be a list of users.</p>';
}

const sections = {
    home: displayHome,
    about: displayAbout,
    listOfGames: displayListOfGames,
    listOfUsers: displayListOfUsers,
    login: displayLogin
};

function loadSection(sectionName) {
    if (sections[sectionName]) {
        sections[sectionName]();
    } else {
        console.error('Section not found');
    }
}

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionName = link.getAttribute('href').substring(1);
        loadSection(sectionName);
    });
});

// Load the home section by default
loadSection('home');
