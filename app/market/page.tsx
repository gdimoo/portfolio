"use client";
import { useState } from "react";

const C = {
    primary: "#FF6B35", primaryDark: "#E5501A", primaryLight: "#FFF0EB",
    secondary: "#2DBD76", secondaryLight: "#E8F9F1",
    bg: "#F9F6F2", text: "#1A1A1A", sub: "#7A7A7A", border: "#EFEFEF",
};

const categories = ["ทั้งหมด", "อาหารสด", "ผัก-ผลไม้", "เนื้อสัตว์", "ของแห้ง", "เครื่องดื่ม", "ขนม"];

const PRODUCTS = [
    { id: 1, name: "ข้าวหอมมะลิ 5 กก.", brand: "ข้าวดี", price: 189, oldPrice: 220, img: "🌾", tag: "ลด 14%", rating: 4.8, reviews: 312, cat: "ของแห้ง" },
    { id: 2, name: "น้ำมันมะพร้าว 500ml", brand: "ออร์แกนิก", price: 129, oldPrice: 160, img: "🥥", tag: "ลด 19%", rating: 4.6, reviews: 198, cat: "ของแห้ง" },
    { id: 3, name: "มะเขือเทศราชินี", brand: "ฟาร์มสด", price: 45, oldPrice: null, img: "🍅", tag: "สดใหม่", rating: 4.9, reviews: 87, cat: "ผัก-ผลไม้" },
    { id: 4, name: "เนื้อหมูสามชั้น 500g", brand: "ฟาร์มไทย", price: 110, oldPrice: 130, img: "🥩", tag: "ลด 15%", rating: 4.7, reviews: 145, cat: "เนื้อสัตว์" },
    { id: 5, name: "น้ำส้มคั้นสด 1L", brand: "โอเค ฟรุ๊ต", price: 79, oldPrice: 95, img: "🍊", tag: "HOT", rating: 4.5, reviews: 221, cat: "เครื่องดื่ม" },
    { id: 6, name: "ไข่ไก่ 30 ฟอง", brand: "ไข่ดีฟาร์ม", price: 135, oldPrice: 150, img: "🥚", tag: "ขายดี", rating: 4.8, reviews: 534, cat: "อาหารสด" },
    { id: 7, name: "แอปเปิ้ลฟูจิ 1 กก.", brand: "นำเข้า", price: 99, oldPrice: 120, img: "🍎", tag: "ลด 17%", rating: 4.6, reviews: 76, cat: "ผัก-ผลไม้" },
    { id: 8, name: "นมสด UHT 1L x6", brand: "ดอยคำ", price: 165, oldPrice: 180, img: "🥛", tag: "แพ็คคุ้ม", rating: 4.7, reviews: 289, cat: "เครื่องดื่ม" },
];

const INIT_ADDRESSES = [
    { id: 1, label: "🏠 บ้าน", name: "คณดี ครับผม", phone: "081-234-5678", detail: "123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110", isDefault: true },
    { id: 2, label: "🏢 ที่ทำงาน", name: "คณดี ครับผม", phone: "081-234-5678", detail: "456 ถนนพระราม 4 แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330", isDefault: false },
];

const INIT_ORDERS = [
    { id: "#874522648", items: "ข้าวหอมมะลิ, น้ำส้มคั้นสด, ไข่ไก่", price: 403, date: "02/02/2025", status: "กำลังจัดส่ง" },
    { id: "#874511200", items: "เนื้อหมูสามชั้น, มะเขือเทศราชินี", price: 155, date: "29/01/2025", status: "จัดส่งแล้ว" },
    { id: "#874490033", items: "นมสด UHT x6, แอปเปิ้ลฟูจิ", price: 264, date: "20/01/2025", status: "จัดส่งแล้ว" },
];

const storeOrders = [
    { customer: "อัญชลี ศรีสุข", products: "ข้าวหอมมะลิ, น้ำส้มคั้น", price: "3,638", status: "กำลังจัดส่ง", time: "2025-02-05 08:28", color: "#FF6B35" },
    { customer: "บุญคุณ อินทร์แสง", products: "ชาน้ำแข็ง, หน้าหมูกรอบ", price: "6,462", status: "ยังไม่ชำระ", time: "2025-02-03 19:49", color: "#999" },
    { customer: "ธนวัฒน์ พักพิมสมปัติ", products: "ยาแก้ไอ, ผ้าพันแผล", price: "8,664", status: "ยกเลิกออเดอร์", time: "2025-02-02 19:17", color: "#E53935" },
    { customer: "กิติพงษ์ อรุณโยค", products: "ตำมันรวม, น้ำเสาวรส", price: "2,592", status: "กำลังจัดส่ง", time: "2025-02-02 09:46", color: "#FF6B35" },
];

