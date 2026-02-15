// State management
let sites = [];
let currentProfiles = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Domber initialized');
    initializeNavigation();
    await loadSites();
    initializeSearch();
    await loadSavedProfiles();
});

// Navigation
function initializeNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewName = btn.getAttribute('data-view');
            
            // Update active button
            navBtns.forEach(b => {
                b.style.background = 'rgba(255,255,255,0.2)';
                b.style.color = 'white';
            });
            btn.style.background = 'white';
            btn.style.color = '#667eea';
            
            // Show selected view
            views.forEach(view => {
                view.classList.remove('active');
            });
            document.getElementById(`${viewName}-view`).classList.add('active');
        });
    });
}

// Load sites from CSV
async function loadSites() {
    try {
        sites = await window.electronAPI.loadSites();
        displaySites();
    } catch (error) {
        console.error('Error loading sites:', error);
        showNotification('Error loading platforms', 'error');
    }
}

function displaySites() {
    const grid = document.getElementById('sites-grid');
    if (!grid) return;
    
    if (!sites || sites.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; color:#666;">No platforms available</div>';
        return;
    }
    
    grid.innerHTML = sites.map(site => `
        <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: white; border-radius: 5px; cursor: pointer; transition: all 0.3s ease;" 
               onmouseover="this.style.background='#e1e4e8'" 
               onmouseout="this.style.background='white'">
            <input type="checkbox" value="${site.Platform}" data-url="${site.URL}" checked style="width: 16px; height: 16px; cursor: pointer;">
            <span style="display: flex; align-items: center; gap: 0.3rem;">
                <span style="font-size: 1.1rem;">${getPlatformIcon(site.Platform)}</span>
                ${site.Platform}
            </span>
        </label>
    `).join('');
}

// Helper function to get platform icons
function getPlatformIcon(platform) {
    const icons = {
        'GitHub': '🐙',
        'Twitter': '🐦',
        'LinkedIn': '💼',
        'Instagram': '📷',
        'Facebook': '👤',
        'TikTok': '🎵',
        'YouTube': '▶️',
        'Reddit': '👽',
        'Pinterest': '📌',
        'Twitch': '🎮',
        'Medium': '✍️',
        'Dev.to': '💻',
        'Behance': '🎨',
        'Dribbble': '🏀',
        'Flickr': '📸',
        'Tumblr': '📱'
    };
    return icons[platform] || '🌐';
}

// Search functionality
function initializeSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const selectAllBtn = document.getElementById('select-all');
    const deselectAllBtn = document.getElementById('deselect-all');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Add select/deselect buttons if they exist
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
            document.querySelectorAll('#sites-grid input[type="checkbox"]').forEach(cb => cb.checked = true);
        });
    }
    
    if (deselectAllBtn) {
        deselectAllBtn.addEventListener('click', () => {
            document.querySelectorAll('#sites-grid input[type="checkbox"]').forEach(cb => cb.checked = false);
        });
    }
}

async function performSearch() {
    const searchInput = document.getElementById('search-input');
    const username = searchInput ? searchInput.value.trim() : '';
    
    if (!username) {
        showNotification('Please enter a username', 'error');
        return;
    }

    // Get selected sites
    const checkboxes = document.querySelectorAll('#sites-grid input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        showNotification('Please select at least one platform', 'error');
        return;
    }

    const selectedSites = Array.from(checkboxes).map(cb => ({
        Platform: cb.value,
        URL: cb.getAttribute('data-url')
    }));

    showLoading(true);

    try {
        console.log('Searching for:', username);
        const results = await window.electronAPI.searchProfiles({
            username: username,
            sites: selectedSites
        });

        console.log('Search results:', results);
        currentProfiles = results;
        displaySearchResults(results);
        
        if (results.length > 0) {
            showNotification(`Found ${results.length} profiles`, 'success');
        } else {
            showNotification('No profiles found', 'info');
        }
    } catch (error) {
        console.error('Search error:', error);
        showNotification('Error performing search', 'error');
    } finally {
        showLoading(false);
    }
}

