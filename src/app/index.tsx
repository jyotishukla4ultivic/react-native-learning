import { useRouter } from 'expo-router';
import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const HTML_CONTENT = `
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Yukti Collections — Rent the Extraordinary</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#0a0705;
    --card:#151009;
    --card-2:#1b140c;
    --gold:#c9a24a;
    --gold-light:#ecd8a3;
    --gold-dim: rgba(201,162,74,0.35);
    --maroon:#5c1220;
    --maroon-light:#7c2333;
    --emerald:#1c4436;
    --ivory:#f4ecdc;
    --muted:#b6a88c;
    --muted-dim:#7d715c;
    --radius: 28px;
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  html{scroll-behavior:smooth;}
  body{
    background:var(--ink);
    color:var(--ivory);
    font-family:'Jost', sans-serif;
    font-weight:300;
    overflow-x:hidden;
    position:relative;
  }
  body::before{
    content:"";
    position:fixed; inset:0;
    background-image:
      radial-gradient(circle at 15% 20%, rgba(201,162,74,0.06), transparent 40%),
      radial-gradient(circle at 85% 75%, rgba(92,18,32,0.18), transparent 45%);
    pointer-events:none;
    z-index:0;
  }
  .paisley-bg{
    position:fixed; inset:0; z-index:0; pointer-events:none; opacity:0.05;
    background-repeat:repeat;
    background-size:220px 220px;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cpath d='M110 30c30 0 45 25 40 55-4 24-28 32-20 55 6 18 28 20 40 8' stroke='%23c9a24a' stroke-width='1' fill='none'/%3E%3Ccircle cx='150' cy='150' r='3' fill='%23c9a24a'/%3E%3C/svg%3E");
  }
  a{color:inherit; text-decoration:none;}
  img{max-width:100%; display:block;}
  .eyebrow{
    font-family:'Jost',sans-serif; font-weight:500; letter-spacing:0.35em; font-size:0.72rem;
    color:var(--gold); text-transform:uppercase;
  }
  h1,h2,h3{font-family:'Playfair Display', serif; font-weight:700; line-height:1.05;}
  .tagline, .quote-text{font-family:'Cormorant Garamond', serif; font-style:italic; font-weight:400;}

  .cursor-glow{
    position:fixed; top:0; left:0; width:420px; height:420px;
    border-radius:50%;
    background:radial-gradient(circle, rgba(201,162,74,0.16), rgba(201,162,74,0) 70%);
    transform:translate(-50%,-50%);
    pointer-events:none; z-index:1; mix-blend-mode:screen;
    transition:opacity .3s ease;
  }
  @media (hover:none){ .cursor-glow{display:none;} }

  nav{
    position:sticky; top:0; z-index:50;
    display:flex; align-items:center; justify-content:space-between;
    padding:22px 6vw;
    background:linear-gradient(to bottom, rgba(10,7,5,0.92), rgba(10,7,5,0.75) 70%, transparent);
    backdrop-filter:blur(6px);
  }
  .logo{font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; letter-spacing:0.02em;}
  .logo span{color:var(--gold);}
  .nav-links{display:flex; gap:2.4rem; font-size:0.82rem; letter-spacing:0.12em; text-transform:uppercase;}
  .nav-links a{position:relative; padding-bottom:4px; opacity:0.85; transition:opacity .3s;}
  .nav-links a::after{
    content:""; position:absolute; left:0; bottom:0; width:0; height:1px; background:var(--gold);
    transition:width .35s ease;
  }
  .nav-links a:hover{opacity:1;}
  .nav-links a:hover::after{width:100%;}
  .nav-cta{
    border:1px solid var(--gold); color:var(--gold-light); padding:10px 22px; border-radius:999px;
    font-size:0.78rem; letter-spacing:0.12em; text-transform:uppercase; transition:all .35s ease;
    cursor: pointer;
  }
  .nav-cta:hover{background:var(--gold); color:var(--ink);}

  .hero{
    position:relative; min-height:96vh; display:flex; align-items:center; justify-content:center;
    padding:6vh 4vw; overflow:hidden;
  }
  .parallax-layer{
    position:absolute; border-radius:20px; overflow:hidden;
    box-shadow:0 30px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,162,74,0.15);
    transition:transform .15s ease-out;
    will-change:transform;
  }
  .swatch{width:100%; height:100%;}
  .swatch-lehenga{ background:
      radial-gradient(circle at 30% 20%, rgba(255,255,255,0.10), transparent 45%),
      linear-gradient(160deg, var(--maroon-light), var(--maroon) 55%, #2a0912 100%); }
  .swatch-saree{ background:
      radial-gradient(circle at 70% 15%, rgba(255,255,255,0.08), transparent 45%),
      linear-gradient(170deg, #7a5a20, var(--gold) 40%, #4d3510 100%); }
  .swatch-suit{ background:
      radial-gradient(circle at 40% 30%, rgba(255,255,255,0.06), transparent 45%),
      linear-gradient(160deg, #1e3d33, var(--emerald) 60%, #0e1e18 100%); }

  .p1{ width:270px; height:340px; top:6%; left:4vw; transform:rotate(-9deg); }
  .p2{ width:230px; height:290px; bottom:5%; left:14vw; transform:rotate(6deg); }
  .p3{ width:250px; height:320px; top:9%; right:5vw; transform:rotate(8deg); }

  .hero-figure{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
  .figure-svg{ width:70%; height:70%; opacity:0.9; }

  .hero-card{
    position:relative; z-index:5;
    max-width:640px; width:100%;
    background:linear-gradient(180deg, rgba(21,16,9,0.9), rgba(21,16,9,0.75));
    border:1px solid var(--gold-dim);
    border-radius:var(--radius);
    padding:56px 54px;
    text-align:center;
    box-shadow:0 0 0 1px rgba(201,162,74,0.08), 0 40px 90px -30px rgba(0,0,0,0.8), 0 0 60px -10px rgba(201,162,74,0.15);
  }
  .hero-card .eyebrow{display:block; margin-bottom:14px;}
  .hero-card h1{font-size:clamp(2.4rem, 5vw, 3.6rem); color:var(--ivory);}
  .hero-card h1 em{font-style:normal; color:var(--gold);}
  .divider{
    width:64px; height:2px; background:var(--gold); margin:22px auto;
  }
  .hero-card .tagline{font-size:1.15rem; color:var(--muted); max-width:440px; margin:0 auto 34px;}
  .btn-gold{
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg, var(--gold-light), var(--gold));
    color:#221708; font-weight:600; font-family:'Jost',sans-serif; letter-spacing:0.04em;
    padding:16px 36px; border-radius:999px; font-size:0.95rem;
    box-shadow:0 12px 30px -10px rgba(201,162,74,0.6);
    transition:transform .3s ease, box-shadow .3s ease;
    cursor: pointer;
  }
  .btn-gold:hover{ transform:translateY(-3px); box-shadow:0 18px 40px -10px rgba(201,162,74,0.75); }

  .offer-strip{
    background:var(--maroon);
    border-top:1px solid rgba(201,162,74,0.3);
    border-bottom:1px solid rgba(201,162,74,0.3);
    overflow:hidden; white-space:nowrap; position:relative; z-index:3;
  }
  .offer-track{ display:inline-flex; gap:60px; padding:14px 0; animation:scroll-left 26s linear infinite; }
  .offer-track span{ font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold-light); display:inline-flex; align-items:center; gap:10px;}
  .offer-track span::before{content:"✦"; color:var(--gold);}
  @keyframes scroll-left{ from{transform:translateX(0);} to{transform:translateX(-50%);} }

  section{ position:relative; z-index:2; padding:110px 6vw; }
  .section-head{ text-align:center; max-width:640px; margin:0 auto 64px; }
  .section-head .eyebrow{ display:block; margin-bottom:14px; }
  .section-head h2{ font-size:clamp(2rem, 4vw, 2.8rem); }
  .section-head p{ font-family:'Cormorant Garamond',serif; font-style:italic; color:var(--muted); font-size:1.15rem; margin-top:16px; }

  .cat-grid{ display:grid; grid-template-columns:repeat(4, 1fr); gap:28px; }
  .cat-card{
    position:relative; border-radius:22px; padding:34px 26px 30px;
    background:linear-gradient(180deg, var(--card-2), var(--card));
    border:1px solid rgba(201,162,74,0.18);
    overflow:visible; cursor:pointer;
    transition:transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s ease, border-color .45s ease;
  }
  .cat-card:hover{
    transform:translateY(-10px);
    border-color:rgba(201,162,74,0.55);
    box-shadow:0 30px 50px -20px rgba(0,0,0,0.6), 0 0 40px -10px rgba(201,162,74,0.25);
  }
  .cat-icon{ height:150px; display:flex; align-items:center; justify-content:center; margin-bottom:22px; }
  .cat-icon svg{ height:100%; width:auto; stroke:var(--gold); transition:transform .5s ease; }
  .cat-card:hover .cat-icon svg{ transform:translateY(-6px) scale(1.04); }
  .cat-card h3{ font-size:1.25rem; margin-bottom:6px; }
  .cat-card .from{ color:var(--muted); font-size:0.9rem; }

  .price-tag{
    position:absolute; top:-6px; right:22px; z-index:6;
    display:flex; flex-direction:column; align-items:center;
    transform-origin:top center;
    transform:translateY(-140%) rotate(-10deg);
    opacity:0; transition:transform .55s cubic-bezier(.34,1.56,.64,1), opacity .3s ease;
  }
  .cat-card:hover .price-tag{ opacity:1; transform:translateY(0) rotate(4deg); animation:swing 2.2s ease-in-out .55s infinite; }
  .price-tag .string{ width:1px; height:16px; background:var(--gold); }
  .price-tag .tag-body{
    background:var(--gold); color:#241a08; font-weight:600; font-size:0.75rem;
    padding:8px 12px; border-radius:6px 6px 6px 0; position:relative;
    box-shadow:0 8px 16px -6px rgba(0,0,0,0.5);
  }
  .price-tag .tag-body::before{
    content:""; position:absolute; top:5px; left:-4px; width:6px; height:6px; border-radius:50%;
    background:var(--ink); box-shadow:0 0 0 1px var(--gold);
  }
  @keyframes swing{ 0%,100%{transform:translateY(0) rotate(4deg);} 50%{transform:translateY(0) rotate(-4deg);} }

  .premium-grid{ display:grid; grid-template-columns:1.2fr 1fr 1fr; gap:26px; }
  .premium-card{
    position:relative; border-radius:24px; overflow:hidden; min-height:460px;
    display:flex; align-items:flex-end;
    border:1px solid rgba(201,162,74,0.2);
    transition:transform .5s ease;
  }
  .premium-card:hover{ transform:translateY(-8px); }
  .premium-card .bg{ position:absolute; inset:0; }
  .premium-card .bg::after{
    content:""; position:absolute; inset:0;
    background:linear-gradient(0deg, rgba(10,7,5,0.95) 15%, rgba(10,7,5,0.15) 60%, transparent 100%);
  }
  .pc1 .bg{ background:radial-gradient(circle at 30% 10%, rgba(255,255,255,0.08), transparent 50%), linear-gradient(200deg,#8a2f3f, var(--maroon) 60%, #240509 100%); }
  .pc2 .bg{ background:radial-gradient(circle at 60% 10%, rgba(255,255,255,0.08), transparent 50%), linear-gradient(200deg,#c9a24a, #7a5a20 60%, #2a1e08 100%); }
  .pc3 .bg{ background:radial-gradient(circle at 60% 10%, rgba(255,255,255,0.08), transparent 50%), linear-gradient(200deg,#2c5e4d, var(--emerald) 60%, #0b1a14 100%); }
  .premium-content{ position:relative; z-index:2; padding:32px; width:100%; }
  .ribbon{
    position:absolute; top:22px; left:-8px; background:var(--gold); color:#241a08;
    font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; font-weight:600;
    padding:6px 16px 6px 20px; z-index:3; box-shadow:0 6px 14px -6px rgba(0,0,0,0.5);
  }
  .ribbon::after{
    content:""; position:absolute; left:0; top:100%; border-style:solid;
    border-width:5px 8px 0 0; border-color:#8a6d20 transparent transparent transparent;
  }
  .premium-content .eyebrow{ margin-bottom:8px; }
  .premium-content h3{ font-size:1.5rem; margin-bottom:8px; }
  .premium-content p{ color:var(--muted); font-size:0.9rem; margin-bottom:18px; }
  .link-arrow{ font-size:0.85rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold-light); border-bottom:1px solid var(--gold-dim); padding-bottom:3px; }

  .process-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:30px; }
  .process-step{ text-align:center; padding:0 12px; }
  .process-num{ font-family:'Playfair Display',serif; font-size:2.4rem; color:var(--gold); opacity:0.55; margin-bottom:10px; }
  .process-step h3{ font-size:1.1rem; margin-bottom:10px; }
  .process-step p{ color:var(--muted); font-size:0.9rem; line-height:1.6; }

  .testi-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
  .testi-card{ background:var(--card); border:1px solid rgba(201,162,74,0.15); border-radius:20px; padding:34px; }
  .testi-card .quote-text{ font-size:1.15rem; color:var(--ivory); margin-bottom:20px; line-height:1.5; }
  .testi-name{ font-size:0.85rem; letter-spacing:0.06em; text-transform:uppercase; color:var(--gold); }
  .testi-role{ font-size:0.8rem; color:var(--muted-dim); }

  footer{ background:var(--card); border-top:1px solid rgba(201,162,74,0.2); padding:80px 6vw 30px; }
  .footer-grid{ display:grid; grid-template-columns:1.4fr 1fr 1fr 1.2fr; gap:40px; margin-bottom:60px; }
  .footer-grid h4{ font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:18px; }
  .footer-grid ul{ list-style:none; display:flex; flex-direction:column; gap:10px; }
  .footer-grid ul a{ color:var(--muted); font-size:0.92rem; transition:color .3s; }
  .footer-grid ul a:hover{ color:var(--gold-light); }
  .newsletter p{ color:var(--muted); font-size:0.9rem; margin-bottom:16px; }
  .newsletter form{ display:flex; border-bottom:1px solid var(--gold-dim); padding-bottom:10px; }
  .newsletter input{ background:transparent; border:none; outline:none; color:var(--ivory); font-family:'Jost'; flex:1; font-size:0.92rem; }
  .newsletter input::placeholder{ color:var(--muted-dim); }
  .newsletter button{ background:none; border:none; color:var(--gold); cursor:pointer; font-size:1.1rem; }
  .footer-bottom{ display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(201,162,74,0.12); padding-top:26px; font-size:0.8rem; color:var(--muted-dim); flex-wrap:wrap; gap:12px; }

  [data-reveal]{ opacity:0; transform:translateY(28px); transition:opacity .8s ease, transform .8s ease; }
  [data-reveal].visible{ opacity:1; transform:translateY(0); }

  @media (max-width: 1024px){
    .cat-grid{ grid-template-columns:repeat(2,1fr); }
    .premium-grid{ grid-template-columns:1fr; }
    .process-grid{ grid-template-columns:repeat(2,1fr); gap:40px; }
    .testi-grid{ grid-template-columns:1fr; }
    .footer-grid{ grid-template-columns:1fr 1fr; }
    .p1,.p2,.p3{ display:none; }
  }
  @media (max-width:640px){
    .nav-links{ display:none; }
    .hero-card{ padding:40px 26px; }
    .cat-grid{ grid-template-columns:1fr; }
    .process-grid{ grid-template-columns:1fr; }
    .footer-grid{ grid-template-columns:1fr; }
  }
</style>
</head>
<body>

<div class="paisley-bg"></div>
<div class="cursor-glow" id="cursorGlow"></div>

<nav>
  <div class="logo">Yukti <span>Collections</span></div>
  <div class="nav-links">
    <a href="#categories">Lehengas</a>
    <a href="#categories">Sarees</a>
    <a href="#premium">Premium Edit</a>
    <a href="#process">How It Works</a>
  </div>
  <a class="nav-cta" onclick="handleNavigation()">Rent Now</a>
</nav>

<header class="hero" id="parallaxHero">
  <div class="parallax-layer p1" data-depth="22">
    <div class="swatch swatch-lehenga">
      <div class="hero-figure"><svg class="figure-svg" viewBox="0 0 100 140" fill="none" stroke="var(--gold-light)" stroke-width="1.1" stroke-linecap="round">
        <path d="M50 10c-8 0-12 8-12 14 0 5 4 8 4 8s-18 8-20 40c-1 16 6 26 6 26h44s7-10 6-26c-2-32-20-40-20-40s4-3 4-8c0-6-4-14-12-14z"/>
        <path d="M38 32l-6 60M62 32l6 60M50 32v56"/>
      </svg></div>
    </div>
  </div>
  <div class="parallax-layer p2" data-depth="34">
    <div class="swatch swatch-saree">
      <div class="hero-figure"><svg class="figure-svg" viewBox="0 0 100 140" fill="none" stroke="#3a2a08" stroke-width="1.1" stroke-linecap="round">
        <circle cx="50" cy="18" r="9"/>
        <path d="M50 27v70M30 45c6-4 14-6 20-6s14 2 20 6M34 55c14 20 18 40 10 58M34 55c-4 22 2 40 8 58"/>
      </svg></div>
    </div>
  </div>
  <div class="parallax-layer p3" data-depth="26">
    <div class="swatch swatch-suit">
      <div class="hero-figure"><svg class="figure-svg" viewBox="0 0 100 140" fill="none" stroke="var(--gold-light)" stroke-width="1.1" stroke-linecap="round">
        <path d="M50 8a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM50 26L30 40v30h40V40z"/>
        <path d="M42 40l8 14 8-14M50 54v56"/>
      </svg></div>
    </div>
  </div>

  <div class="hero-card" data-reveal>
    <span class="eyebrow">Welcome to</span>
    <h1>Yukti <em>Collections</em></h1>
    <div class="divider"></div>
    <p class="tagline">Experience luxury. Rent exclusive lehengas, kurtis, suits and sarees for your unforgettable moments.</p>
    <a class="btn-gold" onclick="handleNavigation()">Enter The Collection →</a>
  </div>
</header>

<div class="offer-strip">
  <div class="offer-track">
    <span>Flat 25% off your first rental</span>
    <span>Free doorstep delivery above ₹4,999</span>
    <span>Extra 10% off festive sarees</span>
    <span>Members get early access to new drops</span>
    <span>Flat 25% off your first rental</span>
    <span>Free doorstep delivery above ₹4,999</span>
    <span>Extra 10% off festive sarees</span>
    <span>Members get early access to new drops</span>
  </div>
</div>

<section id="categories">
  <div class="section-head" data-reveal>
    <span class="eyebrow">The Collection</span>
    <h2>Curated for every occasion</h2>
    <p>Four wardrobes, one rental. Wear the extraordinary, then send it back.</p>
  </div>
  <div class="cat-grid">
    <div class="cat-card" data-reveal onclick="handleNavigation()">
      <div class="price-tag"><div class="string"></div><div class="tag-body">From ₹2,499</div></div>
      <div class="cat-icon"><svg viewBox="0 0 80 100" fill="none" stroke-width="1.4"><path d="M40 6c-6 0-9 6-9 10 0 4 3 6 3 6s-14 6-16 30c-1 12 5 20 5 20h34s6-8 5-20c-2-24-16-30-16-30s3-2 3-6c0-4-3-10-9-10z"/></svg></div>
      <h3>Lehengas</h3>
      <div class="from">Bridal &amp; festive sets</div>
    </div>
    <div class="cat-card" data-reveal onclick="handleNavigation()">
      <div class="price-tag"><div class="string"></div><div class="tag-body">From ₹1,499</div></div>
      <div class="cat-icon"><svg viewBox="0 0 80 100" fill="none" stroke-width="1.4"><circle cx="40" cy="14" r="7"/><path d="M40 21v56M24 36c6-3 11-4 16-4s10 1 16 4M28 44c11 16 14 32 8 46M28 44c-3 18 2 32 6 46"/></svg></div>
      <h3>Sarees</h3>
      <div class="from">Silks, chiffons &amp; drapes</div>
    </div>
    <div class="cat-card" data-reveal onclick="handleNavigation()">
      <div class="price-tag"><div class="string"></div><div class="tag-body">From ₹1,999</div></div>
      <div class="cat-icon"><svg viewBox="0 0 80 100" fill="none" stroke-width="1.4"><path d="M40 8a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM40 22L24 34v26h32V34z"/><path d="M34 34l6 10 6-10"/></svg></div>
      <h3>Suits</h3>
      <div class="from">Anarkalis &amp; co-ords</div>
    </div>
    <div class="cat-card" data-reveal onclick="handleNavigation()">
      <div class="price-tag"><div class="string"></div><div class="tag-body">From ₹899</div></div>
      <div class="cat-icon"><svg viewBox="0 0 80 100" fill="none" stroke-width="1.4"><path d="M40 8a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM28 22l-8 12 6 6 6-8v46h16V32l6 8 6-6-8-12z"/></svg></div>
      <h3>Kurtis</h3>
      <div class="from">Everyday elegance</div>
    </div>
  </div>
</section>

<section id="premium">
  <div class="section-head" data-reveal>
    <span class="eyebrow">Members Only</span>
    <h2>The Premium Edit</h2>
    <p>Our most requested pieces — reserved early, worn once, remembered forever.</p>
  </div>
  <div class="premium-grid">
    <div class="premium-card pc1" data-reveal>
      <div class="bg"></div>
      <div class="ribbon">Premium</div>
      <div class="premium-content">
        <span class="eyebrow">The Bridal Edit</span>
        <h3>Zardozi Bridal Lehenga</h3>
        <p>Hand-embroidered, dupatta &amp; jewellery included.</p>
        <a href="#" class="link-arrow">Reserve This Piece</a>
      </div>
    </div>
    <div class="premium-card pc2" data-reveal>
      <div class="bg"></div>
      <div class="ribbon">Premium</div>
      <div class="premium-content">
        <span class="eyebrow">Festive Silks</span>
        <h3>Kanjeevaram Saree</h3>
        <p>Pure silk, temple border, blouse stitched to size.</p>
        <a href="#" class="link-arrow">Reserve This Piece</a>
      </div>
    </div>
    <div class="premium-card pc3" data-reveal>
      <div class="bg"></div>
      <div class="ribbon">Premium</div>
      <div class="premium-content">
        <span class="eyebrow">Cocktail Edit</span>
        <h3>Emerald Sharara Set</h3>
        <p>Modern silhouette for evening celebrations.</p>
        <a href="#" class="link-arrow">Reserve This Piece</a>
      </div>
    </div>
  </div>
</section>

<section id="process">
  <div class="section-head" data-reveal>
    <span class="eyebrow">How It Works</span>
    <h2>From browse to blouse in four steps</h2>
  </div>
  <div class="process-grid">
    <div class="process-step" data-reveal>
      <div class="process-num">01</div>
      <h3>Browse &amp; Shortlist</h3>
      <p>Explore the collection by occasion, colour or size.</p>
    </div>
    <div class="process-step" data-reveal>
      <div class="process-num">02</div>
      <h3>Reserve Your Dates</h3>
      <p>Pick your event dates — we hold the piece exclusively for you.</p>
    </div>
    <div class="process-step" data-reveal>
      <div class="process-num">03</div>
      <h3>Doorstep Delivery</h3>
      <p>Dry-cleaned and steamed, delivered two days before your event.</p>
    </div>
    <div class="process-step" data-reveal>
      <div class="process-num">04</div>
      <h3>Wear, Return &amp; Repeat</h3>
      <p>We arrange pickup — no dry cleaning needed on your end.</p>
    </div>
  </div>
</section>

<section>
  <div class="section-head" data-reveal>
    <span class="eyebrow">Loved By</span>
    <h2>What our brides &amp; guests say</h2>
  </div>
  <div class="testi-grid">
    <div class="testi-card" data-reveal>
      <p class="quote-text">"The lehenga looked like it was made for me. Delivery was early and the fit was perfect."</p>
      <div class="testi-name">Ananya R.</div>
      <div class="testi-role">Sangeet Guest, Chandigarh</div>
    </div>
    <div class="testi-card" data-reveal>
      <p class="quote-text">"Rented a Kanjeevaram for my reception look — saved so much and it felt genuinely premium."</p>
      <div class="testi-name">Meher K.</div>
      <div class="testi-role">Bride, Ludhiana</div>
    </div>
    <div class="testi-card" data-reveal>
      <p class="quote-text">"Pickup and return were effortless. I didn't have to think about dry cleaning at all."</p>
      <div class="testi-name">Simran D.</div>
      <div class="testi-role">Repeat Customer</div>
    </div>
  </div>
</section>

<footer>
  <div class="footer-grid">
    <div>
      <div class="logo" style="margin-bottom:16px;">Yukti <span>Collections</span></div>
      <p style="color:var(--muted); font-size:0.9rem; max-width:280px;">Premium ethnic wear, rented for the moments that matter.</p>
    </div>
    <div>
      <h4>Shop</h4>
      <ul>
        <li><a href="#">Lehengas</a></li>
        <li><a href="#">Sarees</a></li>
        <li><a href="#">Suits</a></li>
        <li><a href="#">Kurtis</a></li>
      </ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="#">How It Works</a></li>
        <li><a href="#">Size Guide</a></li>
        <li><a href="#">Care &amp; Returns</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>
    <div class="newsletter">
      <h4>Stay In The Loop</h4>
      <p>New arrivals &amp; festive offers, once a week.</p>
      <form onsubmit="return false;">
        <input type="email" placeholder="Your email address" required>
        <button type="submit" aria-label="Subscribe">→</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 Yukti Collections. All rights reserved.</span>
    <span>Basi, Punjab · Delivering Pan-India</span>
  </div>
</footer>

<script>
  function handleNavigation() {
    // Post message back to React Native WebView
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage('NAVIGATE_LOGIN');
    // If running in raw iframe on Web
    window.parent && window.parent.postMessage('NAVIGATE_LOGIN', '*');
  }

  // Cursor glow
  const glow = document.getElementById('cursorGlow');
  window.addEventListener('mousemove', (e) => {
    if(glow){
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }
  });

  // Hero parallax layers
  const heroEl = document.getElementById('parallaxHero');
  const layers = document.querySelectorAll('.parallax-layer');
  if(heroEl && layers.length > 0) {
    heroEl.addEventListener('mousemove', (e) => {
      const rect = heroEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth);
        layer.style.transform = \`translate(\${x * depth}px, \${y * depth}px)\`;
      });
    });
    heroEl.addEventListener('mouseleave', () => {
      layers.forEach(layer => { layer.style.transform = 'translate(0,0)'; });
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }
</script>
</body>
</html>
`;

export default function Landing() {
  const router = useRouter();

  const handleMessage = (event: any) => {
    let data = '';
    
    // For Native WebView
    if (event.nativeEvent && event.nativeEvent.data) {
      data = event.nativeEvent.data;
    } 
    // For Web iframe
    else if (event.data) {
      data = event.data;
    }

    if (data === 'NAVIGATE_LOGIN') {
      router.push('/login');
    }
  };

  // Add event listener for web messages
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe 
          srcDoc={HTML_CONTENT} 
          style={{ width: '100%', height: '100%', border: 'none' }} 
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView 
        source={{ html: HTML_CONTENT }}
        style={{ flex: 1 }}
        onMessage={handleMessage}
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0705', // Deep ink
  }
});
