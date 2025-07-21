let currentMoney = 128000000000; // Starting with Jeff Bezos' wealth
let totalSpent = 0;
let purchases = {};

// Format numbers with commas
function formatMoney(amount) {
    return amount.toLocaleString();
}

// Buy item function
function buyItem(price, itemName) {
    if (currentMoney >= price) {
        currentMoney -= price;
        totalSpent += price;
        
        // Track purchases
        if (purchases[itemName]) {
            purchases[itemName]++;
        } else {
            purchases[itemName] = 1;
        }
        
        updateDisplay();
        updateQuantity(itemName);
        checkAchievements();
        
        // Show purchase feedback
        showPurchaseFeedback(itemName, price);
    } else {
        alert("Not enough money! You need $" + formatMoney(price - currentMoney) + " more.");
    }
}

// Update money display
function updateDisplay() {
    document.getElementById('moneyLeft').textContent = formatMoney(currentMoney);
    document.getElementById('moneySpent').textContent = formatMoney(totalSpent);
    
    // Update button states
    document.querySelectorAll('.item button').forEach(button => {
        const item = button.closest('.item');
        const price = parseInt(item.dataset.price);
        button.disabled = currentMoney < price;
    });
}

// Update quantity display
function updateQuantity(itemName) {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        const name = item.querySelector('span').textContent;
        if (name === itemName) {
            const quantitySpan = item.querySelector('.quantity');
            quantitySpan.textContent = purchases[itemName] || 0;
        }
    });
}

// Show purchase feedback
function showPurchaseFeedback(itemName, price) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1000;
        font-weight: bold;
    `;
    feedback.textContent = `✅ Bought ${itemName} for $${formatMoney(price)}!`;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

// Check achievements
function checkAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    let achievements = [];
    
    if (totalSpent >= 1000000) {
        achievements.push("🏆 Millionaire Spender - Spent your first million!");
    }
    
    if (totalSpent >= 1000000000) {
        achievements.push("💎 Billionaire Spender - Spent your first billion!");
    }
    
    if (purchases['Private Jet']) {
        achievements.push("✈️ High Flyer - Bought a private jet!");
    }
    
    if (purchases['Private Island']) {
        achievements.push("🏝️ Island Owner - Bought a private island!");
    }
    
    if (Object.keys(purchases).length >= 5) {
        achievements.push("🛒 Shopaholic - Bought 5 different items!");
    }
    
    if (totalSpent >= currentMoney + totalSpent * 0.9) {
        achievements.push("💸 Big Spender - Spent 90% of your wealth!");
    }
    
    if (achievements.length > 0) {
        achievementsList.innerHTML = achievements.map(achievement => 
            `<div class="achievement">${achievement}</div>`
        ).join('');
    }
}

// Billionaire selector
document.querySelectorAll('.billionaire-card').forEach(card => {
    card.addEventListener('click', () => {
        // Remove active class from all cards
        document.querySelectorAll('.billionaire-card').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        card.classList.add('active');
        
        // Reset money
        currentMoney = parseInt(card.dataset.wealth);
        totalSpent = 0;
        purchases = {};
        
        // Reset all quantities
        document.querySelectorAll('.quantity').forEach(q => q.textContent = '0');
        
        // Update display
        updateDisplay();
        
        // Clear achievements
        document.getElementById('achievementsList').innerHTML = '<p>Start spending to unlock achievements!</p>';
        
        // Show feedback
        const billionaireName = card.dataset.name;
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #007bff;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            z-index: 1000;
            font-weight: bold;
        `;
        feedback.textContent = `💰 Now playing as ${billionaireName}!`;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    });
});

// Initialize display
updateDisplay();

// Add some fun facts
const funFacts = [
    "💡 Fun Fact: Jeff Bezos makes about $321 million per day!",
    "🚀 Fun Fact: Elon Musk's wealth could fund NASA for 11 years!",
    "💻 Fun Fact: Bill Gates could buy every NFL team and still have money left!",
    "🌍 Fun Fact: You could end world hunger for a year with $44 billion!",
    "🏠 Fun Fact: The most expensive house ever sold was $238 million!"
];

// Show random fun fact every 30 seconds
setInterval(() => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    const factDiv = document.createElement('div');
    factDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 123, 255, 0.9);
        color: white;
        padding: 1rem;
        border-radius: 5px;
        max-width: 300px;
        z-index: 1000;
    `;
    factDiv.textContent = randomFact;
    document.body.appendChild(factDiv);
    
    setTimeout(() => {
        factDiv.remove();
    }, 5000);
}, 30000);
  
