import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import { useProducts } from '../context/ProductContext';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';

const HTML_CONTENT = `
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Yukti Collections</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#0a0705; --card:#151009; --card-2:#1b140c;
    --gold:#c9a24a; --gold-light:#ecd8a3; --gold-dim: rgba(201,162,74,0.35);
    --maroon:#5c1220; --maroon-light:#7c2333; --emerald:#1c4436; --emerald-light:#2c5e4d;
    --ivory:#f4ecdc; --muted:#b6a88c; --muted-dim:#7d715c;
  }
  *{box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color: transparent;}
  body{ background:var(--ink); color:var(--ivory); font-family:'Jost',sans-serif; font-weight:300; overflow-x: hidden; }
  h1,h2,h3{ font-family:'Playfair Display',serif; font-weight:700; }
  .tagline{ font-family:'Cormorant Garamond',serif; font-style:italic; }

  nav{
    position:sticky; top:0; z-index:50; display:flex; align-items:center; justify-content:space-between;
    padding:22px 6vw; background:linear-gradient(to bottom, rgba(10,7,5,0.95), rgba(10,7,5,0.8) 80%, transparent);
    backdrop-filter:blur(6px);
  }
  .logo{ font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; cursor:pointer; }
  .logo span{ color:var(--gold); }
  .nav-icons{ display:flex; gap:22px; align-items:center; font-size:1.1rem; }
  .nav-icons button{ background:none; border:none; color:var(--ivory); cursor:pointer; position:relative; }

  .page-head{ padding:40px 6vw 30px; text-align:center; }
  .page-head .eyebrow{ font-size:0.72rem; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold); }
  .page-head h1{ font-size:clamp(2.2rem, 4.5vw, 3rem); margin:12px 0; }
  .page-head p{ color:var(--muted); font-family:'Cormorant Garamond',serif; font-style:italic; font-size:1.1rem; }

  .toolbar{
    position:sticky; top:78px; z-index:40; display:flex; align-items:center; justify-content:space-between;
    gap:20px; padding:16px 6vw; background:rgba(10,7,5,0.9); backdrop-filter:blur(8px);
    border-top:1px solid rgba(201,162,74,0.15); border-bottom:1px solid rgba(201,162,74,0.15); flex-wrap:wrap;
  }
  .filter-chips{ display:flex; gap:10px; flex-wrap:wrap; }
  .chip{
    padding:9px 20px; border-radius:999px; border:1px solid rgba(201,162,74,0.3); background:var(--card);
    color:var(--muted); font-size:0.82rem; letter-spacing:0.04em; cursor:pointer; transition:all .3s ease;
  }
  .chip.active{ background:linear-gradient(135deg, var(--gold-light), var(--gold)); color:#241a08; border-color:transparent; font-weight:500; }

  .toolbar-right{ display:flex; gap:14px; align-items:center; }
  .search-box{ position:relative; }
  .search-box input{
    background:var(--card); border:1px solid rgba(201,162,74,0.25); border-radius:999px;
    padding:9px 16px 9px 34px; color:var(--ivory); font-family:'Jost'; font-size:0.85rem; outline:none; width:180px;
  }
  .search-box .icon{ position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:0.85rem; color:var(--muted-dim); }

  .grid-wrap{ padding:40px 6vw 100px; }
  .product-grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(270px, 1fr)); gap:30px; }

  .card{
    background:linear-gradient(180deg, var(--card-2), var(--card));
    border:1px solid rgba(201,162,74,0.15); border-radius:20px; overflow:visible;
    transition:transform .45s ease;
  }
  .card-media{
    position:relative; height:290px; border-radius:20px 20px 0 0; overflow:hidden;
    display:flex; align-items:center; justify-content:center;
  }
  .card-media img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
  
  .card-body{ padding:22px 22px 24px; }
  .card-cat{ font-size:0.68rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
  .card-name{ font-size:1.12rem; margin-bottom:8px; line-height:1.3; }
  .card-rating{ display:flex; align-items:center; gap:6px; font-size:0.78rem; color:var(--muted); margin-bottom:14px; }
  .stars{ color:var(--gold); letter-spacing:1px; }

  .price-row{ display:flex; align-items:baseline; gap:10px; margin-bottom:16px; }
  .price-now{ font-size:1.2rem; font-weight:500; color:var(--ivory); }
  .price-unit{ font-size:0.72rem; color:var(--muted); }

  .btn-rent{
    width:100%; background:transparent; border:1px solid var(--gold); color:var(--gold-light);
    padding:12px; border-radius:999px; font-family:'Jost'; font-size:0.85rem; letter-spacing:0.04em;
    cursor:pointer;
  }
</style>
</head>
<body>

<nav>
  <div class="logo" onclick="window.ReactNativeWebView ? window.ReactNativeWebView.postMessage(JSON.stringify({type: 'NAV_DASHBOARD'})) : window.parent.postMessage({type: 'NAV_DASHBOARD'}, '*')">Yukti <span>Collections</span></div>
  <div class="nav-icons">
    <button aria-label="Admin" onclick="window.ReactNativeWebView ? window.ReactNativeWebView.postMessage(JSON.stringify({type: 'NAV_LOGIN'})) : window.parent.postMessage({type: 'NAV_LOGIN'}, '*')">👤</button>
  </div>
</nav>

<div class="page-head">
  <span class="eyebrow">The Collection</span>
  <h1>Shop To Rent</h1>
  <p class="tagline">Every piece, ready for its next moment.</p>
</div>

<div class="toolbar">
  <div class="filter-chips" id="chips">
    <button class="chip active" data-filter="All">All</button>
    <button class="chip" data-filter="Lehengas">Lehengas</button>
    <button class="chip" data-filter="Sarees">Sarees</button>
    <button class="chip" data-filter="Suits">Suits</button>
    <button class="chip" data-filter="Kurtis">Kurtis</button>
  </div>
  <div class="toolbar-right">
    <div class="search-box">
      <span class="icon">🔍</span>
      <input type="text" placeholder="Search pieces..." id="searchInput">
    </div>
  </div>
</div>

<div class="grid-wrap">
  <div class="product-grid" id="grid"></div>
</div>

<script>
  let allProducts = [];

  function renderCards(list){
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = \`
        <div class="card-media">
          <img src="\${p.imageUrl}" alt="\${p.title}">
        </div>
        <div class="card-body">
          <div class="card-cat">\${p.category}</div>
          <h3 class="card-name">\${p.title}</h3>
          <div class="card-rating"><span class="stars">★★★★★</span> 4.9 (128)</div>
          <div class="price-row">
            <span class="price-now">₹\${p.price}</span>
            <span class="price-unit">/ 4 days</span>
          </div>
          <button class="btn-rent" onclick="bookProduct('\${p.id}')">Rent Now</button>
        </div>
      \`;
      grid.appendChild(card);
    });
  }

  function bookProduct(id) {
    const msg = { type: 'RENT_NOW', id };
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    } else {
      window.parent.postMessage(msg, '*');
    }
  }

  // Handle messages from React Native
  document.addEventListener('message', function(event) {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'SET_PRODUCTS') {
        allProducts = data.products;
        renderCards(allProducts);
      }
    } catch(e) {}
  });
  window.addEventListener('message', function(event) {
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      if (data.type === 'SET_PRODUCTS') {
        allProducts = data.products;
        renderCards(allProducts);
      }
    } catch(e) {}
  });

  document.getElementById('chips').addEventListener('click', (e) => {
    if(e.target.tagName !== 'BUTTON') return;
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.dataset.filter;
    renderCards(filter === 'All' ? allProducts : allProducts.filter(p => p.category === filter));
  });

  document.getElementById('searchInput').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    renderCards(allProducts.filter(p => p.title.toLowerCase().includes(val) || p.category.toLowerCase().includes(val)));
  });
</script>
</body>
</html>
`;

