document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const schemeSearch = document.getElementById('scheme-search');
    const searchResults = document.getElementById('search-results');
    const resultsContainer = document.getElementById('results-container');
    const schemesContainer = document.getElementById('schemes-container');
    
    // Add loading animation
    schemesContainer.innerHTML = `
        <div class="text-center p-5">
            <div class="spinner-grow text-success" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-success fw-bold">Loading schemes data...</p>
        </div>
    `;
    
    // Load schemes data
    loadSchemesData()
        .then(schemes => {
            // Render schemes with a slight delay for better UX
            setTimeout(() => {
                renderSchemes(schemes);
                
                // Add animation to scheme cards on load
                const schemeCards = document.querySelectorAll('.scheme-card');
                schemeCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 150 * index);
                });
                
                // Add hover effects after cards are loaded
                addHoverEffects();
                
                // Add header animation
                const schemeHeader = document.querySelector('.scheme-header');
                if (schemeHeader) {
                    schemeHeader.classList.add('animate__animated', 'animate__fadeIn');
                }
                
                // Setup search functionality
                setupSearch(schemes);
            }, 800);
        })
        .catch(error => {
            console.error('Error loading schemes data:', error);
            schemesContainer.innerHTML = '<div class="alert alert-danger">Failed to load schemes data. Please try again later.</div>';
        });
    
    // Function to load schemes data
    async function loadSchemesData() {
        try {
            const response = await fetch('../static/data/schemes.json');
            if (!response.ok) {
                throw new Error('Failed to fetch schemes');
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading schemes:', error);
            // Return hardcoded schemes as fallback
            return [
                {
                    "name": "Pradhan Mantri Awas Yojana (PMAY)",
                    "description": "Housing scheme to provide affordable housing to all eligible families by 2022.",
                    "eligibility": "Families with annual income up to Rs. 3 lakhs, no house ownership.",
                    "benefits": "Financial assistance up to Rs. 2.5 lakhs for house construction.",
                    "link": "https://pmaymis.gov.in/"
                },
                {
                    "name": "MGNREGA",
                    "description": "Employment scheme guaranteeing 100 days of wage employment to rural households.",
                    "eligibility": "Adult members of rural households willing to do unskilled manual work.",
                    "benefits": "Legal guarantee of 100 days of employment in a financial year.",
                    "link": "https://nrega.nic.in/"
                },
                {
                    "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
                    "description": "Income support scheme for farmers to supplement their financial needs.",
                    "eligibility": "All small and marginal farmers with cultivable landholding.",
                    "benefits": "Rs. 6,000 per year in three equal installments.",
                    "link": "https://pmkisan.gov.in/"
                },
                {
                    "name": "Swachh Bharat Mission (Gramin)",
                    "description": "Campaign to improve sanitation facilities in rural areas.",
                    "eligibility": "All rural households without toilets.",
                    "benefits": "Financial assistance for toilet construction and waste management.",
                    "link": "https://swachhbharatmission.gov.in/"
                }
            ];
        }
    }
    
    // Random icon assignment for scheme cards
    const icons = [
        'fa-award', 'fa-hands-helping', 'fa-home', 'fa-seedling', 
        'fa-graduation-cap', 'fa-heartbeat', 'fa-tractor', 'fa-hand-holding-usd'
    ];
    
    function renderSchemes(schemes) {
        schemesContainer.innerHTML = '';
        
        schemes.forEach(scheme => {
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            
            const schemeCard = document.createElement('div');
            schemeCard.className = 'col-md-6 mb-4';
            schemeCard.innerHTML = `
                <div class="card scheme-card">
                    <div class="card-header">
                        <h4 class="mb-0">${scheme.name}</h4>
                    </div>
                    <div class="card-body">
                        <i class="fas ${randomIcon} scheme-icon"></i>
                        
                        <div class="scheme-detail">
                            <p><i class="fas fa-info-circle scheme-detail-icon"></i><strong>Description:</strong> ${scheme.description}</p>
                        </div>
                        
                        <div class="scheme-detail">
                            <p><i class="fas fa-user-check scheme-detail-icon"></i><strong>Eligibility:</strong> ${scheme.eligibility}</p>
                        </div>
                        
                        <div class="scheme-detail">
                            <p><i class="fas fa-gift scheme-detail-icon"></i><strong>Benefits:</strong> ${scheme.benefits}</p>
                        </div>
                        
                        <div class="mt-4 text-center">
                            <a href="${scheme.link}" target="_blank" class="btn scheme-btn pulse-animation">
                                <i class="fas fa-external-link-alt me-2"></i>Visit Official Website
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            schemesContainer.appendChild(schemeCard);
        });
    }
    
    function setupSearch(schemes) {
        if (searchBtn && schemeSearch) {
            searchBtn.addEventListener('click', function() {
                const query = schemeSearch.value.trim();
                if (query) {
                    // Show loading indicator
                    resultsContainer.innerHTML = '<div class="text-center p-4"><i class="fas fa-spinner fa-spin fa-2x"></i><p class="mt-2">Searching schemes...</p></div>';
                    searchResults.classList.remove('d-none');
                    
                    // Simulate search delay for better UX
                    setTimeout(() => {
                        // Filter schemes based on search query
                        let found = false;
                        resultsContainer.innerHTML = '';
                        
                        schemes.forEach(scheme => {
                            const title = scheme.name.toLowerCase();
                            const description = scheme.description.toLowerCase();
                        
                        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
                            found = true;
                            
                            // Create a result card
                            const resultItem = document.createElement('div');
                            resultItem.className = 'list-group-item';
                            resultItem.innerHTML = `
                                <h5 class="mb-1">${scheme.name}</h5>
                                <p class="mb-1">${scheme.description}</p>
                                <a href="${scheme.link}" target="_blank" class="btn btn-sm btn-primary mt-2">
                                    <i class="fas fa-external-link-alt me-1"></i>Visit Website
                                </a>
                            `;
                            
                            resultsContainer.appendChild(resultItem);
                        }
                    });
                    
                    if (!found) {
                        resultsContainer.innerHTML = '<div class="alert alert-info">No schemes found matching your search criteria.</div>';
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
    
    // Add hover effect to scheme cards (will be applied after cards are loaded)
    function addHoverEffects() {
        const schemeCards = document.querySelectorAll('.scheme-card');
        schemeCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.scheme-icon');
                if (icon) icon.classList.add('fa-bounce');
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.scheme-icon');
                if (icon) icon.classList.remove('fa-bounce');
            });
        });
    }
    
    // Call addHoverEffects after schemes are rendered
    setTimeout(addHoverEffects, 1000);
});