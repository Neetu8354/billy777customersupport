import Link from "next/link";

export const metadata = { title: "Billy777 — Links" };

const CSS = `
  .s-page { min-height:100vh; min-height:100dvh; display:flex; flex-direction:column; align-items:center; justify-content:center;
    padding:32px 18px; gap:0;
    background: radial-gradient(ellipse 60% 45% at 50% 0%, rgba(201,146,40,0.32), transparent 70%),
      repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 14px), #050505;
    font-family: system-ui,-apple-system,'Segoe UI',sans-serif; color:#eee; }
  .s-logo { width:220px; max-width:80vw; height:auto; object-fit:contain; border-radius:10px; }
  .s-title { margin:16px 0 4px; font-size:22px; font-weight:700;
    background:linear-gradient(180deg,#ff9a70,#e13c0e); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .s-sub { margin:0 0 26px; color:#b9b9b9; font-size:14px; text-align:center; }
  .s-links { width:100%; max-width:360px; display:flex; flex-direction:column; gap:12px; }
  .s-link { display:flex; align-items:center; gap:14px; padding:14px 16px; border-radius:14px; text-decoration:none;
    background:#0c0c0c; border:1px solid rgba(234,75,28,0.4); color:#eee; font-weight:600; font-size:15px;
    transition:transform .15s, border-color .15s; }
  .s-link:hover { transform:translateY(-1px); border-color:#ff6b4a; }
  .s-link i { font-size:20px; width:26px; text-align:center; }
  .s-link .fa-comments { color:#2fdc6f; }
  .s-link .fa-whatsapp { color:#25d366; }
  .s-link .fa-telegram { color:#2eaee6; }
  .s-link .fa-instagram { color:#e1306c; }
  .s-link span.sub { margin-left:auto; font-size:11px; color:#777; font-weight:500; }
  .s-foot { margin-top:30px; color:#666; font-size:11.5px; }
`;

export default function SocialPage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="s-page">
        <img className="s-logo" src="/app/billy-logo.png" alt="Billy777" />
        <h1 className="s-title">Billy777 Customer Support</h1>
        <p className="s-sub">💬 Need help? Chat with us — 24x7 live support.</p>
        <div className="s-links">
          <Link className="s-link" href="/chat">
            <i className="fas fa-comments" /> Live chat support <span className="sub">instant reply</span>
          </Link>
          <Link className="s-link" href="/verify">
            <i className="fab fa-whatsapp" /> Login / Register <span className="sub">mobile</span>
          </Link>
          <a className="s-link" href="/chat">
            <i className="fab fa-telegram" /> Telegram updates <span className="sub">channel</span>
          </a>
          <a className="s-link" href="https://billy777.com/" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe" /> Website <span className="sub">billy777.com</span>
          </a>
        </div>
        <p className="s-foot">Billy777 Customer Support · Secure · 24/7</p>
      </div>
    </>
  );
}