const Icon = ({ name, size = 20, color = "#1A1A1A" }) => {
    const paths = {
        home: <><path d="M3 12L12 3l9 9" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" /><path d="M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9" stroke={color} strokeWidth="2" fill="none" /></>,
        search: <><circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" /><path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" /></>,
        cart: <><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={color} strokeWidth="2" fill="none" /><line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" /><path d="M16 10a4 4 0 01-8 0" stroke={color} strokeWidth="2" fill="none" /></>,
        user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" fill="none" /><circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" /></>,
        orders: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={color} strokeWidth="2" fill="none" /><rect x="9" y="3" width="6" height="4" rx="1" stroke={color} strokeWidth="2" fill="none" /><path d="M9 12h6M9 16h4" stroke={color} strokeWidth="2" strokeLinecap="round" /></>,
        chevron: <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />,
        back: <path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />,
        plus: <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />,
        minus: <path d="M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />,
        trash: <><polyline points="3 6 5 6 21 6" stroke={color} strokeWidth="2" fill="none" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke={color} strokeWidth="2" fill="none" /></>,
        bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" fill="none" /><path d="M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth="2" fill="none" /></>,
        star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={color} strokeWidth="1.5" fill={color} />,
        check: <polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />,
        close: <><line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" /></>,
        qr: <><rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" /><rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" /><rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" /><rect x="5" y="5" width="3" height="3" fill={color} /><rect x="16" y="5" width="3" height="3" fill={color} /><rect x="5" y="16" width="3" height="3" fill={color} /><path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" stroke={color} strokeWidth="1.5" fill="none" /></>,
        heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" stroke={color} strokeWidth="2" fill="none" />,
    };
    return <svg width={size} height={size} viewBox="0 0 24 24">{paths[name]}</svg>;
};

const TopBar = ({ title, back, onBack, right }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 20px 14px", background: "white", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 99 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {back && <div onClick={onBack} style={{ cursor: "pointer", padding: 4 }}><Icon name="back" size={22} /></div>}
            <span style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 17, color: C.text }}>{title}</span>
        </div>
        {right}
    </div>
);

const Btn = ({ children, onClick, style = {} }) => (
    <div onClick={onClick} style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "white", borderRadius: 14, padding: "13px 20px", textAlign: "center", fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: `0 6px 18px ${C.primary}44`, ...style }}>{children}</div>
);

