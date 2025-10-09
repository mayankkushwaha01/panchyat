from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from datetime import datetime
import os
import json
import uuid
import requests

app = Flask(__name__)
app.config['SECRET_KEY'] = 'panchayat-governance-secret-key'

# Data storage (in a real application, this would be a database)
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
os.makedirs(DATA_DIR, exist_ok=True)

GRIEVANCES_FILE = os.path.join(DATA_DIR, 'grievances.json')
PROJECTS_FILE = os.path.join(DATA_DIR, 'projects.json')
BUDGET_FILE = os.path.join(DATA_DIR, 'budget.json')
LAND_RECORDS_FILE = os.path.join(DATA_DIR, 'land_records.json')

# Initialize data files if they don't exist
def initialize_data_files():
    if not os.path.exists(GRIEVANCES_FILE):
        with open(GRIEVANCES_FILE, 'w') as f:
            json.dump([], f)
    
    if not os.path.exists(PROJECTS_FILE):
        sample_projects = [
            {
                "id": str(uuid.uuid4()),
                "name": "Village Road Construction",
                "description": "Construction of 5km road connecting outer villages",
                "budget": 2500000,
                "start_date": "2024-01-15",
                "end_date": "2024-06-30",
                "status": "In Progress",
                "completion": 35
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Community Water Purification System",
                "description": "Installation of water purifiers in 5 locations",
                "budget": 1200000,
                "start_date": "2024-02-10",
                "end_date": "2024-04-30",
                "status": "In Progress",
                "completion": 65
            }
        ]
        with open(PROJECTS_FILE, 'w') as f:
            json.dump(sample_projects, f)
    
    if not os.path.exists(BUDGET_FILE):
        sample_budget = {
            "total": 10000000,
            "allocated": 6500000,
            "remaining": 3500000,
            "categories": [
                {"name": "Infrastructure", "amount": 4000000},
                {"name": "Education", "amount": 1500000},
                {"name": "Healthcare", "amount": 1000000},
                {"name": "Agriculture", "amount": 2000000},
                {"name": "Administrative", "amount": 1500000}
            ]
        }
        with open(BUDGET_FILE, 'w') as f:
            json.dump(sample_budget, f)
    
    if not os.path.exists(LAND_RECORDS_FILE):
        sample_land_records = [
            {
                "id": str(uuid.uuid4()),
                "owner": "Ramesh Kumar",
                "area": "2.5 acres",
                "location": "North Village, Plot 123",
                "survey_number": "NS-123-456-789",
                "verified": True,
                "hash": "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
            },
            {
                "id": str(uuid.uuid4()),
                "owner": "Sunita Devi",
                "area": "1.8 acres",
                "location": "East Village, Plot 45",
                "survey_number": "ES-045-789-012",
                "verified": True,
                "hash": "0x6b23c0d5f35d1b11f9b683f0b0a617355deb11277d91ae091d399c655b87940d"
            }
        ]
        with open(LAND_RECORDS_FILE, 'w') as f:
            json.dump(sample_land_records, f)

# Initialize data files
initialize_data_files()

