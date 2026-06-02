// ============================================================================
// 1. Production Global Configurations & Initial State
// ============================================================================
const ADMIN_USERNAME = "leonitiseini05";
const ADMIN_PASSWORD = "L8e3o4n9i9t7";
const ANALYTICS_ID = "G-PY1364WR78";

// Initializing base data catalog for layout execution context
const MOCK_MOVIES = [];
const categories = ['Filma', 'Seriale', 'Se Shpejti'];
for (let i = 1; i <= 25; i++) {
  MOCK_MOVIES.push({
    title: "Shembull Mediatik " + i,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500",
    category: categories[i % 3],
    year: 2024 + (i % 3),
    description: "Ky është një përshkrim automatik për projektin mediatik të platformës shembull numër " + i,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: Math.floor(Math.random() * 10000)
  });
}

// ============================================================================
// 2. Main Cloudflare Worker HTTP Request Listener & Catch-All Routing
// ============================================================================
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle AJAX API routes
    if (url.pathname === "/api/config") {
      return new Response(JSON.stringify({ analytics: ANALYTICS_ID }), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // Catch-all fallbacks: Serve the web app UI for all structural paths
    return new Response(generateClientHTML(), {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "X-XSS-Protection": "1; mode=block",
        "X-Content-Type-Options": "nosniff"
      }
    });
  }
};

