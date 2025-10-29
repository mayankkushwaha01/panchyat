document.addEventListener('DOMContentLoaded', function() {
    // Fetch budget data
    fetch('../data/budget.json')
        .then(response => response.json())
        .then(data => {
            // Update budget summary
            document.getElementById('budgetTotal').textContent = new Intl.NumberFormat('en-IN').format(data.total);
            document.getElementById('budgetAllocated').textContent = new Intl.NumberFormat('en-IN').format(data.allocated);
            document.getElementById('budgetRemaining').textContent = new Intl.NumberFormat('en-IN').format(data.remaining);
            
            // Budget Chart
            const budgetCtx = document.getElementById('budgetChart').getContext('2d');
            const budgetChart = new Chart(budgetCtx, {
                type: 'pie',
                data: {
                    labels: data.categories.map(category => category.name),
                    datasets: [{
                        data: data.categories.map(category => category.amount),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error loading budget data:', error));
        
    // Fetch projects data
    fetch('../data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsList = document.getElementById('projectsList');
            // Display first 2 projects
            projects.slice(0, 2).forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'mb-3';
                projectDiv.innerHTML = `
                    <h5>${project.name}</h5>
                    <p class="text-muted">${project.description}</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-success" role="progressbar" 
                             style="width: ${project.completion}%" 
                             aria-valuenow="${project.completion}" 
                             aria-valuemin="0" 
                             aria-valuemax="100">${project.completion}%</div>
                    </div>
                    <p><small>Status: <span class="badge bg-info">${project.status}</span></small></p>
                    <small class="text-muted">Start: ${project.start_date} | End: ${project.end_date}</small>
                `;
                projectsList.appendChild(projectDiv);
            });
        })
        .catch(error => console.error('Error loading projects data:', error));
});