function displaySearchResults(profiles) {
    const container = document.getElementById('search-results');
    if (!container) return;
    
    if (!profiles || profiles.length === 0) {
        container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:3rem; color:#666; background: white; border-radius: 10px;">No profiles found. Try a different username.</div>';
        return;
    }

    container.innerHTML = profiles.map(profile => `
        <div style="background: white; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: all 0.3s ease;" 
             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 5px 20px rgba(0,0,0,0.15)'" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 10px rgba(0,0,0,0.1)'">
            
            <div style="display: flex; gap: 1.5rem; margin-bottom: 1rem;">
                <div style="position: relative;">
                    <img src="${profile.avatar || 'https://ui-avatars.com/api/?name=' + profile.username + '&background=667eea&color=fff&size=128'}" 
                         alt="${profile.username}" 
                         style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid #667eea;"
                         onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${profile.username}') + '&background=667eea&color=fff&size=128'">
                </div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                        <span style="font-size: 1.5rem;">${getPlatformIcon(profile.platform)}</span>
                        <h3 style="margin: 0; color: #333;">${profile.platform}</h3>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <span style="color: #666;">@${profile.username}</span>
                        <span style="background: ${getConfidenceColor(profile.confidence)}; color: white; padding: 0.2rem 0.8rem; border-radius: 12px; font-size: 0.8rem; font-weight: bold;">
                            ${Math.round(profile.confidence * 100)}% match
                        </span>
                    </div>
                </div>
            </div>
            
            <div style="padding: 1rem 0; border-top: 1px solid #e1e4e8; border-bottom: 1px solid #e1e4e8; margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <span style="font-size: 0.9rem; color: #666;">📍</span>
                    <a href="${profile.url}" target="_blank" style="color: #667eea; text-decoration: none; word-break: break-all;">${profile.url}</a>
                </div>
                ${profile.bio ? `
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                        <span style="font-size: 0.9rem; color: #666;">📝</span>
                        <p style="margin: 0; color: #666; font-size: 0.9rem;">${profile.bio}</p>
                    </div>
                ` : ''}
            </div>
            
            <div style="display: flex; gap: 0.8rem;">
                <button onclick="saveProfile('${profile.id}')" 
                        style="flex: 1; padding: 0.8rem; background: #ffc107; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 0.3rem; transition: all 0.3s ease;"
                        onmouseover="this.style.background='#e0a800'" 
                        onmouseout="this.style.background='#ffc107'">
                    💾 Save
                </button>
                <button onclick="viewProfile('${profile.id}')" 
                        style="flex: 1; padding: 0.8rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 0.3rem; transition: all 0.3s ease;"
                        onmouseover="this.style.background='#5a67d8'" 
                        onmouseout="this.style.background='#667eea'">
                    🔍 Details
                </button>
            </div>
        </div>
    `).join('');
}

// Helper function for confidence colors
function getConfidenceColor(confidence) {
    if (confidence >= 0.9) return '#28a745';
    if (confidence >= 0.7) return '#ffc107';
    return '#dc3545';
}

// Profile functions
async function saveProfile(profileId) {
    const profile = currentProfiles.find(p => p.id === profileId);
    if (!profile) return;

    try {
        const result = await window.electronAPI.saveProfile(profile);
        if (result.success) {
            showNotification('Profile saved successfully', 'success');
            await loadSavedProfiles();
        } else {
            showNotification(result.message || 'Error saving profile', 'error');
        }
    } catch (error) {
        console.error('Error saving profile:', error);
        showNotification('Error saving profile', 'error');
    }
}