// ============================================================================
// 3. Monolithic Raw HTML/CSS/JS Payload Generation Template
// ============================================================================
function generateClientHTML() {
  return `<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ALB-FILMA — Shqip Filma Portal</title>
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <style>
        :root { 
            --accent-col: #e50914; 
            --bg-dark: #141414; 
            --card-bg: #1f1f1f; 
            --admin-border: #ffc107;
        }
        body { 
            background-color: var(--bg-dark); 
            color: #fff; 
            margin: 0; 
            font-family: 'Helvetica Neue', Arial, sans-serif; 
            overflow-x: hidden;
        }
        
        /* Navigation Styles */
        #alb-header-container { 
            background: #000; 
            padding: 15px 40px; 
            border-bottom: 2px solid var(--accent-col); 
            position: sticky; 
            top: 0; 
            z-index: 999; 
        }
        .header-inner { 
            display: flex; 
            align-items: center; 
            justify-content: space-between; 
            flex-wrap: wrap; 
            gap: 15px; 
        }
        .brand-logo { 
            font-size: 26px; 
            font-weight: 900; 
            color: var(--accent-col); 
            cursor: pointer; 
            letter-spacing: 1px; 
        }
        .nav-categories { display: flex; gap: 20px; }
        .nav-item { 
            font-size: 15px; 
            font-weight: 600; 
            color: #e5e5e5; 
            cursor: pointer; 
            transition: color 0.2s; 
            text-transform: uppercase; 
        }
        .nav-item:hover, .nav-item.active { color: var(--accent-col); }
        .search-wrapper input { 
            padding: 8px 15px; 
            width: 250px; 
            background: #222; 
            border: 1px solid #444; 
            border-radius: 20px; 
            color: #fff; 
            outline: none; 
        }
        .search-wrapper input:focus { border-color: var(--accent-col); }
        .auth-input-group, .user-profile-status { display: flex; gap: 8px; align-items: center; font-size: 13px; }
        .auth-input-group input { 
            padding: 6px 10px; 
            background: #333; 
            border: 1px solid #555; 
            color: white; 
            border-radius: 4px; 
            max-width: 110px; 
        }
        .nav-auth-btn { 
            background: var(--accent-col); 
            color: white; 
            border: none; 
            padding: 6px 14px; 
            font-weight: bold; 
            border-radius: 4px; 
            cursor: pointer; 
        }
        .nav-auth-btn.secondary-btn { background: #333; color: #ccc; border: 1px solid #555; }
        .nav-auth-btn.out-btn { background: #444; }
        .adm-tag { 
            background: gold; 
            color: #000; 
            font-size: 10px; 
            padding: 2px 5px; 
            font-weight: 900; 
            border-radius: 3px; 
            margin-left: 5px; 
        }
        
        /* Top 10 Layout */
        #alb-favorites-container { padding: 20px 40px; background: #0b0b0b; border-bottom: 1px solid #222; }
        .section-title h3 { 
            margin: 0 0 15px 0; 
            font-size: 20px; 
            border-left: 4px solid var(--accent-col); 
            padding-left: 10px; 
        }
        .favorites-slider { display: flex; gap: 15px; overflow-x: auto; padding-bottom: 10px; }
        .favorites-slider::-webkit-scrollbar { height: 6px; }
        .favorites-slider::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .fav-card { flex: 0 0 calc(10% - 14px); min-width: 130px; background: var(--card-bg); border-radius: 4px; overflow: hidden; position: relative; }
        .fav-poster { height: 185px; background-size: cover; background-position: center; position: relative; background-color: #333; }
        .rank-badge { 
            position: absolute; 
            bottom: 5px; 
            left: 5px; 
            background: rgba(229, 9, 20, 0.95); 
            font-weight: 900; 
            padding: 2px 7px; 
            border-radius: 3px; 
        }
        .fav-meta h4 { margin: 6px; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #ccc; text-align: center; }
        
        /* Admin Interactive Control Panel UI */
        .admin-creation-panel { 
            background: #181818; 
            padding: 25px; 
            border-radius: 6px; 
            border: 2px dashed var(--admin-border); 
            margin-bottom: 30px; 
        }
        .admin-creation-panel h3 { margin-top: 0; color: #fff; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
        .form-row-fields { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
        .form-row-fields input, .form-row-fields select, .form-row-fields textarea { 
            flex: 1; min-width: 180px; background: #2b2b2b; border: 1px solid #444; color: #fff; padding: 10px; border-radius: 4px; outline: none; 
        }
        .form-row-fields input:focus, .form-row-fields select:focus, .form-row-fields textarea:focus { border-color: var(--accent-col); }
        .admin-submit-btn { background: #28a745; color: white; border: none; padding: 11px 30px; font-weight: bold; border-radius: 4px; cursor: pointer; }
        .admin-submit-btn:hover { background: #218838; }
        
        /* Content Display Context Matrix Grid */
        #alb-main-container { padding: 30px 40px; min-height: 400px; }
        .alb-matrix-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .matrix-card { 
            background: var(--card-bg); 
            border-radius: 6px; 
            overflow: hidden; 
            border: 1px solid #2a2a2a; 
            transition: transform 0.2s, box-shadow 0.2s; 
            display: flex; 
            flex-direction: column;
            position: relative;
        }
        .matrix-card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.5); }
        .matrix-poster { height: 270px; background-size: cover; background-position: center; position: relative; background-color: #333; }
        .matrix-tag { position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); font-size: 11px; padding: 2px 6px; border-radius: 3px; font-weight: bold; }
        .action-del-btn { 
            position: absolute; top: 8px; right: 8px; background: var(--accent-col); border: none; color: white; 
            width: 26px; height: 26px; border-radius: 50%; cursor: pointer; font-weight: bold; font-size: 14px; 
        }
        .matrix-info { padding: 12px; display: flex; flex-direction: column; flex-grow: 1; }
        .matrix-info h4 { margin: 0 0 4px 0; font-size: 15px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
        .cat-label { font-size: 11px; color: var(--accent-col); text-transform: uppercase; font-weight: bold; margin-bottom: 8px; display: block; }
        .matrix-info p { font-size: 12px; color: #999; margin: 0 0 12px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 32px; line-height: 16px; flex-grow: 1; }
        .matrix-play-btn { 
            display: block; text-align: center; background: #333; color: #fff; padding: 8px 0; border-radius: 4px; font-size: 12px; font-weight: bold; 
        }
        .matrix-play-btn:hover { background: var(--accent-col); }
        
        #alb-footer-container { background: #000; border-top: 1px solid #222; padding: 25px 40px; font-size: 13px; color: #666; }
        .footer-inner { display: flex; justify-content: space-between; align-items: center; }
        
        /* Media Query Adaptations */
        @media(max-width: 1200px) { .alb-matrix-grid { grid-template-columns: repeat(4, 1fr); } .fav-card { flex: 0 0 calc(12.5% - 14px); } }
        @media(max-width: 900px) { .alb-matrix-grid { grid-template-columns: repeat(3, 1fr); } .fav-card { flex: 0 0 calc(20% - 14px); } }
        @media(max-width: 650px) { 
            .alb-matrix-grid { grid-template-columns: repeat(2, 1fr); } 
            .fav-card { flex: 0 0 calc(33.33% - 14px); }
            .header-inner { flex-direction: column; text-align: center; }
        }
    </style>
    
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${ANALYTICS_ID}');
    </script>
</head>
<body>

    <div id="alb-header-container"></div>
    <div id="alb-favorites-container"></div>
    <div id="alb-main-container"></div>
    <div id="alb-footer-container"></div>

    <script>
        const MovieApp = {
            adminUsername: "${ADMIN_USERNAME}",
            adminPassword: "${ADMIN_PASSWORD}",
            currentUser: null,
            movies: ${JSON.stringify(MOCK_MOVIES)},
            currentCategory: 'All',
            searchQuery: '',

            init: function() {
                this.loadStorage();
                this.renderAllComponents();
                this.bindEvents();
            },

            loadStorage: function() {
                const storedMovies = localStorage.getItem('app_movies');
                if (storedMovies) this.movies = JSON.parse(storedMovies);
                const session = localStorage.getItem('app_session');
                if (session) this.currentUser = JSON.parse(session);
            },

            saveMovies: function() {
                localStorage.setItem('app_movies', JSON.stringify(this.movies));
                this.renderAllComponents();
            },

            loginUser: function(username, password) {
                if (username === this.adminUsername && password === this.adminPassword) {
                    this.currentUser = { username: username, isAdmin: true };
                    localStorage.setItem('app_session', JSON.stringify(this.currentUser));
                    this.renderAllComponents();
                    return true;
                }
                alert("Kredencialet nuk përputhen.");
                return false;
            },

            logout: function() {
                this.currentUser = null;
                localStorage.removeItem('app_session');
                this.renderAllComponents();
            },

            renderAllComponents: function() {
                this.renderTopBar();
                this.renderFavoritesSection();
                this.renderMainContent();
                this.renderFooterBar();
            },

            renderTopBar: function() {
                const header = document.getElementById('alb-header-container');
                let authSection = this.currentUser ? 
                    \`<div class="user-profile-status">
                        <span>Mirësevini, <strong>\${this.currentUser.username}</strong><span class="adm-tag">Admin</span></span>
                        <button id="btn-logout" class="nav-auth-btn out-btn">Log Out</button>
                     </div>\` : 
                    \`<div class="auth-input-group">
                        <input type="text" id="auth-username" placeholder="Admin Përdoruesi" />
                        <input type="password" id="auth-password" placeholder="Fjalëkalimi" />
                        <button id="btn-login" class="nav-auth-btn">Log In</button>
                     </div>\`;

                header.innerHTML = \`
                    <div class="header-inner">
                        <div class="brand-logo" data-cat="All">ALB-FILMA</div>
                        <nav class="nav-categories">
                            <span class="nav-item \${this.currentCategory === 'Filma'?'active':''}" data-cat="Filma">Filma</span>
                            <span class="nav-item \${this.currentCategory === 'Seriale'?'active':''}" data-cat="Seriale">Seriale</span>
                            <span class="nav-item \${this.currentCategory === 'Se Shpejti'?'active':''}" data-cat="Se Shpejti">Se Shpejti</span>
                        </nav>
                        <div class="search-wrapper">
                            <input type="text" id="global-search" placeholder="Kërko filma..." value="\${this.searchQuery}" />
                        </div>
                        <div class="auth-wrapper">\${authSection}</div>
                    </div>\`;
            },

            renderFavoritesSection: function() {
                const container = document.getElementById('alb-favorites-container');
                const sorted = [...this.movies].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 10);
                
                let html = '<div class="section-title"><h3>🔥 Më të Shikuarit (Top 10)</h3></div><div class="favorites-slider">';
                sorted.forEach((mv, idx) => {
                    html += \`
                        <div class="fav-card">
                            <div class="fav-poster" style="background-image: url('\${mv.image}');">
                                <span class="rank-badge">#\${idx + 1}</span>
                            </div>
                            <div class="fav-meta"><h4>\${mv.title}</h4></div>
                        </div>\`;
                });
                container.innerHTML = html + '</div>';
            },

            renderMainContent: function() {
                const container = document.getElementById('alb-main-container');
                let html = '';

                if (this.currentUser && this.currentUser.isAdmin) {
                    html += \`
                        <div class="admin-creation-panel">
                            <h3><i class="fa fa-sliders"></i> Paneli i Administratorit — Shto një Postim të Ri</h3>
                            <form id="add-movie-form">
                                <div class="form-row-fields">
                                    <input type="text" id="mv-title" placeholder="Titulli i Filmit / Serialit" required />
                                    <input type="text" id="mv-img" placeholder="URL e Posterit (Imazhi)" required />
                                </div>
                                <div class="form-row-fields">
                                    <select id="mv-type">
                                        <option value="Filma">Filma</option>
                                        <option value="Seriale">Seriale</option>
                                        <option value="Se Shpejti">Se Shpejti</option>
                                    </select>
                                    <input type="number" id="mv-year" placeholder="Viti" min="1900" max="2030" required />
                                    <input type="text" id="mv-url" placeholder="Video Streaming Link" required />
                                </div>
                                <div class="form-row-fields">
                                    <textarea id="mv-desc" placeholder="Përshkrimi i shkurtër..." rows="2" required></textarea>
                                </div>
                                <button type="submit" class="admin-submit-btn">Publiko Tani</button>
                            </form>
                        </div>\`;
                }

                const filtered = this.movies.filter(mv => {
                    const matchesCat = (this.currentCategory === 'All' || mv.category === this.currentCategory);
                    const matchesSearch = mv.title.toLowerCase().includes(this.searchQuery.toLowerCase());
                    return matchesCat && matchesSearch;
                }).slice(0, 25);

                html += \`<div class="section-title"><h3>📂 Katalogu Matrix (Max 25 Tituj)</h3></div>\`;
                
                if(filtered.length === 0) {
                    html += '<p style="color:#aaa; font-style:italic;">Nuk u gjet asnjë element.</p>';
                } else {
                    html += '<div class="alb-matrix-grid">';
                    filtered.forEach(mv => {
                        const trueIdx = this.movies.indexOf(mv);
                        html += \`
                            <div class="matrix-card">
                                <div class="matrix-poster" style="background-image: url('\${mv.image}');">
                                    \${this.currentUser && this.currentUser.isAdmin ? \`<button class="action-del-btn" data-index="\${trueIdx}">×</button>\` : ''}
                                    <span class="matrix-tag">\${mv.year}</span>
                                </div>
                                <div class="matrix-info">
                                    <h4>\${mv.title}</h4>
                                    <span class="cat-label">\${mv.category}</span>
                                    <p>\${mv.description}</p>
                                    <a href="\${mv.videoUrl}" target="_blank" class="matrix-play-btn"><i class="fa fa-play"></i> Shiko Tani</a>
                                </div>
                            </div>\`;
                    });
                    html += '</div>';
                }
                container.innerHTML = html;
            },

            renderFooterBar: function() {
                document.getElementById('alb-footer-container').innerHTML = \`
                    <div class="footer-inner">
                        <div>Created by Albfilma</div>
                        <div>© 2026 ALB-FILMA. Të gjitha të drejtat e rezervuara.</div>
                    </div>\`;
            },

            bindEvents: function() {
                document.body.addEventListener('click', (e) => {
                    if (e.target.id === 'btn-login') {
                        this.loginUser(document.getElementById('auth-username').value, document.getElementById('auth-password').value);
                    }
                    if (e.target.id === 'btn-logout') this.logout();
                    if (e.target.classList.contains('nav-item') || e.target.classList.contains('brand-logo')) {
                        this.currentCategory = e.target.getAttribute('data-cat');
                        this.renderAllComponents();
                    }
                    if (e.target.classList.contains('action-del-btn')) {
                        const idx = parseInt(e.target.getAttribute('data-index'));
                        if (confirm("Dëshironi të fshini këtë titull?")) {
                            this.movies.splice(idx, 1);
                            this.saveMovies();
                        }
                    }
                });

                document.body.addEventListener('input', (e) => {
                    if (e.target.id === 'global-search') {
                        this.searchQuery = e.target.value;
                        this.renderMainContent();
                    }
                });

                document.body.addEventListener('submit', (e) => {
                    if (e.target.id === 'add-movie-form') {
                        e.preventDefault();
                        this.movies.unshift({
                            title: document.getElementById('mv-title').value,
                            image: document.getElementById('mv-img').value,
                            category: document.getElementById('mv-type').value,
                            year: document.getElementById('mv-year').value,
                            description: document.getElementById('mv-desc').value,
                            videoUrl: document.getElementById('mv-url').value,
                            views: 0
                        });
                        this.saveMovies();
                    }
                });
            }
        };

        window.addEventListener('DOMContentLoaded', () => MovieApp.init());
    </script>
</body>
</html>`;
}