export default function Home() {
  const router = useRouter();
  const { products } = useProducts();
  const { user } = useAuth();
  const webviewRef = useRef<any>(null);

  const injectedJS = `
    window.postMessage(JSON.stringify({ type: 'SET_PRODUCTS', products: ${JSON.stringify(products)} }), '*');
    true;
  `;

  useEffect(() => {
    if (Platform.OS === 'web') {
      const iframe = document.getElementById('home-iframe') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'SET_PRODUCTS', products }, '*');
      }
    } else {
      webviewRef.current?.injectJavaScript(injectedJS);
    }
  }, [products]);

  const handleMessage = (event: any) => {
    const data = Platform.OS === 'web' ? event.data : JSON.parse(event.nativeEvent.data);
    if (!data || !data.type) return;

    if (data.type === 'NAV_LOGIN') {
      if (user) {
        router.push(user.role === 'admin' ? '/admin' : '/login');
      } else {
        router.push('/login');
      }
    } else if (data.type === 'NAV_DASHBOARD') {
      if (user?.role === 'admin') router.push('/admin');
    } else if (data.type === 'RENT_NOW') {
      router.push(`/booking?id=${data.id}`);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [user]);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <iframe
          id="home-iframe"
          srcDoc={HTML_CONTENT}
          style={{ width: '100%', height: '100%', border: 'none' }}
          onLoad={() => {
            const iframe = document.getElementById('home-iframe') as HTMLIFrameElement;
            if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage({ type: 'SET_PRODUCTS', products }, '*');
            }
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: HTML_CONTENT }}
        style={{ flex: 1, backgroundColor: '#0a0705' }}
        onMessage={handleMessage}
        injectedJavaScript={injectedJS}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0705',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  }
});
