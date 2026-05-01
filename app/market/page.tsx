"use client";
import { useState } from "react";
// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
    primary: "#FF6B35",
    primaryDark: "#E5501A",
    primaryLight: "#FFF0EB",
    secondary: "#2DBD76",
    bg: "#F9F6F2",
    card: "#FFFFFF",
    text: "#1A1A1A",
    sub: "#7A7A7A",
    border: "#EFEFEF",
    tag: "#FFF3ED",
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const categories = ["ทั้งหมด", "อาหารสด", "ผัก-ผลไม้", "เนื้อสัตว์", "ของแห้ง", "เครื่องดื่ม", "ขนม"];

const products = [
    { id: 1, name: "ข้าวหอมมะลิ 5 กก.", brand: "ข้าวดี", price: 189, oldPrice: 220, img: "🌾", tag: "ลด 14%", rating: 4.8, reviews: 312, cat: "ของแห้ง" },
    { id: 2, name: "น้ำมันมะพร้าว 500ml", brand: "ออร์แกนิก", price: 129, oldPrice: 160, img: "🥥", tag: "ลด 19%", rating: 4.6, reviews: 198, cat: "ของแห้ง" },
    { id: 3, name: "มะเขือเทศราชินี", brand: "ฟาร์มสด", price: 45, oldPrice: null, img: "🍅", tag: "สดใหม่", rating: 4.9, reviews: 87, cat: "ผัก-ผลไม้" },
    { id: 4, name: "เนื้อหมูสามชั้น 500g", brand: "ฟาร์มไทย", price: 110, oldPrice: 130, img: "🥩", tag: "ลด 15%", rating: 4.7, reviews: 145, cat: "เนื้อสัตว์" },
    { id: 5, name: "น้ำส้มคั้นสด 1L", brand: "โอเค ฟรุ๊ต", price: 79, oldPrice: 95, img: "🍊", tag: "HOT", rating: 4.5, reviews: 221, cat: "เครื่องดื่ม" },
    { id: 6, name: "ไข่ไก่ 30 ฟอง", brand: "ไข่ดีฟาร์ม", price: 135, oldPrice: 150, img: "🥚", tag: "ขายดี", rating: 4.8, reviews: 534, cat: "อาหารสด" },
    { id: 7, name: "แอปเปิ้ลฟูจิ 1 กก.", brand: "นำเข้า", price: 99, oldPrice: 120, img: "🍎", tag: "ลด 17%", rating: 4.6, reviews: 76, cat: "ผัก-ผลไม้" },
    { id: 8, name: "นมสด UHT 1L x6", brand: "ดอยคำ", price: 165, oldPrice: 180, img: "🥛", tag: "แพ็คคุ้ม", rating: 4.7, reviews: 289, cat: "เครื่องดื่ม" },
];

const orders = [
    { id: "#874522648", items: "ข้าวหอมมะลิ, น้ำส้มคั้นสด, ไข่ไก่", price: 403, date: "02/02/2025", status: "กำลังจัดส่ง", statusColor: C.primary },
    { id: "#874511200", items: "เนื้อหมูสามชั้น, มะเขือเทศราชินี", price: 155, date: "29/01/2025", status: "จัดส่งแล้ว", statusColor: C.secondary },
    { id: "#874490033", items: "นมสด UHT x6, แอปเปิ้ลฟูจิ", price: 264, date: "20/01/2025", status: "จัดส่งแล้ว", statusColor: C.secondary },
];

const storeOrders = [
    { customer: "อัญชลี ศรีสุข", products: "ข้าวหอมมะลิ, น้ำส้มคั้น, ไข่ไก่", price: "3,638,066", status: "กำลังจัดส่ง", time: "2025-02-05 08:28", color: "#FF6B35" },
    { customer: "บุญคุณ อินทร์แสง", products: "ชาน้ำแข็ง, หน้าหมูกรอบ", price: "6,462,020", status: "ยังไม่ชำระ", time: "2025-02-03 19:49", color: "#999" },
    { customer: "ธนวัฒน์ พักพิมสมปัติ", products: "ยาแก้ไอ, ผ้าพันแผล, ยาราคาปานกลาง", price: "8,664,948", status: "ยกเลิกออเดอร์", time: "2025-02-02 19:17", color: "#E53935" },
    { customer: "กิติพงษ์ อรุณโยค", products: "ตำมันรวม, น้ำเสาวรส", price: "2,592,335", status: "กำลังจัดส่ง", time: "2025-02-02 09:46", color: "#FF6B35" },
];

