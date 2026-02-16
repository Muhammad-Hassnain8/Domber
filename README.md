# Domber
# 🚀 Domber - The Social Media Dive Bomber

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blueviolet?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-teal?style=for-the-badge" alt="Platform">
  <img src="https://img.shields.io/badge/Built%20With-Electron-47848F?style=for-the-badge&logo=electron" alt="Electron">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ea78b861-cfe7-4794-88ed-1066723877a1" alt="Domber Screenshot" width="800">
</p>

## 📋 Overview

**Domber** (Dive Bomber) is a powerful Electron-based desktop application designed for social media profiling and data gathering. Like a precision dive bomber, it swiftly targets and retrieves profile information across multiple platforms with remarkable accuracy and speed.

Whether you're a digital investigator, social media manager, or just curious about online presence, Domber provides a sleek, intuitive interface to discover and manage social media profiles across the web.

## ✨ Key Features

### 🎯 **Multi-Platform Search**
- Search across 20+ social media platforms simultaneously
- Customizable platform selection via CSV configuration
- Intelligent profile detection with confidence scoring

### 🎨 **Beautiful Profile Cards**
- Platform-specific icons and color coding
- Avatar images with fallback generation
- Bio preview and profile statistics
- Confidence percentage indicators

### 💾 **Profile Management**
- Save interesting profiles for later reference
- Organize and categorize discovered profiles
- Quick access to saved profiles
- Delete individual or clear all saved data

### 🔍 **Advanced Search Capabilities**
- Real-time search across selected platforms
- Intelligent URL pattern matching
- Status code validation for profile existence
- Confidence scoring based on URL structure

### 🎭 **Platform Icons & Visuals**
- Platform-specific emoji icons for quick recognition
- Color-coded confidence badges
- Hover effects and smooth animations
- Responsive grid layout

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Electron** | Cross-platform desktop framework |
| **Node.js** | Backend runtime |
| **Axios** | HTTP requests for profile checking |
| **Electron Store** | Local data persistence |
| **PapaParse** | CSV parsing for platform configuration |

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/domber.git
cd domber
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**
```bash
npm start
```

4. **Build for production** (optional)
```bash
npm run build
```

## 🎮 How to Use

### 🔎 **Searching for Profiles**

1. **Enter a username** in the search bar (e.g., "johndoe")
2. **Select platforms** you want to search (default all selected)
3. **Click Search** or press Enter
4. **Watch as Domber** dives through each platform
5. **Review results** with confidence scores

### 💾 **Managing Profiles**

- **Save** interesting profiles for later reference
- **View details** in an elegant modal window
- **Visit profiles** directly in your browser
- **Delete** saved profiles when no longer needed

### ⚙️ **Customizing Platforms**

Edit `src/data/sites.csv` to add or modify platforms:

```csv
Platform,URL
GitHub,https://github.com/$U$
Twitter,https://twitter.com/$U$
LinkedIn,https://linkedin.com/in/$U$
```

The `$U$` placeholder is automatically replaced with the searched username.

## 🎨 UI/UX Features

### **Profile Card Elements**
- 🖼️ **Avatar** - Platform or generated avatar
- 🏷️ **Platform Icon** - Visual platform identifier
- 📝 **Username** - The searched username
- 📊 **Confidence Score** - Color-coded match percentage
- 🔗 **Profile Link** - Direct link to the profile
- 📖 **Bio Preview** - Extracted bio when available
- 💾 **Save Button** - Store for later reference
- 🔍 **Details Button** - View comprehensive info

### **Interactive Elements**
- Hover animations on cards
- Smooth modal transitions
- Real-time search feedback
- Loading animations during search
- Toast notifications for actions

## 📁 Project Structure

```
domber/
├── main.js                 # Electron main process
├── preload.js              # Preload script for IPC
├── package.json            # Dependencies and scripts
├── src/
│   ├── index.html          # Main HTML
│   ├── renderer.js         # Renderer process logic
│   ├── styles.css          # Styles (optional)
│   └── data/
│       └── sites.csv       # Platform configuration
```

## 🚀 Performance

- **Lightweight** - Minimal resource usage
- **Fast** - Concurrent platform checking
- **Efficient** - Smart caching and data management
- **Scalable** - Handles 20+ platforms effortlessly

## 🎯 Use Cases

- **Digital Investigations** - Discover someone's online presence
- **Brand Monitoring** - Track brand username usage
- **Username Availability** - Check username across platforms
- **Social Media Management** - Profile discovery and monitoring
- **Academic Research** - Study online identity patterns
- **Personal Branding** - Audit your own online presence

## 🖥️ Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/ea78b861-cfe7-4794-88ed-1066723877a1" alt="Main Interface" width="600">
  <br>
  <em>Main Search Interface</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ea78b861-cfe7-4794-88ed-1066723877a1" alt="Profile Details" width="600">
  <br>
  <em>Profile Detail Modal</em>
</p>

## 🔮 Future Enhancements

- [ ] **Deep Profile Analysis** - Extract more profile data
- [ ] **Export Results** - CSV/JSON export functionality
- [ ] **Batch Search** - Multiple usernames at once
- [ ] **Advanced Filtering** - Filter by confidence/platform
- [ ] **Profile Comparison** - Compare multiple profiles
- [ ] **Dark Mode** - Eye-friendly dark theme
- [ ] **API Integration** - Platform API support for richer data

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## ⚠️ Disclaimer

Domber is designed for legitimate purposes such as:
- Personal profile discovery
- Brand monitoring
- Academic research
- Digital investigations (with proper authorization)

Always respect privacy and terms of service of the platforms you search. Use responsibly.

## 🙏 Acknowledgments

- **Electron Team** - For the amazing framework
- **UI Avatar API** - For fallback avatar generation
- **All Platform Icons** - Made with love

## 📊 Stats

<p align="center">
  <img src="https://img.shields.io/badge/Platforms-20%2B-success?style=flat-square" alt="Platforms">
  <img src="https://img.shields.io/badge/Search%20Time-~3s-blue?style=flat-square" alt="Search Time">
  <img src="https://img.shields.io/badge/Storage-Electron%20Store-orange?style=flat-square" alt="Storage">
</p>

---

<p align="center">
  Made with ❤️ by the Domber Team
  <br>
  <sub>Dive deep into social discovery</sub>
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-how-to-use">Usage</a> •
  <a href="#-use-cases">Use Cases</a>
</p>