function viewProfile(profileId) {
    const profile = currentProfiles.find(p => p.id === profileId);
    if (!profile) return;

    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = `
        <h2 style="margin-top: 0; color: #333; display: flex; align-items: center; gap: 0.5rem;">
            <span>${getPlatformIcon(profile.platform)}</span>
            ${profile.platform} Profile
        </h2>
        
        <div style="text-align: center; margin: 1.5rem 0;">
            <img src="${profile.avatar || 'https://ui-avatars.com/api/?name=' + profile.username + '&background=667eea&color=fff&size=200'}" 
                 alt="${profile.username}" 
                 style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid #667eea; object-fit: cover;"
                 onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${profile.username}') + '&background=667eea&color=fff&size=200'">
        </div>
        
        <div style="background: #f5f7fa; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
            <div style="display: grid; gap: 1rem;">
                <div style="display: flex; align-items: center;">
                    <span style="min-width: 100px; color: #666;">Username:</span>
                    <span style="font-weight: bold;">@${profile.username}</span>
                </div>
                <div style="display: flex; align-items: center;">
                    <span style="min-width: 100px; color: #666;">Platform:</span>
                    <span style="display: flex; align-items: center; gap: 0.3rem;">
                        ${getPlatformIcon(profile.platform)} ${profile.platform}
                    </span>
                </div>
                <div style="display: flex; align-items: center;">
                    <span style="min-width: 100px; color: #666;">Confidence:</span>
                    <span style="background: ${getConfidenceColor(profile.confidence)}; color: white; padding: 0.2rem 1rem; border-radius: 12px; font-size: 0.9rem;">
                        ${Math.round(profile.confidence * 100)}%
                    </span>
                </div>
                <div style="display: flex; align-items: flex-start;">
                    <span style="min-width: 100px; color: #666;">URL:</span>
                    <a href="${profile.url}" target="_blank" style="color: #667eea; text-decoration: none; word-break: break-all;">${profile.url}</a>
                </div>
                ${profile.bio ? `
                    <div style="display: flex; align-items: flex-start;">
                        <span style="min-width: 100px; color: #666;">Bio:</span>
                        <span style="color: #333;">${profile.bio}</span>
                    </div>
                ` : ''}
                <div style="display: flex; align-items: center;">
                    <span style="min-width: 100px; color: #666;">Status:</span>
                    <span style="color: #28a745; display: flex; align-items: center; gap: 0.3rem;">
                        <span>✓</span> Profile Found
                    </span>
                </div>
            </div>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
            <button onclick="saveProfile('${profile.id}'); document.getElementById('modal').style.display='none'" 
                    style="flex:1; padding:1rem; background:#ffc107; border:none; border-radius:5px; cursor:pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 0.3rem;">
                💾 Save Profile
            </button>
            <button onclick="window.open('${profile.url}', '_blank')" 
                    style="flex:1; padding:1rem; background:#667eea; color:white; border:none; border-radius:5px; cursor:pointer; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 0.3rem;">
                🌐 Visit Profile
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Saved profiles functions
async function loadSavedProfiles() {
    try {
        const saved = await window.electronAPI.loadSavedProfiles();
        displaySavedProfiles(saved);
        updateHeaderStats(saved.length);
    } catch (error) {
        console.error('Error loading saved profiles:', error);
    }
}

function updateHeaderStats(count) {
    const statsEl = document.getElementById('header-stats');
    if (statsEl) {
        statsEl.innerHTML = `📊 ${count} saved`;
    }
}

function displaySavedProfiles(profiles) {
    const container = document.getElementById('saved-profiles');
    if (!container) return;
    
    if (!profiles || profiles.length === 0) {
        container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:3rem; color:#666; background: white; border-radius: 10px;">No saved profiles yet. Search and save profiles to see them here.</div>';
        return;
    }

    container.innerHTML = profiles.map(profile => `
        <div style="background: white; border-radius: 10px; padding: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: all 0.3s ease;"
             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 5px 20px rgba(0,0,0,0.15)'" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 10px rgba(0,0,0,0.1)'">
            
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <img src="${profile.avatar || 'https://ui-avatars.com/api/?name=' + profile.username + '&background=667eea&color=fff&size=128'}" 
                     alt="${profile.username}" 
                     style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #667eea;"
                     onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${profile.username}') + '&background=667eea&color=fff&size=128'">
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 0.3rem;">
                        <span>${getPlatformIcon(profile.platform)}</span>
                        <h4 style="margin: 0;">${profile.platform}</h4>
                    </div>
                    <span style="color: #666;">@${profile.username}</span>
                    <div style="margin-top: 0.3rem;">
                        <span style="background: ${getConfidenceColor(profile.confidence)}; color: white; padding: 0.1rem 0.5rem; border-radius: 10px; font-size: 0.7rem;">
                            ${Math.round(profile.confidence * 100)}% match
                        </span>
                    </div>
                    <small style="display: block; color: #999; margin-top: 0.3rem;">
                        Saved: ${new Date(profile.savedAt).toLocaleDateString()}
                    </small>
                </div>
            </div>
            
            <div style="display: flex; gap: 0.5rem;">
                <button onclick="viewSavedProfile('${profile.id}')" 
                        style="flex: 2; padding: 0.6rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    View
                </button>
                <button onclick="deleteSavedProfile('${profile.id}')" 
                        style="flex: 1; padding: 0.6rem; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Delete
                </button>
            </div>
        </div>
    `).join('');

    // Add clear all functionality
    const clearBtn = document.getElementById('clear-saved');
    if (clearBtn) {
        clearBtn.onclick = clearAllSaved;
    }
}

function viewSavedProfile(profileId) {
    // Load from saved profiles instead of currentProfiles
    window.electronAPI.loadSavedProfiles().then(saved => {
        const profile = saved.find(p => p.id === profileId);
        if (profile) {
            currentProfiles = [profile]; // Temporarily set for view
            viewProfile(profileId);
        }
    });
}

async function deleteSavedProfile(profileId) {
    try {
        const result = await window.electronAPI.deleteSavedProfile(profileId);
        if (result.success) {
            showNotification('Profile deleted', 'success');
            await loadSavedProfiles();
        }
    } catch (error) {
        console.error('Error deleting profile:', error);
        showNotification('Error deleting profile', 'error');
    }
}

async function clearAllSaved() {
    if (confirm('Are you sure you want to clear all saved profiles?')) {
        try {
            const result = await window.electronAPI.clearSavedProfiles();
            if (result.success) {
                showNotification('All profiles cleared', 'success');
                await loadSavedProfiles();
            }
        } catch (error) {
            console.error('Error clearing profiles:', error);
            showNotification('Error clearing profiles', 'error');
        }
    }
}

// Utility functions
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.style.background = type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#17a2b8';
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function showLoading(show) {
    let loader = document.getElementById('global-loader');
    
    if (show) {
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'global-loader';
            loader.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.95); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:3000;';
            loader.innerHTML = `
                <div style="width:60px; height:60px; border:5px solid #e1e4e8; border-top-color:#667eea; border-radius:50%; animation:spin 1s linear infinite;"></div>
                <p style="margin-top:1.5rem; color:#667eea; font-size:1.2rem; font-weight:bold;">Searching profiles...</p>
                <p style="color:#666; font-size:0.9rem;">Checking multiple platforms</p>
            `;
            document.body.appendChild(loader);
            
            // Add spin animation
            const style = document.createElement('style');
            style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
            document.head.appendChild(style);
        }
    } else if (loader) {
        loader.remove();
    }
}

// Modal close
document.getElementById('modal-close')?.addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Export functions for onclick handlers
window.saveProfile = saveProfile;
window.viewProfile = viewProfile;
window.viewSavedProfile = viewSavedProfile;
window.deleteSavedProfile = deleteSavedProfile;
