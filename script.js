let selectedBet = ""; // Loại cược đã chọn
let userBalance = 10000; // Số dư mặc định khi đăng nhập

// Phát nhạc tự động khi vào trang
window.onload = function() {
    const music = document.getElementById('background-music');
    music.play().catch(error => {
        console.error("Lỗi khi phát nhạc:", error);
    });
};

// Đăng nhập và hiển thị khu vực trò chơi
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username.trim() !== '') {
        alert(`Chào mừng, ${username}!`);
        document.getElementById('display-username').textContent = `Người chơi: ${username}`;
        document.getElementById('form-container').classList.add('hidden');
        document.getElementById('game-area').classList.remove('hidden');
    } else {
        alert('Vui lòng nhập tên của bạn!');
    }
});

// Xử lý chọn loại cược
document.getElementById('bet-tai').addEventListener('click', () => handleBetSelection('Tài'));
document.getElementById('bet-xiu').addEventListener('click', () => handleBetSelection('Xỉu'));
document.getElementById('bet-chan').addEventListener('click', () => handleBetSelection('Chẵn'));
document.getElementById('bet-le').addEventListener('click', () => handleBetSelection('Lẻ'));

// Hiển thị form đặt cược
function handleBetSelection(bet) {
    selectedBet = bet;
    document.getElementById('status').textContent = `Bạn đã chọn cược: ${bet}`;
    document.getElementById('bet-form').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden'); // Ẩn lỗi nếu có
}

// Xử lý đặt cược
document.getElementById('confirm-bet').addEventListener('click', () => {
    const betAmount = parseInt(document.getElementById('bet-amount').value, 10);

    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Vui lòng nhập số tiền hợp lệ!');
        return;
    }

    if (betAmount > userBalance) {
        document.getElementById('error-message').classList.remove('hidden');
        return;
    }

    // Trừ tiền
    userBalance -= betAmount;
    document.getElementById('display-balance').textContent = `Số dư: ${userBalance.toLocaleString()}₫`;
    document.getElementById('bet-form').classList.add('hidden');
    document.getElementById('loading-message').classList.remove('hidden');

    // Hiển thị thông báo chờ và quay xúc xắc
    setTimeout(() => {
        document.getElementById('loading-message').classList.add('hidden');
        rollDice(betAmount);
    }, 8000);
});

// Quay xúc xắc
function rollDice(betAmount) {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const diceContainer = document.getElementById('dice-container');
    diceContainer.textContent = "🎲";

    setTimeout(() => {
        diceContainer.textContent = diceValue;
        checkResult(diceValue, betAmount);
    }, 1000);
}

// Kiểm tra kết quả
function checkResult(diceValue, betAmount) {
    let result = diceValue >= 4 ? "Tài" : "Xỉu";
    result += diceValue % 2 === 0 ? " và Chẵn" : " và Lẻ";

    if (
        (selectedBet === "Tài" && diceValue >= 4) ||
        (selectedBet === "Xỉu" && diceValue < 4) ||
        (selectedBet === "Chẵn" && diceValue % 2 === 0) ||
        (selectedBet === "Lẻ" && diceValue % 2 !== 0)
    ) {
        const winAmount = betAmount * 2;
        userBalance += winAmount;
        alert(`🎉 Chúc mừng! Xúc xắc là ${diceValue}. Bạn đã thắng ${winAmount.toLocaleString()}₫!`);
    } else {
        alert(`😢 Rất tiếc! Xúc xắc là ${diceValue}. Bạn đã thua.`);
    }

    document.getElementById('display-balance').textContent = `Số dư: ${userBalance.toLocaleString()}₫`;
}