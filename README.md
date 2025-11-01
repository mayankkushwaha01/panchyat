# Panchayat Dashboard - Digital Governance Portal

A modern, responsive web application for Gram Panchayat e-governance, providing transparent access to government schemes, project tracking, budget information, and citizen services.

## 🌟 Features

- **Dashboard Overview** - Real-time statistics and key metrics
- **Government Schemes** - Browse and search available schemes
- **Project Tracking** - Monitor ongoing development projects
- **Budget Transparency** - Detailed budget allocation and spending
- **Grievance System** - File and track complaints
- **Land Records** - Digital land record management
- **Responsive Design** - Works on all devices

## 🚀 Live Demo

Visit the live application: [Panchayat Dashboard](https://yourusername.github.io/panchayat-dashboard-starter/)

## 📱 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Government Schemes
![Schemes](screenshots/schemes.png)

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.3
- **Icons**: Font Awesome 6.5.2
- **Charts**: Chart.js
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
panchayat-dashboard-starter/
├── templates/
│   ├── index.html          # Welcome page
│   ├── dashboard.html      # Main dashboard
│   ├── schemes.html        # Government schemes
│   ├── projects.html       # Project tracking
│   ├── budget.html         # Budget details
│   ├── grievance_form.html # Grievance form
│   └── land_records.html   # Land records
├── static/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── data/              # JSON data files
├── data/                  # Additional data files
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/panchayat-dashboard-starter.git
   cd panchayat-dashboard-starter
   ```

2. **Open in browser**
   - Open `templates/index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. **Access the application**
   - Navigate to `http://localhost:8000/templates/`

## 🌐 Deployment

### GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Select source: Deploy from a branch
   - Choose branch: main
   - Folder: / (root)
   - Save

3. **Access your site**
   - Your site will be available at: `https://yourusername.github.io/panchayat-dashboard-starter/templates/`

### Other Deployment Options

- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Use Firebase CLI

## 📊 Data Management

The application uses JSON files for data storage:

- `data/budget.json` - Budget information
- `data/projects.json` - Project details
- `static/data/schemes.json` - Government schemes
- `data/grievances.json` - Grievance records
- `data/land_records.json` - Land ownership data

## 🎨 Customization

### Colors and Themes
- Edit CSS variables in `static/css/style.css`
- Modify gradient backgrounds in individual page styles

### Content
- Update JSON data files with your panchayat's information
- Modify HTML content in template files
- Add your panchayat's logo and branding

### Features
- Add new pages by creating HTML files in `templates/`
- Extend functionality with additional JavaScript
- Integrate with backend APIs for dynamic data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bootstrap team for the excellent CSS framework
- Font Awesome for the beautiful icons
- Chart.js for interactive charts
- Government of India for e-governance initiatives

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@yourpanchayat.gov.in
- Phone: +91-XXXX-XXXXXX

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added responsive design and improved UI
- **v1.2.0** - Enhanced data visualization and charts

---

Made with ❤️ for Digital India Initiative