const BottomNav = ({ screen, setScreen, cartCount }) => {
    const tabs = [
        { id: "home", label: "หน้าหลัก", icon: "home" },
        { id: "search", label: "ค้นหา", icon: "search" },
        { id: "cart", label: "ตะกร้า", icon: "cart" },
        { id: "orders", label: "คำสั่งซื้อ", icon: "orders" },
        { id: "profile", label: "บัญชี", icon: "user" },
    ];
    return (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "white", borderTop: `1px solid ${C.border}`, display: "flex", padding: "8px 0 20px", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)", zIndex: 100 }}>
            {tabs.map(t => (
                <div key={t.id} onClick={() => setScreen(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
                    <div style={{ position: "relative" }}>
                        <Icon name={t.icon} size={22} color={screen === t.id ? C.primary : "#BBBBBB"} />
                        {t.id === "cart" && cartCount > 0 && <div style={{ position: "absolute", top: -5, right: -6, background: C.primary, color: "white", borderRadius: "50%", width: 15, height: 15, fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</div>}
                    </div>
                    <span style={{ fontSize: 10, color: screen === t.id ? C.primary : "#BBBBBB", fontWeight: screen === t.id ? 600 : 400 }}>{t.label}</span>
                    {screen === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.primary, marginTop: -2 }} />}
                </div>
            ))}
        </div>
    );
};

// ─── ADDRESS MODAL ────────────────────────────────────────────────────────────
const AddressModal = ({ addr, onSave, onClose }) => {
    const [form, setForm] = useState(addr || { label: "🏠 บ้าน", name: "", phone: "", detail: "", isDefault: false });
    const labels = ["🏠 บ้าน", "🏢 ที่ทำงาน", "📍 อื่นๆ"];
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const valid = form.name.trim() && form.phone.trim() && form.detail.trim();
    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div style={{ background: "white", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 390, padding: "24px 20px 40px", maxHeight: "90vh", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 17 }}>{addr ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}</span>
                    <div onClick={onClose} style={{ cursor: "pointer" }}><Icon name="close" size={22} color={C.sub} /></div>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    {labels.map(l => (
                        <div key={l} onClick={() => set("label", l)} style={{ flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: 10, border: `1.5px solid ${form.label === l ? C.primary : C.border}`, background: form.label === l ? C.primaryLight : "white", fontSize: 12, fontWeight: 600, color: form.label === l ? C.primary : C.sub, cursor: "pointer" }}>{l}</div>
                    ))}
                </div>
                {[{ key: "name", label: "ชื่อ-นามสกุล", placeholder: "คณดี ครับผม", type: "text" }, { key: "phone", label: "เบอร์โทรศัพท์", placeholder: "081-234-5678", type: "tel" }].map(f => (
                    <div key={f.key} style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.sub, marginBottom: 6 }}>{f.label}</div>
                        <input value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} type={f.type} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, outline: "none", color: C.text }} />
                    </div>
                ))}
                <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.sub, marginBottom: 6 }}>ที่อยู่</div>
                    <textarea value={form.detail} onChange={e => set("detail", e.target.value)} placeholder="บ้านเลขที่ ถนน แขวง เขต จังหวัด รหัสไปรษณีย์" rows={3} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, outline: "none", resize: "none", color: C.text }} />
                </div>
                <div onClick={() => set("isDefault", !form.isDefault)} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, cursor: "pointer" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${form.isDefault ? C.primary : C.border}`, background: form.isDefault ? C.primary : "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {form.isDefault && <Icon name="check" size={12} color="white" />}
                    </div>
                    <span style={{ fontSize: 13, color: C.text }}>ตั้งเป็นที่อยู่หลัก</span>
                </div>
                <Btn onClick={() => valid && onSave(form)} style={{ opacity: valid ? 1 : 0.5 }}>บันทึกที่อยู่</Btn>
            </div>
        </div>
    );
};

// ─── ADDRESS SCREEN ───────────────────────────────────────────────────────────
const AddressScreen = ({ addresses, setAddresses, onBack, onSelect, selectMode = false }) => {
    const [showForm, setShowForm] = useState(false);
    const [editAddr, setEditAddr] = useState(null);

    const handleSave = (form) => {
        if (editAddr) {
            setAddresses(a => a.map(x => {
                if (x.id === editAddr.id) return { ...form, id: x.id };
                if (form.isDefault) return { ...x, isDefault: false };
                return x;
            }));
        } else {
            setAddresses(a => {
                const base = form.isDefault ? a.map(x => ({ ...x, isDefault: false })) : [...a];
                return [...base, { ...form, id: Date.now() }];
            });
        }
        setShowForm(false); setEditAddr(null);
    };

    return (
        <div style={{ paddingBottom: 100 }}>
            <TopBar title={selectMode ? "เลือกที่อยู่จัดส่ง" : "ที่อยู่จัดส่ง"} back onBack={onBack} right={
                <div onClick={() => { setEditAddr(null); setShowForm(true); }} style={{ background: C.primaryLight, color: C.primary, borderRadius: 10, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ เพิ่ม</div>
            } />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {addresses.length === 0 && (
                    <div style={{ textAlign: "center", padding: "60px 0", color: C.sub }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>📍</div>
                        <div>ยังไม่มีที่อยู่ กดเพิ่มได้เลย</div>
                    </div>
                )}
                {addresses.map(addr => (
                    <div key={addr.id} style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: addr.isDefault ? `2px solid ${C.primary}` : "2px solid transparent", cursor: selectMode ? "pointer" : "default" }} onClick={() => selectMode && onSelect && onSelect(addr)}>
                        <div style={{ display: "flex", alignItems: "flex-start" }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontWeight: 700, fontSize: 14 }}>{addr.label}</span>
                                    {addr.isDefault && <span style={{ background: C.primaryLight, color: C.primary, borderRadius: 6, padding: "1px 8px", fontSize: 10, fontWeight: 700 }}>หลัก</span>}
                                </div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{addr.name}</div>
                                <div style={{ fontSize: 12, color: C.sub, marginBottom: 2 }}>{addr.phone}</div>
                                <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.6 }}>{addr.detail}</div>
                            </div>
                            {selectMode && addr.isDefault && <Icon name="check" size={20} color={C.primary} />}
                        </div>
                        {!selectMode && (
                            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                                {!addr.isDefault && <div onClick={() => setAddresses(a => a.map(x => ({ ...x, isDefault: x.id === addr.id })))} style={{ flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "8px", textAlign: "center", fontSize: 12, fontWeight: 600, color: C.sub, cursor: "pointer" }}>ตั้งเป็นหลัก</div>}
                                <div onClick={() => { setEditAddr(addr); setShowForm(true); }} style={{ flex: 1, background: C.primaryLight, borderRadius: 10, padding: "8px", textAlign: "center", fontSize: 12, fontWeight: 600, color: C.primary, cursor: "pointer" }}>✏️ แก้ไข</div>
                                <div onClick={() => setAddresses(a => a.filter(x => x.id !== addr.id))} style={{ width: 40, background: "#FFEBEB", borderRadius: 10, padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Icon name="trash" size={16} color="#E53935" /></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showForm && <AddressModal addr={editAddr} onSave={handleSave} onClose={() => { setShowForm(false); setEditAddr(null); }} />}
        </div>
    );
};

// ─── HOME ─────────────────────────────────────────────────────────────────────
const HomeScreen = ({ setScreen, setSelectedProduct, cartCount, addresses, addToCart }) => {
    const [activeCat, setActiveCat] = useState("ทั้งหมด");
    const filtered = activeCat === "ทั้งหมด" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);
    const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
    return (
        <div style={{ paddingBottom: 88 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 20px 14px", background: "white", position: "sticky", top: 0, zIndex: 99 }}>
                <div onClick={() => setScreen("address-select")} style={{ cursor: "pointer" }}>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontSize: 11, color: C.sub }}>ส่งถึง</div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 15, color: C.text, display: "flex", alignItems: "center", gap: 4 }}>
                        📍 {defaultAddr ? defaultAddr.label : "เลือกที่อยู่"}
                        <Icon name="chevron" size={14} color={C.primary} />
                    </div>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setScreen("cart")}>
                        <Icon name="cart" size={22} color={C.text} />
                        {cartCount > 0 && <div style={{ position: "absolute", top: -6, right: -6, background: C.primary, color: "white", borderRadius: "50%", width: 16, height: 16, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</div>}
                    </div>
                    <Icon name="bell" size={22} color={C.text} />
                </div>
            </div>
            <div style={{ padding: "0 16px 12px", background: "white" }}>
                <div onClick={() => setScreen("search")} style={{ background: C.bg, borderRadius: 14, display: "flex", alignItems: "center", padding: "11px 16px", gap: 8, cursor: "pointer" }}>
                    <Icon name="search" size={16} color={C.sub} /><span style={{ color: "#BBBBBB", fontSize: 13 }}>ค้นหาสินค้า ผัก ผลไม้ อาหารสด...</span>
                </div>
            </div>
            <div style={{ padding: "0 16px 20px" }}>
                <div style={{ background: `linear-gradient(135deg,${C.primary},#FF9A5C)`, borderRadius: 20, padding: "22px 20px", color: "white", position: "relative", overflow: "hidden", minHeight: 130 }}>
                    <div style={{ position: "absolute", right: -10, bottom: -10, fontSize: 80, opacity: 0.15 }}>🛒</div>
                    <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", fontSize: 52 }}>🥬🍎🥩</div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontSize: 11, opacity: 0.85, marginBottom: 4 }}>โปรโมชันพิเศษ ทุกวันศุกร์</div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontSize: 28, fontWeight: 700, lineHeight: 1.1 }}>ลดสูงสุด<br /><span style={{ fontSize: 36 }}>70%</span></div>
                    <div style={{ marginTop: 10 }}><span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 600 }}>ช้อปเลย →</span></div>
                </div>
            </div>
            <div style={{ marginBottom: 4 }}>
                <div style={{ paddingLeft: 16, fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>หมวดหมู่สินค้า</div>
                <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 16px 4px", scrollbarWidth: "none" }}>
                    {categories.map(c => (
                        <div key={c} onClick={() => setActiveCat(c)} style={{ whiteSpace: "nowrap", padding: "8px 16px", borderRadius: 20, background: activeCat === c ? C.primary : "white", color: activeCat === c ? "white" : C.sub, fontWeight: activeCat === c ? 600 : 400, fontSize: 13, cursor: "pointer", border: `1px solid ${activeCat === c ? C.primary : C.border}`, flexShrink: 0 }}>{c}</div>
                    ))}
                </div>
            </div>
            <div style={{ padding: "16px 16px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 15 }}>รายการสินค้า</span>
                    <span style={{ fontSize: 12, color: C.sub }}>{filtered.length} รายการ</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {filtered.map(p => (
                        <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); setScreen("detail"); }} onQuickAdd={() => addToCart(p, 1)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product: p, onClick, onQuickAdd }) => (
    <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
        <div onClick={onClick} style={{ background: C.bg, height: 130, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, position: "relative", cursor: "pointer" }}>
            {p.img}
            <div style={{ position: "absolute", top: 8, left: 8, background: p.tag === "สดใหม่" ? C.secondary : p.tag === "HOT" ? "#FF3B3B" : C.primary, color: "white", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>{p.tag}</div>
        </div>
        <div onClick={onClick} style={{ padding: "10px 12px 12px", cursor: "pointer" }}>
            <div style={{ fontSize: 12, color: C.sub, marginBottom: 2 }}>{p.brand}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3, marginBottom: 6 }}>{p.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 8 }}>
                <Icon name="star" size={11} color="#FFAA00" /><span style={{ fontSize: 11, color: C.sub }}>{p.rating} ({p.reviews})</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.primary }}>฿{p.price}</span>
                    {p.oldPrice && <span style={{ fontSize: 11, color: "#BBBBBB", textDecoration: "line-through", marginLeft: 4 }}>฿{p.oldPrice}</span>}
                </div>
                <div onClick={e => { e.stopPropagation(); onQuickAdd(); }} style={{ background: C.primary, borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Icon name="plus" size={14} color="white" />
                </div>
            </div>
        </div>
    </div>
);

// ─── DETAIL ───────────────────────────────────────────────────────────────────
const DetailScreen = ({ product: p, setScreen, addToCart }) => {
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    if (!p) { setScreen("home"); return null; }
    const handleAdd = () => { addToCart(p, qty); setAdded(true); setTimeout(() => setAdded(false), 1500); };
    return (
        <div style={{ paddingBottom: 100 }}>
            <div style={{ display: "flex", alignItems: "center", padding: "52px 20px 14px", background: "white", position: "sticky", top: 0, zIndex: 99, gap: 10 }}>
                <div onClick={() => setScreen("home")} style={{ cursor: "pointer" }}><Icon name="back" size={22} /></div>
                <span style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 17 }}>รายละเอียดสินค้า</span>
            </div>
            <div style={{ background: `linear-gradient(180deg,${C.bg},white)`, height: 220, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90, position: "relative" }}>
                {p.img}
                <div style={{ position: "absolute", top: 14, left: 16, background: p.tag === "สดใหม่" ? C.secondary : C.primary, color: "white", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{p.tag}</div>
            </div>
            <div style={{ padding: "20px 20px 0", background: "white" }}>
                <div style={{ fontSize: 13, color: C.sub, marginBottom: 4 }}>{p.brand}</div>
                <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                    {[1, 2, 3, 4, 5].map(s => <Icon key={s} name="star" size={14} color={s <= Math.floor(p.rating) ? "#FFAA00" : "#EEE"} />)}
                    <span style={{ fontSize: 13, color: C.sub }}>{p.rating} · {p.reviews} รีวิว</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Prompt',sans-serif", fontSize: 28, fontWeight: 700, color: C.primary }}>฿{p.price}</span>
                    {p.oldPrice && <><span style={{ fontSize: 16, color: "#BBBBBB", textDecoration: "line-through" }}>฿{p.oldPrice}</span><span style={{ background: C.primaryLight, color: C.primaryDark, padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>ลด {Math.round((1 - p.price / p.oldPrice) * 100)}%</span></>}
                </div>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>รายละเอียดสินค้า</div>
                    <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.8 }}>สินค้าคุณภาพดี คัดสรรจากแหล่งผลิตโดยตรง ผ่านมาตรฐานความสะอาดและความปลอดภัย เหมาะสำหรับการบริโภคในครัวเรือน</div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                    {["🚚 ส่งเร็ว 2 ชม.", "✅ คุณภาพรับรอง", "🔄 คืนสินค้าได้"].map(t => (
                        <span key={t} style={{ background: C.primaryLight, color: C.primaryDark, padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{t}</span>
                    ))}
                </div>
            </div>
            <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390, background: "white", padding: "16px 20px 34px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 12, alignItems: "center", zIndex: 99 }}>
                <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                    <div onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Icon name="minus" size={16} color={C.text} /></div>
                    <div style={{ width: 36, textAlign: "center", fontWeight: 700, fontSize: 16 }}>{qty}</div>
                    <div onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: C.primaryLight }}><Icon name="plus" size={16} color={C.primary} /></div>
                </div>
                <div onClick={handleAdd} style={{ flex: 1, background: added ? C.secondary : `linear-gradient(135deg,${C.primary},${C.primaryDark})`, color: "white", borderRadius: 14, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", gap: 8, transition: "background 0.3s" }}>
                    {added ? "✅ เพิ่มแล้ว!" : "🛒 เพิ่มลงตะกร้า · ฿" + (p.price * qty).toFixed(0)}
                </div>
            </div>
        </div>
    );
};

// ─── CART ─────────────────────────────────────────────────────────────────────
const CartScreen = ({ cart, setCart, setScreen }) => {
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = couponApplied ? Math.floor(total * 0.11) : 0;
    const shipping = total > 300 ? 0 : 30;
    const grand = total - discount + shipping;
    const updateQty = (id, delta) => setCart(c => c.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
    const removeItem = (id) => { setCart(c => c.filter(i => i.id !== id)); setDeleteConfirm(null); };
    return (
        <div style={{ paddingBottom: 88 }}>
            <TopBar title="ตะกร้าสินค้า" right={cart.length > 0 && <span style={{ fontSize: 12, color: C.sub }}>{cart.length} รายการ</span>} />
            {cart.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, gap: 16 }}>
                    <div style={{ fontSize: 64 }}>🛒</div>
                    <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 18 }}>ตะกร้าว่างเปล่า</div>
                    <Btn onClick={() => setScreen("home")}>เลือกสินค้า</Btn>
                </div>
            ) : (
                <>
                    <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                        {cart.map(item => (
                            <div key={item.id} style={{ background: "white", borderRadius: 16, padding: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                    <div style={{ width: 64, height: 64, background: C.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>{item.img}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 12, color: C.sub }}>{item.brand}</div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>{item.name}</div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <span style={{ fontWeight: 700, color: C.primary }}>฿{(item.price * item.qty).toFixed(0)}</span>
                                            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                                                <div onClick={() => updateQty(item.id, -1)} style={{ padding: "4px 10px", cursor: "pointer" }}><Icon name="minus" size={12} color={C.text} /></div>
                                                <span style={{ padding: "4px 8px", fontSize: 13, fontWeight: 700 }}>{item.qty}</span>
                                                <div onClick={() => updateQty(item.id, 1)} style={{ padding: "4px 10px", cursor: "pointer", background: C.primaryLight }}><Icon name="plus" size={12} color={C.primary} /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={() => setDeleteConfirm(deleteConfirm === item.id ? null : item.id)} style={{ cursor: "pointer", padding: 4 }}>
                                        <Icon name="trash" size={18} color={deleteConfirm === item.id ? "#E53935" : "#CCC"} />
                                    </div>
                                </div>
                                {deleteConfirm === item.id && (
                                    <div style={{ marginTop: 10, background: "#FFF5F5", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontSize: 12, color: "#E53935" }}>ลบ "{item.name}" ออก?</span>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <div onClick={() => setDeleteConfirm(null)} style={{ fontSize: 12, color: C.sub, cursor: "pointer", padding: "4px 10px", border: `1px solid ${C.border}`, borderRadius: 8 }}>ยกเลิก</div>
                                            <div onClick={() => removeItem(item.id)} style={{ fontSize: 12, color: "white", background: "#E53935", cursor: "pointer", padding: "4px 10px", borderRadius: 8, fontWeight: 700 }}>ลบเลย</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div style={{ margin: "0 16px 12px", background: "white", borderRadius: 16, padding: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🎟️ คูปองส่วนลด</div>
                        {couponApplied ? (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.secondaryLight, borderRadius: 10, padding: "10px 14px" }}>
                                <span style={{ fontSize: 13, color: C.secondary, fontWeight: 700 }}>✅ MAMA10 ลด 11%</span>
                                <div onClick={() => { setCouponApplied(false); setCoupon(""); }} style={{ cursor: "pointer" }}><Icon name="close" size={16} color={C.sub} /></div>
                            </div>
                        ) : (
                            <div style={{ display: "flex", gap: 8 }}>
                                <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="ใส่รหัสคูปอง (ลอง MAMA10)" style={{ flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, outline: "none", color: C.text }} />
                                <div onClick={() => { if (coupon.toUpperCase() === "MAMA10") { setCouponApplied(true); } else { alert("ลอง MAMA10"); } }} style={{ background: C.primary, color: "white", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>ใช้คูปอง</div>
                            </div>
                        )}
                    </div>
                    <div style={{ margin: "0 16px 16px", background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>สรุปคำสั่งซื้อ</div>
                        {[["ราคารวม", `฿${total.toFixed(2)}`], ...(couponApplied ? [["ส่วนลดคูปอง", `-฿${discount.toFixed(2)}`]] : []), ["ค่าจัดส่ง", shipping === 0 ? "ฟรี 🎉" : `฿${shipping}`]].map(([k, v]) => (
                            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: C.sub }}>
                                <span>{k}</span><span style={{ color: k.includes("ส่วนลด") || v === "ฟรี 🎉" ? C.secondary : C.text }}>{v}</span>
                            </div>
                        ))}
                        {total < 300 && <div style={{ fontSize: 11, color: C.sub, marginBottom: 8 }}>🚚 ซื้อเพิ่ม ฿{(300 - total).toFixed(0)} รับฟรีค่าจัดส่ง</div>}
                        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: 700, fontSize: 15 }}>ยอดรวมทั้งหมด</span>
                            <span style={{ fontWeight: 700, fontSize: 17, color: C.primary }}>฿{grand.toFixed(2)}</span>
                        </div>
                    </div>
                    <div style={{ padding: "0 16px" }}><Btn onClick={() => setScreen("checkout")}>ดำเนินการชำระเงิน →</Btn></div>
                </>
            )}
        </div>
    );
};

// ─── CHECKOUT ─────────────────────────────────────────────────────────────────
const CheckoutScreen = ({ cart, setScreen, setCart, addresses, setAddresses }) => {
    const [selectingAddr, setSelectingAddr] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = total > 300 ? 0 : 30;
    const grand = total + shipping;

    if (confirmed) return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 32, background: C.bg }}>
            <div style={{ fontSize: 72 }}>🎉</div>
            <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 22, textAlign: "center" }}>ชำระเงินสำเร็จ!</div>
            <div style={{ fontSize: 14, color: C.sub, textAlign: "center" }}>คำสั่งซื้อกำลังดำเนินการ<br />จัดส่งภายใน 2 ชั่วโมง</div>
            <div style={{ background: "white", borderRadius: 20, padding: 20, width: "100%", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.sub, marginBottom: 8 }}>
                    <span>หมายเลขคำสั่งซื้อ</span><span style={{ color: C.primary, fontWeight: 700 }}>#{Date.now().toString().slice(-8)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.sub }}>
                    <span>ยอดที่ชำระ</span><span style={{ color: C.text, fontWeight: 700 }}>฿{grand.toFixed(2)}</span>
                </div>
            </div>
            <Btn onClick={() => { setCart([]); setScreen("orders"); }}>ดูคำสั่งซื้อ</Btn>
        </div>
    );

    if (selectingAddr) return (
        <AddressScreen addresses={addresses} setAddresses={setAddresses} onBack={() => setSelectingAddr(false)} onSelect={() => setSelectingAddr(false)} selectMode={true} />
    );

    return (
        <div style={{ paddingBottom: 80 }}>
            <TopBar title="ชำระเงิน" back onBack={() => setScreen("cart")} />
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📍 ที่อยู่จัดส่ง</div>
                    {defaultAddr ? (
                        <>
                            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{defaultAddr.name}</div>
                            <div style={{ fontSize: 12, color: C.sub, marginTop: 4, lineHeight: 1.7 }}>{defaultAddr.phone}<br />{defaultAddr.detail}</div>
                            <div onClick={() => setSelectingAddr(true)} style={{ marginTop: 10, color: C.primary, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>เปลี่ยนที่อยู่ →</div>
                        </>
                    ) : (
                        <div onClick={() => setSelectingAddr(true)} style={{ color: C.primary, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ เพิ่มที่อยู่จัดส่ง</div>
                    )}
                </div>
                <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>💳 ชำระเงินผ่าน PromptPay</div>
                    <div style={{ background: C.bg, borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 120, height: 120, background: "white", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.1)", gap: 4 }}>
                            <Icon name="qr" size={64} color={C.text} /><span style={{ fontSize: 10, color: C.sub }}>QR PromptPay</span>
                        </div>
                        <div style={{ fontSize: 12, color: C.sub, textAlign: "center" }}>สแกนด้วยแอปธนาคารของคุณ</div>
                    </div>
                </div>
                <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🛍️ รายการสินค้า</div>
                    {cart.map(item => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                            <span style={{ color: C.sub }}>{item.img} {item.name} ×{item.qty}</span>
                            <span style={{ fontWeight: 600 }}>฿{(item.price * item.qty).toFixed(0)}</span>
                        </div>
                    ))}
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 4 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.sub, marginBottom: 6 }}>
                            <span>ค่าจัดส่ง</span><span style={{ color: shipping === 0 ? C.secondary : C.text }}>{shipping === 0 ? "ฟรี 🎉" : `฿${shipping}`}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15, marginTop: 4 }}>
                            <span>ยอดรวม</span><span style={{ color: C.primary }}>฿{grand.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <Btn onClick={() => setConfirmed(true)}>✅ ยืนยันการชำระเงิน</Btn>
            </div>
        </div>
    );
};

// ─── ORDERS ───────────────────────────────────────────────────────────────────
const OrdersScreen = ({ orders }) => {
    const [tab, setTab] = useState("จัดส่งแล้ว");
    const tabs = ["จัดส่งแล้ว", "กำลังจัดส่ง", "ยกเลิกแล้ว"];
    const filtered = orders.filter(o => tab === "จัดส่งแล้ว" ? o.status === "จัดส่งแล้ว" : tab === "กำลังจัดส่ง" ? o.status === "กำลังจัดส่ง" : o.status === "ยกเลิกแล้ว");
    return (
        <div style={{ paddingBottom: 88 }}>
            <TopBar title="คำสั่งซื้อของฉัน" />
            <div style={{ display: "flex", background: "white", borderBottom: `1px solid ${C.border}` }}>
                {tabs.map(t => <div key={t} onClick={() => setTab(t)} style={{ flex: 1, textAlign: "center", padding: "12px 4px", fontSize: 11, fontWeight: tab === t ? 700 : 400, color: tab === t ? C.primary : C.sub, borderBottom: tab === t ? `2.5px solid ${C.primary}` : "2.5px solid transparent", cursor: "pointer" }}>{t}</div>)}
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: C.sub }}><div style={{ fontSize: 48, marginBottom: 12 }}>📋</div><div>ไม่มีคำสั่งซื้อในหมวดนี้</div></div>
                ) : filtered.map(o => (
                    <div key={o.id} style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <span style={{ fontWeight: 700, color: C.primary, fontSize: 13 }}>{o.id}</span>
                            <span style={{ background: o.status === "จัดส่งแล้ว" ? "#E8F9F1" : C.primaryLight, color: o.status === "จัดส่งแล้ว" ? C.secondary : C.primary, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{o.status}</span>
                        </div>
                        <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>{o.items}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 12, color: "#BBB" }}>📅 {o.date}</span>
                            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>฿{o.price}</span>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            <div style={{ flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "8px", textAlign: "center", fontSize: 12, fontWeight: 600, color: C.sub, cursor: "pointer" }}>ดูรายละเอียด</div>
                            {o.status === "จัดส่งแล้ว" && <div style={{ flex: 1, background: C.primaryLight, borderRadius: 10, padding: "8px", textAlign: "center", fontSize: 12, fontWeight: 600, color: C.primary, cursor: "pointer" }}>สั่งอีกครั้ง</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── PROFILE ──────────────────────────────────────────────────────────────────
const ProfileScreen = ({ setScreen, addresses }) => {
    const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
    return (
        <div style={{ paddingBottom: 88 }}>
            <TopBar title="บัญชีของฉัน" />
            <div style={{ background: `linear-gradient(135deg,${C.primary},#FF9A5C)`, padding: "24px 20px 32px", color: "white" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 64, height: 64, background: "rgba(255,255,255,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>😊</div>
                    <div>
                        <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 18 }}>คณดี ครับผม</div>
                        <div style={{ fontSize: 13, opacity: 0.85 }}>คนดี@email.com</div>
                    </div>
                </div>
            </div>
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
            <div style={{ padding: "16px 16px 0" }}>
                {[
                    { icon: "📦", label: "คำสั่งซื้อของฉัน", sub: "3 คำสั่งซื้อ", action: () => setScreen("orders") },
                    { icon: "📍", label: "ที่อยู่จัดส่ง", sub: `${addresses.length} ที่อยู่ · ${defaultAddr ? defaultAddr.label : "ยังไม่มี"}`, action: () => setScreen("addresses") },
                    { icon: "❤️", label: "รายการโปรด", sub: "5 สินค้า", action: () => { } },
                    { icon: "💳", label: "วิธีการชำระเงิน", sub: "PromptPay", action: () => { } },
                    { icon: "🔔", label: "การแจ้งเตือน", sub: "เปิดอยู่", action: () => { } },
                    { icon: "🏪", label: "หน้าร้านค้า (แอดมิน)", sub: "จัดการออเดอร์", action: () => setScreen("store") },
                ].map(m => (
                    <div key={m.label} onClick={m.action} style={{ background: "white", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 8, cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
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
};

// ─── STORE ────────────────────────────────────────────────────────────────────
const StoreScreen = ({ onBack }) => (
    <div style={{ paddingBottom: 80 }}>
        <TopBar title="🏪 จัดการออเดอร์" back onBack={onBack} />
        <div style={{ padding: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[{ label: "ออเดอร์วันนี้", val: "24", icon: "📦", bg: "#FFF0EB" }, { label: "กำลังจัดส่ง", val: "8", icon: "🚚", bg: "#FFF9E6" }, { label: "สำเร็จแล้ว", val: "14", icon: "✅", bg: "#EAFAF1" }, { label: "ยอดขายรวม", val: "฿12.4k", icon: "💰", bg: "#EBF5FB" }].map(s => (
                    <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: 14 }}>
                        <div style={{ fontSize: 22 }}>{s.icon}</div>
                        <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 20, marginTop: 4 }}>{s.val}</div>
                        <div style={{ fontSize: 11, color: C.sub }}>{s.label}</div>
                    </div>
                ))}
            </div>
            {storeOrders.map((o, i) => (
                <div key={i} style={{ background: "white", borderRadius: 16, padding: 14, marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{o.customer}</div>
                        <span style={{ background: o.status === "กำลังจัดส่ง" ? C.primaryLight : o.status === "ยกเลิกออเดอร์" ? "#FFEBEB" : "#F5F5F5", color: o.color, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{o.status}</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.sub, marginBottom: 6 }}>{o.products}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#BBB" }}>{o.time}</span><span style={{ fontWeight: 700, fontSize: 14 }}>฿{o.price}</span>
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

// ─── SEARCH ───────────────────────────────────────────────────────────────────
const SearchScreen = ({ setScreen, setSelectedProduct, addToCart }) => {
    const [q, setQ] = useState("");
    const results = q.length > 0 ? PRODUCTS.filter(p => p.name.includes(q) || p.brand.includes(q) || p.cat.includes(q)) : [];
    const popular = ["ข้าวสาร", "ผักสด", "เนื้อหมู", "น้ำดื่ม", "ไข่ไก่", "ผลไม้"];
    return (
        <div style={{ paddingBottom: 88 }}>
            <div style={{ padding: "52px 16px 12px", background: "white", position: "sticky", top: 0, zIndex: 99, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: "'Prompt',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 12 }}>ค้นหาสินค้า</div>
                <div style={{ background: C.bg, borderRadius: 14, display: "flex", alignItems: "center", padding: "11px 16px", gap: 8 }}>
                    <Icon name="search" size={16} color={C.sub} />
                    <input value={q} onChange={e => setQ(e.target.value)} placeholder="ค้นหาสินค้า ผัก ผลไม้ อาหารสด..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13, color: C.text }} autoFocus />
                    {q.length > 0 && <div onClick={() => setQ("")} style={{ cursor: "pointer" }}><Icon name="close" size={16} color={C.sub} /></div>}
                </div>
            </div>
            <div style={{ padding: 16 }}>
                {q.length === 0 ? (
                    <>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🔥 ยอดนิยม</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                            {popular.map(w => <div key={w} onClick={() => setQ(w)} style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: 20, padding: "7px 16px", fontSize: 13, cursor: "pointer" }}>{w}</div>)}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🆕 สินค้าใหม่</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); setScreen("detail"); }} onQuickAdd={() => addToCart(p, 1)} />)}
                        </div>
                    </>
                ) : results.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: C.sub }}><div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div><div>ไม่พบ "{q}"</div></div>
                ) : (
                    <>
                        <div style={{ fontSize: 13, color: C.sub, marginBottom: 12 }}>พบ {results.length} รายการ</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {results.map(p => <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); setScreen("detail"); }} onQuickAdd={() => addToCart(p, 1)} />)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
    const [screen, setScreen] = useState("home");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [addresses, setAddresses] = useState(INIT_ADDRESSES);
    const [orders] = useState(INIT_ORDERS);

    const addToCart = (product, qty) => {
        setCart(c => {
            const ex = c.find(i => i.id === product.id);
            if (ex) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
            return [...c, { ...product, qty }];
        });
    };

    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    const showNav = !["detail", "checkout", "addresses", "address-select", "store"].includes(screen);
    const goTo = s => setScreen(s);

    return (
        <div style={{ minHeight: "100vh", background: C.bg }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&family=Prompt:wght@400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input,textarea{font-family:'Sarabun',sans-serif;}
        html,body,#root{height:100%;}
        @media(min-width:500px){
          .aw{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#E8E8E8;padding:20px 0;}
          .as{width:390px!important;height:844px!important;border-radius:44px!important;box-shadow:0 40px 100px rgba(0,0,0,0.35),0 0 0 12px #1A1A1A,0 0 0 14px #333!important;overflow:hidden!important;}
          .an{display:block!important;}
        }
        @media(max-width:499px){
          .aw{background:#F9F6F2;}
          .as{width:100vw!important;height:100dvh!important;border-radius:0!important;box-shadow:none!important;}
          .an{display:none!important;}
        }
        .sc{height:100%;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;}
        .sc::-webkit-scrollbar{display:none;}
      `}</style>
            <div className="aw">
                <div className="as" style={{ background: C.bg, position: "relative" }}>
                    <div className="an" style={{ display: "none", position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 32, background: "#1A1A1A", borderRadius: "0 0 20px 20px", zIndex: 999 }} />
                    <div className="sc">
                        {screen === "home" && <HomeScreen setScreen={goTo} setSelectedProduct={setSelectedProduct} cartCount={cartCount} addresses={addresses} addToCart={addToCart} />}
                        {screen === "search" && <SearchScreen setScreen={goTo} setSelectedProduct={setSelectedProduct} addToCart={addToCart} />}
                        {screen === "detail" && <DetailScreen product={selectedProduct} setScreen={goTo} addToCart={addToCart} />}
                        {screen === "cart" && <CartScreen cart={cart} setCart={setCart} setScreen={goTo} />}
                        {screen === "checkout" && <CheckoutScreen cart={cart} setScreen={goTo} setCart={setCart} addresses={addresses} setAddresses={setAddresses} />}
                        {screen === "orders" && <OrdersScreen orders={orders} />}
                        {screen === "profile" && <ProfileScreen setScreen={goTo} addresses={addresses} />}
                        {screen === "addresses" && <AddressScreen addresses={addresses} setAddresses={setAddresses} onBack={() => goTo("profile")} onSelect={() => { }} />}
                        {screen === "address-select" && <AddressScreen addresses={addresses} setAddresses={setAddresses} onBack={() => goTo("home")} onSelect={() => goTo("home")} selectMode={true} />}
                        {screen === "store" && <StoreScreen onBack={() => goTo("profile")} />}
                    </div>
                    {showNav && <BottomNav screen={screen} setScreen={goTo} cartCount={cartCount} />}
                </div>
            </div>
        </div>
    );
}