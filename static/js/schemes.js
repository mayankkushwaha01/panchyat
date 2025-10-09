document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const schemeSearch = document.getElementById('scheme-search');
    const searchResults = document.getElementById('search-results');
    const resultsContainer = document.getElementById('results-container');
    
    // Add animation to scheme cards on load
    const schemeCards = document.querySelectorAll('.scheme-card');
    schemeCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Random icon assignment for scheme cards
    const icons = [
        'fa-award', 'fa-hands-helping', 'fa-home', 'fa-seedling', 
        'fa-graduation-cap', 'fa-heartbeat', 'fa-tractor', 'fa-hand-holding-usd'
    ];
    
    document.querySelectorAll('.scheme-icon').forEach(icon => {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        icon.classList.remove('fa-award');
        icon.classList.add(randomIcon);
    });
    
    if (searchBtn && schemeSearch) {
        searchBtn.addEventListener('click', function() {
            const query = schemeSearch.value.trim();
            if (query) {
                // Show loading indicator
                resultsContainer.innerHTML = '<div class="text-center p-4"><i class="fas fa-spinner fa-spin fa-2x"></i><p class="mt-2">Searching schemes...</p></div>';
                searchResults.classList.remove('d-none');
                
                // Simulate search delay for better UX
                setTimeout(() => {
                    // In a real application, this would make an API call
                    // For now, we'll just filter the existing schemes
                    let found = false;
                    resultsContainer.innerHTML = '';
                    
                    schemeCards.forEach(card => {
                        const title = card.querySelector('.card-header h4').textContent.toLowerCase();
                        const description = card.querySelector('.scheme-detail:nth-child(2)').textContent.toLowerCase();
                        
                        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
                            found = true;
                            const clone = card.cloneNode(true);
                            clone.classList.add('mb-3');
                            clone.style.opacity = '0';
                            clone.style.transform = 'translateY(20px)';
                            resultsContainer.appendChild(clone);
                            
                            setTimeout(() => {
                                clone.style.opacity = '1';
                                clone.style.transform = 'translateY(0)';
                            }, 100);
                        }
                    });
                    
                    if (!found) {
                        resultsContainer.innerHTML = '<div class="alert alert-info"><i class="fas fa-info-circle me-2"></i>No schemes found matching your search.</div>';
                    }
                }, 500);
            }
        });
        
        // Enable search on Enter key
        schemeSearch.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Add hover effect to scheme cards
    schemeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.scheme-icon');
            icon.classList.add('fa-bounce');
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.scheme-icon');
            icon.classList.remove('fa-bounce');
        });
    });
});