// ─── ICONS (SVG inline) ───────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "#1A1A1A", style = {} }) => {
    const paths = {
        home: <><path d="M3 12L12 3l9 9" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" /><path d="M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" /></>,
        search: <><circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" /><path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" /></>,
        cart: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={color} strokeWidth="2" fill="none" /><line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" /><path d="M16 10a4 4 0 01-8 0" stroke={color} strokeWidth="2" fill="none" /></>,
        heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth="2" fill="none" />,
        user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" fill="none" /><circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" /></>,
        orders: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={color} strokeWidth="2" fill="none" /><rect x="9" y="3" width="6" height="4" rx="1" stroke={color} strokeWidth="2" fill="none" /><path d="M9 12h6M9 16h4" stroke={color} strokeWidth="2" strokeLinecap="round" /></>,
        chevron: <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />,
        back: <path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />,
        plus: <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />,
        minus: <path d="M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />,
        trash: <><polyline points="3 6 5 6 21 6" stroke={color} strokeWidth="2" fill="none" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke={color} strokeWidth="2" fill="none" /></>,
        store: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={color} strokeWidth="2" fill="none" /><polyline points="9 22 9 12 15 12 15 22" stroke={color} strokeWidth="2" fill="none" /></>,
        bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" fill="none" /><path d="M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth="2" fill="none" /></>,
        star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={color} strokeWidth="1.5" fill={color} />,
        tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke={color} strokeWidth="2" fill="none" /><line x1="7" y1="7" x2="7.01" y2="7" stroke={color} strokeWidth="3" strokeLinecap="round" /></>,
        qr: <><rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" /><rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" /><rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" /><rect x="5" y="5" width="3" height="3" fill={color} /><rect x="16" y="5" width="3" height="3" fill={color} /><rect x="5" y="16" width="3" height="3" fill={color} /><path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" stroke={color} strokeWidth="1.5" fill="none" /></>,
    };
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
            {paths[name]}
        </svg>
    );
};

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const BottomNav = ({ screen, setScreen }) => {
    const tabs = [
        { id: "home", label: "หน้าหลัก", icon: "home" },
        { id: "search", label: "ค้นหา", icon: "search" },
        { id: "cart", label: "ตะกร้า", icon: "cart" },
        { id: "orders", label: "คำสั่งซื้อ", icon: "orders" },
        { id: "profile", label: "บัญชี", icon: "user" },
    ];
    return (
        <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "white", borderTop: `1px solid ${C.border}`,
            display: "flex", padding: "8px 0 20px",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.06)"
        }}>
            {tabs.map(t => (
                <div key={t.id} onClick={() => setScreen(t.id)}
                    style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
                    <Icon name={t.icon} size={22} color={screen === t.id ? C.primary : "#BBBBBB"} />
                    <span style={{ fontSize: 10, color: screen === t.id ? C.primary : "#BBBBBB", fontWeight: screen === t.id ? 600 : 400 }}>{t.label}</span>
                    {screen === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.primary, marginTop: -2 }} />}
                </div>
            ))}
        </div>
    );
};

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
const TopBar = ({ title, back, onBack, right }) => (
    <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "52px 20px 14px", background: "white",
        borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 99
    }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {back && (
                <div onClick={onBack} style={{ cursor: "pointer", padding: 4 }}>
                    <Icon name="back" size={22} />
                </div>
            )}
            <span style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 17, color: C.text }}>{title}</span>
        </div>
        {right}
    </div>
);