# Helper functions
def load_data(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def save_data(data, file_path):
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

# Routes
@app.route('/')
def home():
    projects = load_data(PROJECTS_FILE)
    budget = load_data(BUDGET_FILE)
    return render_template('index.html', projects=projects, budget=budget)

@app.route('/projects')
def projects():
    projects = load_data(PROJECTS_FILE)
    return render_template('projects.html', projects=projects)

@app.route('/budget')
def budget():
    budget = load_data(BUDGET_FILE)
    return render_template('budget.html', budget=budget)

@app.route('/land-records')
def land_records():
    records = load_data(LAND_RECORDS_FILE)
    return render_template('land_records.html', records=records)

@app.route('/verify-land/<record_id>')
def verify_land(record_id):
    records = load_data(LAND_RECORDS_FILE)
    record = next((r for r in records if r["id"] == record_id), None)
    if record:
        return render_template('verify_land.html', record=record)
    flash('Record not found', 'danger')
    return redirect(url_for('land_records'))

@app.route('/grievance-form')
def grievance_form():
    return render_template('grievance_form.html')

@app.route('/submit-grievance', methods=['POST'])
def submit_grievance():
    if request.method == 'POST':
        name = request.form.get('name')
        contact = request.form.get('contact')
        category = request.form.get('category')
        description = request.form.get('description')
        
        if not all([name, contact, category, description]):
            flash('All fields are required', 'danger')
            return redirect(url_for('grievance_form'))
        
        grievances = load_data(GRIEVANCES_FILE)
        new_grievance = {
            "id": str(uuid.uuid4()),
            "name": name,
            "contact": contact,
            "category": category,
            "description": description,
            "status": "Pending",
            "date_submitted": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        grievances.append(new_grievance)
        save_data(grievances, GRIEVANCES_FILE)
        
        flash('Grievance submitted successfully!', 'success')
        return redirect(url_for('home'))

@app.route('/grievances')
def grievances():
    grievances = load_data(GRIEVANCES_FILE)
    return render_template('grievances.html', grievances=grievances)

@app.route('/schemes')
def schemes():
    api_key = "AIzaSyDTSfWZzXV8Gctr-nykMTAsw3Qodf94wwE"
    
    # Base schemes data
    schemes_data = [
        {
            "name": "Pradhan Mantri Awas Yojana (PMAY)",
            "description": "Housing scheme that aims to provide affordable housing to the urban and rural poor.",
            "eligibility": "Households with an annual income up to ₹3 lakh",
            "benefits": "Financial assistance up to ₹2.5 lakh for house construction",
            "link": "https://pmaymis.gov.in/"
        },
        {
            "name": "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
            "description": "Employment scheme that provides at least 100 days of wage employment to every rural household.",
            "eligibility": "Adult members of rural households willing to do unskilled manual work",
            "benefits": "Legal right to work, unemployment allowance, and wages as per state norms",
            "link": "https://nrega.nic.in/"
        },
        {
            "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
            "description": "Income support scheme for farmers that provides financial benefit to all landholding farmers.",
            "eligibility": "All landholding farmers with cultivable land",
            "benefits": "₹6,000 per year in three equal installments",
            "link": "https://pmkisan.gov.in/"
        },
        {
            "name": "National Rural Livelihood Mission (NRLM)",
            "description": "Poverty alleviation program focused on promoting self-employment and organization of rural poor.",
            "eligibility": "Rural women from poor households",
            "benefits": "Financial assistance, training, and support for starting micro-enterprises",
            "link": "https://aajeevika.gov.in/"
        },
        {
            "name": "Swachh Bharat Mission (Grameen)",
            "description": "Campaign to eliminate open defecation and improve solid waste management in rural areas.",
            "eligibility": "All rural households without toilets",
            "benefits": "Financial assistance for toilet construction and waste management infrastructure",
            "link": "https://swachhbharatmission.gov.in/sbmcms/index.htm"
        }
    ]
    
    return render_template('schemes.html', schemes=schemes_data, api_key=api_key)

@app.route('/search-schemes', methods=['GET'])
def search_schemes():
    query = request.args.get('query', '')
    api_key = "AIzaSyDTSfWZzXV8Gctr-nykMTAsw3Qodf94wwE"
    
    if not query:
        return jsonify({"error": "No search query provided"}), 400
    
    # Construct search query to focus on government schemes
    search_query = f"{query} government scheme rural development india official"
    
    try:
        # Use Google Search API directly
        url = f"https://www.googleapis.com/customsearch/v1?key={api_key}&q={search_query}"
        response = requests.get(url)
        search_results = response.json()
        
        # Process and return results
        if 'items' in search_results:
            results = []
            for item in search_results['items'][:10]:  # Get top 10 results
                results.append({
                    "title": item.get('title', 'Government Scheme'),
                    "description": item.get('snippet', 'Details about government scheme'),
                    "link": item.get('link', '#'),
                    "source": item.get('displayLink', '')
                })
            return jsonify({"results": results})
        else:
            return jsonify({"results": [], "message": "No results found"})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)