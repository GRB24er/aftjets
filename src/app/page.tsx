"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const T = {
  bg:"#030614",surface:"#0a0f1e",card:"#0c1121",
  border:"rgba(255,255,255,0.06)",text:"#f0f0f5",
  sub:"#8892b0",dim:"#5a6480",accent:"#6366f1",
  accentLight:"#818cf8",cyan:"#22d3ee",gold:"#c9a96e",
  goldDim:"#a68a4b",emerald:"#10b981",hot:"#ef4444",
};

const DESTINATIONS = [
  {city:"London",code:"LHR",country:"United Kingdom",img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop"},
  {city:"Dubai",code:"DXB",country:"UAE",img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop"},
  {city:"Tokyo",code:"NRT",country:"Japan",img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop"},
  {city:"New York",code:"JFK",country:"USA",img:"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop"},
  {city:"Singapore",code:"SIN",country:"Singapore",img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop"},
  {city:"Paris",code:"CDG",country:"France",img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop"},
];

const STATS = [
  {n:"6",l:"Private Jets"},
  {n:"200+",l:"Destinations"},
  {n:"99.8%",l:"On-Time Rate"},
  {n:"24/7",l:"Concierge"},
];

const FLEET = [
  {name:"Cessna Citation X",cat:"Midsize Jet",pax:12,range:"3,460 nm",speed:"Mach 0.92",rate:"$4,800/hr",features:["Fastest civilian jet","Club seating","Wi-Fi","Refreshment center"]},
  {name:"Bombardier Challenger 350",cat:"Super-Midsize",pax:10,range:"3,200 nm",speed:"Mach 0.80",rate:"$5,500/hr",features:["Flat-floor cabin","Full galley","In-flight baggage access","Stand-up cabin"]},
  {name:"Gulfstream G650",cat:"Ultra-Long-Range",pax:18,range:"7,000 nm",speed:"Mach 0.85",rate:"$11,000/hr",features:["Master suite","Shower","Conference area","Ka-band Wi-Fi"]},
  {name:"Dassault Falcon 8X",cat:"Heavy Jet",pax:16,range:"6,450 nm",speed:"Mach 0.80",rate:"$9,200/hr",features:["Three lounge areas","Skylight","Crew rest area","Full galley"]},
  {name:"Embraer Praetor 600",cat:"Super-Midsize",pax:12,range:"4,018 nm",speed:"Mach 0.83",rate:"$5,800/hr",features:["Flat-floor cabin","Stone floor lavatory","Valence interior","Full galley"]},
  {name:"Bombardier Global 7500",cat:"Ultra-Long-Range",pax:17,range:"7,700 nm",speed:"Mach 0.85",rate:"$12,500/hr",features:["Four living spaces","Full kitchen","Master suite with shower","Crew suite"]},
];

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [trackRef, setTrackRef] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{background:T.bg,color:T.text,fontFamily:"'Segoe UI','Plus Jakarta Sans',system-ui,sans-serif",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        .hero-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(201,169,110,0.4)!important}
        .dest-card:hover{transform:translateY(-8px);border-color:rgba(255,255,255,0.15)!important}
        .fleet-card:hover{border-color:rgba(201,169,110,0.3)!important;background:rgba(201,169,110,0.03)!important}
        .nav-link:hover{color:#f0f0f5!important}
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
      `}</style>

      {/* NAVBAR */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"16px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",background:scrollY>50?"rgba(3,6,20,0.95)":"transparent",backdropFilter:scrollY>50?"blur(20px)":"none",borderBottom:scrollY>50?"1px solid "+T.border:"none",transition:"all 0.3s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <img src="/images/logo.svg" alt="ATF Jets" style={{height:36}} />
        </div>
        <div style={{display:"flex",gap:32,alignItems:"center"}}>
          {["Fleet","Destinations","Track"].map(s=>(
            <a key={s} href={"#"+s.toLowerCase()} className="nav-link" style={{color:T.sub,fontSize:13,textDecoration:"none",fontWeight:500,transition:"color 0.2s",letterSpacing:0.5}}>{s}</a>
          ))}
          <Link href="/portal" style={{padding:"8px 24px",borderRadius:8,background:"linear-gradient(135deg,"+T.gold+","+T.goldDim+")",color:"#0a0f1e",fontSize:13,fontWeight:700,textDecoration:"none",letterSpacing:0.5,transition:"all 0.3s"}} className="hero-btn">Charter Now</Link>
          <Link href="/auth" style={{padding:"8px 20px",borderRadius:8,border:"1px solid "+T.border,color:T.sub,fontSize:13,fontWeight:500,textDecoration:"none"}}>Sign In</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",padding:"0 40px"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)"}} />
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 70% 30%, rgba(99,102,241,0.05) 0%, transparent 50%)"}} />
        <div style={{position:"absolute",inset:0,opacity:0.02,backgroundImage:"linear-gradient("+T.gold+" 1px, transparent 1px), linear-gradient(90deg, "+T.gold+" 1px, transparent 1px)",backgroundSize:"60px 60px"}} />

        <div style={{textAlign:"center",position:"relative",zIndex:2,maxWidth:900,animation:"fadeUp 1s ease"}}>
          <div style={{fontSize:12,letterSpacing:6,color:T.gold,fontWeight:600,marginBottom:24}}>PRIVATE JET CHARTER</div>
          <h1 style={{fontSize:"clamp(42px,7vw,80px)",fontWeight:300,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.1,marginBottom:24}}>
            Fly On Your <br/><em style={{fontStyle:"italic",color:T.gold}}>Terms</em>
          </h1>
          <p style={{fontSize:18,color:T.sub,maxWidth:600,margin:"0 auto 40px",lineHeight:1.7,fontWeight:300}}>
            Charter from a fleet of six world-class private jets. Depart when you want, arrive in style.
          </p>
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/portal" className="hero-btn" style={{padding:"16px 48px",borderRadius:12,background:"linear-gradient(135deg,"+T.gold+","+T.goldDim+")",color:"#0a0f1e",fontSize:15,fontWeight:700,textDecoration:"none",letterSpacing:1,transition:"all 0.3s",boxShadow:"0 4px 20px rgba(201,169,110,0.3)"}}>Charter a Jet</Link>
            <a href="#fleet" className="hero-btn" style={{padding:"16px 40px",borderRadius:12,border:"1px solid "+T.border,color:T.text,fontSize:15,fontWeight:500,textDecoration:"none",transition:"all 0.3s",background:"rgba(255,255,255,0.02)"}}>View Fleet</a>
          </div>
        </div>

        <div style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",animation:"float 3s ease infinite"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.dim} strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{padding:"40px 0",borderTop:"1px solid "+T.border,borderBottom:"1px solid "+T.border}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,padding:"0 40px"}}>
          {STATS.map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontSize:36,fontWeight:700,color:T.gold,fontFamily:"'DM Sans',sans-serif"}}>{s.n}</div>
              <div style={{fontSize:12,color:T.dim,letterSpacing:2,marginTop:4}}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FLEET */}
      <section id="fleet" style={{padding:"100px 40px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <div style={{fontSize:11,letterSpacing:5,color:T.gold,fontWeight:600,marginBottom:12}}>OUR FLEET</div>
          <h2 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:300,fontFamily:"'Playfair Display',Georgia,serif"}}>Six World-Class <em style={{fontStyle:"italic",color:T.gold}}>Aircraft</em></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {FLEET.map((jet,i)=>(
            <div key={i} className="fleet-card" style={{background:T.card,border:"1px solid "+T.border,borderRadius:16,padding:28,transition:"all 0.3s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:2,color:T.gold,fontWeight:700,marginBottom:6}}>{jet.cat.toUpperCase()}</div>
                  <div style={{fontSize:18,fontWeight:700,color:T.text,marginBottom:4}}>{jet.name}</div>
                  <div style={{fontSize:12,color:T.dim,fontFamily:"monospace"}}>{jet.pax} pax | {jet.range} | {jet.speed}</div>
                </div>
                <div style={{fontSize:28,opacity:0.15}}>&#9992;</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16}}>
                {jet.features.map((f,fi)=>(
                  <div key={fi} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:T.surface,borderRadius:8}}>
                    <div style={{width:4,height:4,borderRadius:2,background:T.gold,flexShrink:0}} />
                    <span style={{fontSize:11,color:T.sub}}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12,borderTop:"1px solid "+T.border}}>
                <span style={{fontSize:16,fontWeight:700,color:T.gold,fontFamily:"monospace"}}>{jet.rate}</span>
                <Link href="/portal" style={{fontSize:11,color:T.accent,fontWeight:600,textDecoration:"none"}}>Charter →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" style={{padding:"100px 40px",background:"linear-gradient(180deg, transparent, rgba(201,169,110,0.03), transparent)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:60}}>
            <div style={{fontSize:11,letterSpacing:5,color:T.gold,fontWeight:600,marginBottom:12}}>FLY ANYWHERE</div>
            <h2 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:300,fontFamily:"'Playfair Display',Georgia,serif"}}>Popular <em style={{fontStyle:"italic",color:T.gold}}>Destinations</em></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {DESTINATIONS.map((d,i)=>(
              <Link href="/portal" key={i} className="dest-card" style={{background:T.card,border:"1px solid "+T.border,borderRadius:16,overflow:"hidden",textDecoration:"none",transition:"all 0.4s",cursor:"pointer"}}>
                <div style={{height:200,background:"linear-gradient(135deg, rgba(201,169,110,0.2), rgba(99,102,241,0.1))",position:"relative",overflow:"hidden"}}>
                  <img src={d.img} alt={d.city} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.7}} onError={(e:any)=>{e.target.style.display="none"}} />
                  <div style={{position:"absolute",top:12,right:12,padding:"4px 12px",borderRadius:6,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(10px)"}}>
                    <span style={{color:T.gold,fontSize:14,fontWeight:700,fontFamily:"monospace"}}>{d.code}</span>
                  </div>
                </div>
                <div style={{padding:"20px 24px"}}>
                  <div style={{fontSize:20,fontWeight:700,color:T.text,marginBottom:4}}>{d.city}</div>
                  <div style={{fontSize:12,color:T.dim}}>{d.country}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRACK BOOKING */}
      <section id="track" style={{padding:"100px 40px"}}>
        <div style={{maxWidth:600,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:11,letterSpacing:5,color:T.gold,fontWeight:600,marginBottom:12}}>CHARTER TRACKER</div>
          <h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:300,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:12}}>Track Your <em style={{fontStyle:"italic",color:T.gold}}>Charter</em></h2>
          <p style={{fontSize:14,color:T.sub,marginBottom:32}}>Enter your booking reference to view real-time charter status and flight details.</p>
          <div style={{display:"flex",gap:10,maxWidth:440,margin:"0 auto"}}>
            <input
              value={trackRef}
              onChange={e=>setTrackRef(e.target.value.toUpperCase())}
              placeholder="e.g. ATF-AB1234"
              onKeyDown={e=>{if(e.key==="Enter"&&trackRef.trim())window.location.href="/track/"+trackRef.trim()}}
              style={{flex:1,padding:"14px 20px",background:T.surface,border:"1px solid "+T.border,borderRadius:12,color:T.text,fontSize:15,fontFamily:"monospace",outline:"none",letterSpacing:2}}
            />
            <button
              onClick={()=>{if(trackRef.trim())window.location.href="/track/"+trackRef.trim()}}
              style={{padding:"14px 32px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+T.gold+","+T.goldDim+")",color:"#0a0f1e",fontSize:14,fontWeight:700,cursor:"pointer",transition:"all 0.3s"}}
              className="hero-btn"
            >Track</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"100px 40px"}}>
        <div style={{maxWidth:900,margin:"0 auto",textAlign:"center",background:T.card,border:"1px solid "+T.border,borderRadius:24,padding:"60px 40px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)"}} />
          <div style={{position:"relative",zIndex:2}}>
            <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:300,fontFamily:"'Playfair Display',Georgia,serif",marginBottom:16}}>Ready to <em style={{fontStyle:"italic",color:T.gold}}>Fly Private?</em></h2>
            <p style={{fontSize:16,color:T.sub,marginBottom:36,maxWidth:500,margin:"0 auto 36px"}}>Charter your next flight with ATF Jets. No schedules, no crowds — just you and the sky.</p>
            <Link href="/portal" className="hero-btn" style={{display:"inline-block",padding:"16px 56px",borderRadius:12,background:"linear-gradient(135deg,"+T.gold+","+T.goldDim+")",color:"#0a0f1e",fontSize:16,fontWeight:700,textDecoration:"none",letterSpacing:1,transition:"all 0.3s",boxShadow:"0 4px 20px rgba(201,169,110,0.3)"}}>Charter a Jet</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid "+T.border,padding:"60px 40px 40px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40}}>
          <div>
            <div style={{marginBottom:12}}><img src="/images/logo.svg" alt="ATF Jets" style={{height:32}} /></div>
            <p style={{fontSize:12,color:T.dim,lineHeight:1.8,maxWidth:280}}>Private jet charter for the discerning traveler. Fly anywhere, anytime, on your terms.</p>
          </div>
          <div>
            <div style={{fontSize:10,letterSpacing:2,color:T.dim,fontWeight:700,marginBottom:16}}>QUICK LINKS</div>
            {[{l:"Charter a Jet",h:"/portal"},{l:"Our Fleet",h:"#fleet"},{l:"Track Charter",h:"/track"},{l:"Sign In",h:"/auth"}].map(lnk=>(
              <Link key={lnk.l} href={lnk.h} style={{display:"block",color:T.sub,fontSize:13,textDecoration:"none",marginBottom:10}}>{lnk.l}</Link>
            ))}
          </div>
          <div>
            <div style={{fontSize:10,letterSpacing:2,color:T.dim,fontWeight:700,marginBottom:16}}>SUPPORT</div>
            {["Help Center","Contact Us","Charter FAQ","Concierge Services"].map(s=>(
              <div key={s} style={{color:T.sub,fontSize:13,marginBottom:10}}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{fontSize:10,letterSpacing:2,color:T.dim,fontWeight:700,marginBottom:16}}>CONTACT</div>
            <div style={{color:T.sub,fontSize:13,marginBottom:10}}>charter@atfjets.com</div>
            <div style={{color:T.sub,fontSize:13,marginBottom:10}}>+44 20 7946 0958</div>
            <div style={{color:T.sub,fontSize:13}}>London, United Kingdom</div>
          </div>
        </div>
        <div style={{maxWidth:1200,margin:"40px auto 0",paddingTop:24,borderTop:"1px solid "+T.border,display:"flex",justifyContent:"space-between"}}>
          <div style={{fontSize:11,color:T.dim}}>&#169; {new Date().getFullYear()} ATF Jets. All rights reserved.</div>
          <div style={{display:"flex",gap:20}}>
            {["Privacy Policy","Terms of Service","Cookie Policy"].map(s=>(
              <span key={s} style={{fontSize:11,color:T.dim}}>{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