// ─── SCREEN: HOME ─────────────────────────────────────────────────────────────
const HomeScreen = ({ setScreen, setSelectedProduct, cartCount }) => {
    const [activeCat, setActiveCat] = useState("ทั้งหมด");
    const filtered = activeCat === "ทั้งหมด" ? products : products.filter(p => p.cat === activeCat);

    return (
        <div style={{ paddingBottom: 80 }}>
            {/* Navbar */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "52px 20px 14px", background: "white", position: "sticky", top: 0, zIndex: 99
            }}>
                <div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontSize: 11, color: C.sub }}>ส่งถึง</div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 16, color: C.text, display: "flex", alignItems: "center", gap: 4 }}>
                        📍 บ้าน — กรุงเทพฯ
                        <Icon name="chevron" size={14} color={C.primary} />
                    </div>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setScreen("cart")}>
                        <Icon name="cart" size={22} color={C.text} />
                        {cartCount > 0 && (
                            <div style={{
                                position: "absolute", top: -6, right: -6,
                                background: C.primary, color: "white", borderRadius: "50%",
                                width: 16, height: 16, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700
                            }}>{cartCount}</div>
                        )}
                    </div>
                    <Icon name="bell" size={22} color={C.text} style={{ cursor: "pointer" }} />
                </div>
            </div>

            {/* Search bar */}
            <div style={{ padding: "0 16px 12px", background: "white" }}>
                <div style={{
                    background: C.bg, borderRadius: 14, display: "flex",
                    alignItems: "center", padding: "11px 16px", gap: 8
                }}>
                    <Icon name="search" size={16} color={C.sub} />
                    <span style={{ color: "#BBBBBB", fontSize: 13, fontFamily: "'Sarabun',sans-serif" }}>ค้นหาสินค้า ผัก ผลไม้ อาหารสด...</span>
                </div>
            </div>

            {/* Banner */}
            <div style={{ padding: "0 16px 20px" }}>
                <div style={{
                    background: `linear-gradient(135deg, ${C.primary} 0%, #FF9A5C 100%)`,
                    borderRadius: 20, padding: "22px 20px", color: "white",
                    position: "relative", overflow: "hidden", minHeight: 130
                }}>
                    <div style={{
                        position: "absolute", right: -10, bottom: -10,
                        fontSize: 80, opacity: 0.2, lineHeight: 1
                    }}>🛒</div>
                    <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", fontSize: 60 }}>🥬🍎🥩</div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontSize: 11, opacity: 0.85, marginBottom: 4 }}>โปรโมชันพิเศษ ทุกวันศุกร์</div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontSize: 28, fontWeight: 700, lineHeight: 1.1 }}>ลดสูงสุด<br /><span style={{ fontSize: 36 }}>70%</span></div>
                    <div style={{ marginTop: 10 }}>
                        <span style={{
                            background: "rgba(255,255,255,0.25)", borderRadius: 8,
                            padding: "5px 14px", fontSize: 12, fontWeight: 600, backdropFilter: "blur(4px)"
                        }}>ช้อปเลย →</span>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div style={{ paddingBottom: 4 }}>
                <div style={{ paddingLeft: 16, fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 12, color: C.text }}>
                    หมวดหมู่สินค้า
                </div>
                <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 16px 4px", scrollbarWidth: "none" }}>
                    {categories.map(c => (
                        <div key={c} onClick={() => setActiveCat(c)} style={{
                            whiteSpace: "nowrap", padding: "8px 16px", borderRadius: 20,
                            background: activeCat === c ? C.primary : "white",
                            color: activeCat === c ? "white" : C.sub,
                            fontWeight: activeCat === c ? 600 : 400,
                            fontSize: 13, cursor: "pointer", border: `1px solid ${activeCat === c ? C.primary : C.border}`,
                            flexShrink: 0, transition: "all 0.2s"
                        }}>{c}</div>
                    ))}
                </div>
            </div>

            {/* Products grid */}
            <div style={{ padding: "16px 16px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 15 }}>
                        รายการสินค้า
                    </span>
                    <span style={{ fontSize: 12, color: C.sub }}>แสดง {filtered.length} รายการ</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {filtered.map(p => (
                        <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); setScreen("detail"); }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ product: p, onClick }) => (
    <div onClick={onClick} style={{
        background: "white", borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)", cursor: "pointer"
    }}>
        <div style={{
            background: C.bg, height: 130,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 56, position: "relative"
        }}>
            {p.img}
            <div style={{
                position: "absolute", top: 8, left: 8,
                background: p.tag === "สดใหม่" ? C.secondary : p.tag === "HOT" ? "#FF3B3B" : C.primary,
                color: "white", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700
            }}>{p.tag}</div>
            <div style={{
                position: "absolute", top: 8, right: 8,
                background: "white", borderRadius: "50%", width: 28, height: 28,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}>
                <Icon name="heart" size={14} color="#DDD" />
            </div>
        </div>
        <div style={{ padding: "10px 12px 12px" }}>
            <div style={{ fontSize: 12, color: C.sub, marginBottom: 2 }}>{p.brand}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3, marginBottom: 6 }}>{p.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 8 }}>
                <Icon name="star" size={11} color="#FFAA00" />
                <span style={{ fontSize: 11, color: C.sub }}>{p.rating} ({p.reviews})</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.primary }}>฿{p.price}</span>
                    {p.oldPrice && <span style={{ fontSize: 11, color: "#BBBBBB", textDecoration: "line-through", marginLeft: 4 }}>฿{p.oldPrice}</span>}
                </div>
                <div style={{
                    background: C.primary, borderRadius: 8, width: 28, height: 28,
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <Icon name="plus" size={14} color="white" />
                </div>
            </div>
        </div>
    </div>
);

// ─── SCREEN: PRODUCT DETAIL ───────────────────────────────────────────────────
const DetailScreen = ({ product: p, setScreen, addToCart }) => {
    const [qty, setQty] = useState(1);
    if (!p) return null;
    return (
        <div style={{ paddingBottom: 100 }}>
            {/* Back + title */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "52px 20px 14px", background: "white", position: "sticky", top: 0, zIndex: 99
            }}>
                <div onClick={() => setScreen("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name="back" size={22} />
                    <span style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 17 }}>รายละเอียดสินค้า</span>
                </div>
                <Icon name="heart" size={22} color="#DDD" style={{ cursor: "pointer" }} />
            </div>

            {/* Product image */}
            <div style={{
                background: `linear-gradient(180deg, ${C.bg} 0%, white 100%)`,
                height: 220, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 90, position: "relative"
            }}>
                {p.img}
                <div style={{
                    position: "absolute", top: 14, left: 16,
                    background: C.primary, color: "white", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 700
                }}>{p.tag}</div>
            </div>

            {/* Info */}
            <div style={{ padding: "20px 20px 0", background: "white" }}>
                <div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>{p.brand}</div>
                <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                    {[1, 2, 3, 4, 5].map(s => (
                        <Icon key={s} name="star" size={14} color={s <= Math.floor(p.rating) ? "#FFAA00" : "#EEE"} />
                    ))}
                    <span style={{ fontSize: 13, color: C.sub }}>{p.rating} · {p.reviews} รีวิว</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Prompt',sans-serif", fontSize: 28, fontWeight: 700, color: C.primary }}>฿{p.price}</span>
                    {p.oldPrice && (
                        <>
                            <span style={{ fontSize: 16, color: "#BBBBBB", textDecoration: "line-through" }}>฿{p.oldPrice}</span>
                            <span style={{ background: C.primaryLight, color: C.primary, padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                                ลด {Math.round((1 - p.price / p.oldPrice) * 100)}%
                            </span>
                        </>
                    )}
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>รายละเอียดสินค้า</div>
                    <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.8 }}>
                        สินค้าคุณภาพดี คัดสรรจากแหล่งผลิตโดยตรง ผ่านมาตรฐานความสะอาดและความปลอดภัย เหมาะสำหรับการบริโภคในครัวเรือน ส่งตรงถึงบ้านภายใน 2 ชั่วโมง
                    </div>
                </div>
                {/* Tags */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                    {["🚚 ส่งเร็ว 2 ชม.", "✅ คุณภาพรับรอง", "🔄 คืนสินค้าได้"].map(t => (
                        <span key={t} style={{
                            background: C.primaryLight, color: C.primaryDark,
                            padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600
                        }}>{t}</span>
                    ))}
                </div>
            </div>

            {/* Qty + Add to cart */}
            <div style={{
                position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: 390, background: "white", padding: "16px 20px 34px",
                borderTop: `1px solid ${C.border}`, display: "flex", gap: 12, alignItems: "center"
            }}>
                <div style={{
                    display: "flex", alignItems: "center", gap: 0,
                    border: `1.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden"
                }}>
                    <div onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                        width: 40, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                    }}><Icon name="minus" size={16} color={C.text} /></div>
                    <div style={{ width: 36, textAlign: "center", fontWeight: 700, fontSize: 16 }}>{qty}</div>
                    <div onClick={() => setQty(q => q + 1)} style={{
                        width: 40, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", background: C.primaryLight
                    }}><Icon name="plus" size={16} color={C.primary} /></div>
                </div>
                <div onClick={() => { addToCart(p, qty); setScreen("cart"); }} style={{
                    flex: 1, background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`,
                    color: "white", borderRadius: 14, height: 48, display: "flex",
                    alignItems: "center", justifyContent: "center", fontFamily: "'Prompt',sans-serif",
                    fontWeight: 700, fontSize: 15, cursor: "pointer", gap: 8,
                    boxShadow: `0 6px 20px ${C.primary}55`
                }}>
                    <Icon name="cart" size={18} color="white" />
                    เพิ่มลงตะกร้า · ฿{(p.price * qty).toFixed(0)}
                </div>
            </div>
        </div>
    );
};

// ─── SCREEN: CART ─────────────────────────────────────────────────────────────
const CartScreen = ({ cart, setCart, setScreen }) => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = Math.floor(total * 0.11);
    const [coupon, setCoupon] = useState("");

    const updateQty = (id, delta) => setCart(c => c.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
    const remove = (id) => setCart(c => c.filter(i => i.id !== id));

    return (
        <div style={{ paddingBottom: 80 }}>
            <TopBar title="ตะกร้าสินค้า" right={
                cart.length > 0 && <span style={{ fontSize: 12, color: C.sub }}>{cart.length} รายการ</span>
            } />

            {cart.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, gap: 16 }}>
                    <div style={{ fontSize: 64 }}>🛒</div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 18, color: C.text }}>ตะกร้าว่างเปล่า</div>
                    <div style={{ fontSize: 13, color: C.sub }}>เริ่มช้อปปิ้งกันเลย!</div>
                    <div onClick={() => setScreen("home")} style={{
                        background: C.primary, color: "white", padding: "12px 28px",
                        borderRadius: 14, fontWeight: 700, cursor: "pointer", fontSize: 14
                    }}>เลือกสินค้า</div>
                </div>
            ) : (
                <>
                    <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                        {cart.map(item => (
                            <div key={item.id} style={{
                                background: "white", borderRadius: 16, padding: 14,
                                display: "flex", gap: 12, alignItems: "center",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                            }}>
                                <div style={{
                                    width: 64, height: 64, background: C.bg, borderRadius: 12,
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0
                                }}>{item.img}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, color: C.sub }}>{item.brand}</div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 6 }}>{item.name}</div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontWeight: 700, color: C.primary }}>฿{item.price}</span>
                                        <div style={{ display: "flex", alignItems: "center", gap: 0, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                                            <div onClick={() => updateQty(item.id, -1)} style={{ padding: "4px 10px", cursor: "pointer" }}>
                                                <Icon name="minus" size={12} color={C.text} />
                                            </div>
                                            <span style={{ padding: "4px 6px", fontSize: 13, fontWeight: 700 }}>{item.qty}</span>
                                            <div onClick={() => updateQty(item.id, 1)} style={{ padding: "4px 10px", cursor: "pointer", background: C.primaryLight }}>
                                                <Icon name="plus" size={12} color={C.primary} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => remove(item.id)} style={{ cursor: "pointer", padding: 4 }}>
                                    <Icon name="trash" size={18} color="#CCC" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coupon */}
                    <div style={{ margin: "0 16px 12px", background: "white", borderRadius: 16, padding: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🎟️ คูปองส่วนลด</div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <input value={coupon} onChange={e => setCoupon(e.target.value)}
                                placeholder="ใส่รหัสคูปอง"
                                style={{
                                    flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 10,
                                    padding: "10px 14px", fontSize: 13, fontFamily: "'Sarabun',sans-serif",
                                    outline: "none", color: C.text
                                }} />
                            <div style={{
                                background: C.primary, color: "white", borderRadius: 10,
                                padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap"
                            }}>ตรวจสอบ</div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div style={{ margin: "0 16px 16px", background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>สรุปคำสั่งซื้อ</div>
                        {[
                            ["ราคารวม", `฿${total.toFixed(2)}`],
                            ["ส่วนลด", `-฿${discount.toFixed(2)}`],
                            ["ค่าจัดส่ง", "ฟรี 🎉"],
                        ].map(([k, v]) => (
                            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: C.sub }}>
                                <span>{k}</span>
                                <span style={{ color: k === "ส่วนลด" ? C.secondary : C.text, fontWeight: k === "ค่าจัดส่ง" ? 600 : 400 }}>{v}</span>
                            </div>
                        ))}
                        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: 700, fontSize: 15 }}>ยอดรวมทั้งหมด</span>
                            <span style={{ fontWeight: 700, fontSize: 17, color: C.primary }}>฿{(total - discount).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Checkout btn */}
                    <div style={{ padding: "0 16px" }}>
                        <div onClick={() => setScreen("checkout")} style={{
                            background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`,
                            color: "white", borderRadius: 16, padding: 16,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 15,
                            cursor: "pointer", boxShadow: `0 8px 24px ${C.primary}44`
                        }}>
                            ดำเนินการชำระเงิน →
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// ─── SCREEN: CHECKOUT ─────────────────────────────────────────────────────────
const CheckoutScreen = ({ cart, setScreen, setCart }) => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = Math.floor(total * 0.11);
    const [confirmed, setConfirmed] = useState(false);

    if (confirmed) return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 32, background: C.bg }}>
            <div style={{ fontSize: 72 }}>🎉</div>
            <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 22, color: C.text, textAlign: "center" }}>ชำระเงินสำเร็จ!</div>
            <div style={{ fontSize: 14, color: C.sub, textAlign: "center" }}>คำสั่งซื้อของคุณกำลังดำเนินการ<br />จะจัดส่งภายใน 2 ชั่วโมง</div>
            <div style={{ background: "white", borderRadius: 20, padding: 20, width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.sub, marginBottom: 8 }}>
                    <span>หมายเลขคำสั่งซื้อ</span>
                    <span style={{ color: C.primary, fontWeight: 700 }}>#ORDER{Date.now().toString().slice(-6)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.sub }}>
                    <span>ยอดที่ชำระ</span>
                    <span style={{ color: C.text, fontWeight: 700 }}>฿{(total - discount).toFixed(2)}</span>
                </div>
            </div>
            <div onClick={() => { setCart([]); setScreen("orders"); }} style={{
                background: C.primary, color: "white", padding: "14px 36px", borderRadius: 14,
                fontWeight: 700, cursor: "pointer", fontSize: 15
            }}>ดูคำสั่งซื้อ</div>
        </div>
    );

    return (
        <div style={{ paddingBottom: 80 }}>
            <TopBar title="ชำระเงิน" back onBack={() => setScreen("cart")} />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Address */}
                <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>📍 ที่อยู่จัดส่ง</div>
                    <div style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>คณดี ครับผม</div>
                    <div style={{ fontSize: 12, color: C.sub, marginTop: 4, lineHeight: 1.6 }}>123 ถนนสุขุมวิท แขวงคลองตัน<br />เขตคลองเตย กรุงเทพฯ 10110</div>
                    <div style={{ marginTop: 8, color: C.primary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>เปลี่ยนที่อยู่ →</div>
                </div>

                {/* Payment QR */}
                <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>💳 การชำระเงิน</div>
                    <div style={{ background: C.bg, borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                        <div style={{ fontSize: 11, color: C.sub, fontWeight: 600 }}>สแกน QR Code ผ่าน PromptPay</div>
                        {/* QR simulation */}
                        <div style={{
                            width: 120, height: 120, background: "white", borderRadius: 12,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.1)", fontSize: 11, color: C.sub,
                            flexDirection: "column", gap: 4
                        }}>
                            <Icon name="qr" size={64} color={C.text} />
                            <span style={{ fontSize: 10, color: C.sub }}>QR PromptPay</span>
                        </div>
                        <div style={{ fontSize: 12, color: C.sub, textAlign: "center" }}>กรุณาสแกนรหัส QR โดยใช้แอปธนาคาร<br />ที่รองรับ เพื่อดำเนินการชำระต่อไป</div>
                    </div>
                </div>

                {/* Order items */}
                <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🛍️ สรุปสินค้า</div>
                    {cart.map(item => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                            <span style={{ color: C.sub }}>{item.img} {item.name} x{item.qty}</span>
                            <span style={{ fontWeight: 600 }}>฿{(item.price * item.qty).toFixed(2)}</span>
                        </div>
                    ))}
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 4 }}>
                        {[["ราคารวม", `฿${total.toFixed(2)}`], ["ส่วนลด", `-฿${discount.toFixed(2)}`], ["ค่าจัดส่ง", "ฟรี"]].map(([k, v]) => (
                            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.sub, marginBottom: 6 }}>
                                <span>{k}</span>
                                <span style={{ color: k === "ส่วนลด" ? C.secondary : C.text }}>{v}</span>
                            </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15, marginTop: 6 }}>
                            <span>ยอดรวม</span>
                            <span style={{ color: C.primary }}>฿{(total - discount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div onClick={() => setConfirmed(true)} style={{
                    background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`,
                    color: "white", borderRadius: 16, padding: 16, textAlign: "center",
                    fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 15,
                    cursor: "pointer", boxShadow: `0 8px 24px ${C.primary}44`
                }}>
                    ✅ แนะนำหลักฐานการโอนเงิน
                </div>
            </div>
        </div>
    );
};

// ─── SCREEN: ORDERS ───────────────────────────────────────────────────────────
const OrdersScreen = () => {
    const [tab, setTab] = useState("สำเร็จแล้ว");
    const tabs = ["สำเร็จแล้ว", "อยู่ระหว่างดำเนินการ", "ยกเลิกแล้ว"];
    return (
        <div style={{ paddingBottom: 80 }}>
            <TopBar title="คำสั่งซื้อของฉัน" />
            <div style={{ display: "flex", background: "white", borderBottom: `1px solid ${C.border}` }}>
                {tabs.map(t => (
                    <div key={t} onClick={() => setTab(t)} style={{
                        flex: 1, textAlign: "center", padding: "12px 4px", fontSize: 11,
                        fontWeight: tab === t ? 700 : 400,
                        color: tab === t ? C.primary : C.sub,
                        borderBottom: tab === t ? `2.5px solid ${C.primary}` : "2.5px solid transparent",
                        cursor: "pointer", transition: "all 0.2s"
                    }}>{t}</div>
                ))}
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {orders.map(o => (
                    <div key={o.id} style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <span style={{ fontWeight: 700, color: C.primary, fontSize: 13 }}>{o.id}</span>
                            <span style={{
                                background: o.status === "จัดส่งแล้ว" ? "#E8F9F1" : C.primaryLight,
                                color: o.status === "จัดส่งแล้ว" ? C.secondary : C.primary,
                                padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700
                            }}>{o.status}</span>
                        </div>
                        <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>{o.items}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 12, color: "#BBB" }}>📅 {o.date}</span>
                            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>฿{o.price}</span>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            <div style={{
                                flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 10,
                                padding: "8px", textAlign: "center", fontSize: 12, fontWeight: 600,
                                color: C.sub, cursor: "pointer"
                            }}>ดูรายละเอียด</div>
                            {o.status === "จัดส่งแล้ว" && (
                                <div style={{
                                    flex: 1, background: C.primaryLight, borderRadius: 10,
                                    padding: "8px", textAlign: "center", fontSize: 12, fontWeight: 600,
                                    color: C.primary, cursor: "pointer"
                                }}>สั่งอีกครั้ง</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── SCREEN: PROFILE ──────────────────────────────────────────────────────────
const ProfileScreen = ({ setScreen }) => (
    <div style={{ paddingBottom: 80 }}>
        <TopBar title="บัญชีของฉัน" />
        {/* Profile header */}
        <div style={{
            background: `linear-gradient(135deg,${C.primary},#FF9A5C)`,
            padding: "24px 20px 32px", color: "white"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                    width: 64, height: 64, background: "rgba(255,255,255,0.3)", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28
                }}>😊</div>
                <div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 18 }}>คณดี ครับผม</div>
                    <div style={{ fontSize: 13, opacity: 0.85 }}>คนดี@email.com</div>
                </div>
            </div>
        </div>

        {/* Points card */}
        <div style={{ margin: "-20px 16px 0", background: "white", borderRadius: 20, padding: 18, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontSize: 11, color: C.sub, fontWeight: 600 }}>🏆 คะแนนสะสม MaMa Market</div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontSize: 28, fontWeight: 700, color: C.primary }}>200 pts</div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: C.sub }}>ระดับสมาชิก</div>
                    <div style={{ fontWeight: 700, color: C.secondary, fontSize: 14 }}>🥈 Silver</div>
                    <div style={{ fontSize: 10, color: "#BBB", marginTop: 2 }}>10/25 ออเดอร์</div>
                </div>
            </div>
            <div style={{ background: C.bg, borderRadius: 8, height: 6, marginTop: 12 }}>
                <div style={{ background: `linear-gradient(90deg,${C.primary},#FF9A5C)`, height: "100%", borderRadius: 8, width: "40%" }} />
            </div>
        </div>

        {/* Menu */}
        <div style={{ padding: "16px 16px 0" }}>
            {[
                { icon: "📦", label: "คำสั่งซื้อของฉัน", sub: "3 คำสั่งซื้อ", action: () => { } },
                { icon: "📍", label: "ที่อยู่จัดส่ง", sub: "1 ที่อยู่", action: () => { } },
                { icon: "❤️", label: "รายการโปรด", sub: "5 สินค้า", action: () => { } },
                { icon: "💳", label: "วิธีการชำระเงิน", sub: "PromptPay", action: () => { } },
                { icon: "🔔", label: "การแจ้งเตือน", sub: "เปิดอยู่", action: () => { } },
                { icon: "🏪", label: "หน้าร้านค้า (แอดมิน)", sub: "จัดการออเดอร์", action: () => { } },
            ].map(m => (
                <div key={m.label} onClick={m.action} style={{
                    background: "white", borderRadius: 14, padding: "14px 16px",
                    display: "flex", alignItems: "center", gap: 12, marginBottom: 8,
                    cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.04)"
                }}>
                    <div style={{ fontSize: 22, width: 32, textAlign: "center" }}>{m.icon}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{m.label}</div>
                        <div style={{ fontSize: 12, color: C.sub, marginTop: 1 }}>{m.sub}</div>
                    </div>
                    <Icon name="chevron" size={16} color="#DDD" />
                </div>
            ))}
        </div>
    </div>
);

// ─── STORE ORDERS SCREEN ──────────────────────────────────────────────────────
const StoreScreen = () => (
    <div style={{ paddingBottom: 80 }}>
        <TopBar title="🏪 จัดการออเดอร์" />
        <div style={{ padding: 16 }}>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[
                    { label: "ออเดอร์วันนี้", val: "24", icon: "📦", bg: "#FFF0EB" },
                    { label: "กำลังจัดส่ง", val: "8", icon: "🚚", bg: "#FFF9E6" },
                    { label: "สำเร็จแล้ว", val: "14", icon: "✅", bg: "#EAFAF1" },
                    { label: "ยอดขายรวม", val: "฿12.4k", icon: "💰", bg: "#EBF5FB" },
                ].map(s => (
                    <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: 14 }}>
                        <div style={{ fontSize: 22 }}>{s.icon}</div>
                        <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 20, marginTop: 4 }}>{s.val}</div>
                        <div style={{ fontSize: 11, color: C.sub }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, fontFamily: "'Prompt',sans-serif" }}>รายการคำสั่งซื้อล่าสุด</div>
            {storeOrders.map((o, i) => (
                <div key={i} style={{ background: "white", borderRadius: 16, padding: 14, marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{o.customer}</div>
                        <span style={{
                            background: o.status === "กำลังจัดส่ง" ? C.primaryLight : o.status === "ยกเลิกออเดอร์" ? "#FFEBEB" : "#F5F5F5",
                            color: o.color, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700
                        }}>{o.status}</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>{o.products}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#BBB" }}>{o.time}</span>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>฿{o.price}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                        <div style={{ flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "7px", textAlign: "center", fontSize: 11, fontWeight: 600, color: C.sub, cursor: "pointer" }}>ยกเลิก</div>
                        <div style={{ flex: 2, background: C.primary, borderRadius: 8, padding: "7px", textAlign: "center", fontSize: 11, fontWeight: 700, color: "white", cursor: "pointer" }}>จัดส่งสินค้าแล้ว</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ─── SEARCH SCREEN ────────────────────────────────────────────────────────────
const SearchScreen = ({ setScreen, setSelectedProduct }) => {
    const [q, setQ] = useState("");
    const results = q.length > 0 ? products.filter(p => p.name.includes(q) || p.brand.includes(q) || p.cat.includes(q)) : [];
    const popular = ["ข้าวสาร", "ผักสด", "เนื้อหมู", "น้ำดื่ม", "ไข่ไก่", "ผลไม้"];
    return (
        <div style={{ paddingBottom: 80 }}>
            <div style={{ padding: "52px 16px 12px", background: "white", position: "sticky", top: 0, zIndex: 99, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 12 }}>ค้นหาสินค้า</div>
                <div style={{ background: C.bg, borderRadius: 14, display: "flex", alignItems: "center", padding: "11px 16px", gap: 8 }}>
                    <Icon name="search" size={16} color={C.sub} />
                    <input value={q} onChange={e => setQ(e.target.value)}
                        placeholder="ค้นหาสินค้า ผัก ผลไม้ อาหารสด..."
                        style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13, fontFamily: "'Sarabun',sans-serif", color: C.text }}
                        autoFocus />
                </div>
            </div>
            <div style={{ padding: 16 }}>
                {q.length === 0 ? (
                    <>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🔥 ค้นหายอดนิยม</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                            {popular.map(w => (
                                <div key={w} onClick={() => setQ(w)} style={{
                                    background: "white", border: `1px solid ${C.border}`, borderRadius: 20,
                                    padding: "7px 16px", fontSize: 13, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                                }}>{w}</div>
                            ))}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🆕 สินค้าใหม่</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {products.slice(0, 4).map(p => (
                                <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); setScreen("detail"); }} />
                            ))}
                        </div>
                    </>
                ) : results.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: C.sub }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                        <div style={{ fontSize: 14 }}>ไม่พบสินค้า "{q}"</div>
                    </div>
                ) : (
                    <>
                        <div style={{ fontSize: 13, color: C.sub, marginBottom: 12 }}>พบ {results.length} รายการ</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {results.map(p => (
                                <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); setScreen("detail"); }} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
    const [screen, setScreen] = useState("home");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);

    const addToCart = (product, qty) => {
        setCart(c => {
            const ex = c.find(i => i.id === product.id);
            if (ex) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
            return [...c, { ...product, qty }];
        });
    };

    const cartCount = cart.reduce((s, i) => s + i.qty, 0);

    const showNav = !["detail", "checkout"].includes(screen);

    return (
        <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Sarabun',sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&family=Prompt:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin:0; padding:0; }
        input { font-family: 'Sarabun', sans-serif; }
        html, body, #root { height: 100%; }
        /* Desktop: show phone frame */
        @media (min-width: 500px) {
          .app-shell {
            width: 390px !important;
            height: 844px !important;
            border-radius: 44px !important;
            box-shadow: 0 40px 100px rgba(0,0,0,0.35), 0 0 0 12px #1A1A1A, 0 0 0 14px #333 !important;
            overflow: hidden !important;
          }
          .app-notch { display: block !important; }
          .app-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #E8E8E8;
            padding: 20px 0;
          }
        }
        /* Mobile: full screen */
        @media (max-width: 499px) {
          .app-shell {
            width: 100vw !important;
            height: 100dvh !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .app-notch { display: none !important; }
          .app-wrapper {
            background: ${C.bg};
          }
        }
        .app-scroll { height:100%; overflow-y:auto; overflow-x:hidden; scrollbar-width:none; }
        .app-scroll::-webkit-scrollbar { display:none; }
      `}</style>
            <div className="app-wrapper">
                <div className="app-shell" style={{ background: C.bg, position: "relative" }}>
                    {/* Notch (desktop only) */}
                    <div className="app-notch" style={{
                        display: "none",
                        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                        width: 120, height: 32, background: "#1A1A1A", borderRadius: "0 0 20px 20px",
                        zIndex: 999
                    }} />

                    {/* Screen content */}
                    <div className="app-scroll">
                        {screen === "home" && <HomeScreen setScreen={setScreen} setSelectedProduct={setSelectedProduct} cartCount={cartCount} />}
                        {screen === "search" && <SearchScreen setScreen={setScreen} setSelectedProduct={setSelectedProduct} />}
                        {screen === "detail" && <DetailScreen product={selectedProduct} setScreen={setScreen} addToCart={addToCart} />}
                        {screen === "cart" && <CartScreen cart={cart} setCart={setCart} setScreen={setScreen} />}
                        {screen === "checkout" && <CheckoutScreen cart={cart} setScreen={setScreen} setCart={setCart} />}
                        {screen === "orders" && <OrdersScreen />}
                        {screen === "profile" && <ProfileScreen setScreen={setScreen} />}
                        {screen === "store" && <StoreScreen />}
                    </div>

                    {/* Bottom nav */}
                    {showNav && <BottomNav screen={screen} setScreen={setScreen} />}
                </div>
            </div>
        </div>
    );
}