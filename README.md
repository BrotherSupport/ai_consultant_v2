# Fluxion AI 聚流智能 — 官網

企業 AI 導入顧問公司的單頁式行銷官網（繁體中文），純靜態，部署於 GitHub Pages。

**線上網址：** https://jerryliu7777.github.io/ai_consultant_v2/

---

## 這是什麼

一個虛構品牌 **Fluxion AI（聚流智能）** 的企業官網，定位為「企業 AI 導入的一站式服務商」，
並主打自有的模型治理平台 **OneGate**。所有文案、數據、案例皆為展示用途。

## 頁面結構

| # | 區塊 | 說明 |
|---|------|------|
| 1 | Hero | 主標、次標、雙 CTA、四項關鍵數據（滾動計數動畫） |
| 2 | Marquee | 能力關鍵字跑馬燈 |
| 3 | The Gap | 「85% 專案止步於 PoC」— 四道關卡 |
| 4 | Our Thesis | 三層水利比喻：蓄水層 / 輸水網 / 灌溉末梢 |
| 5 | OneGate | 模型治理平台，含 API 範例終端機與已接入模型清單 |
| 6 | Services | 四大服務：顧問 / 開發 / 整合 / 維運 |
| 7 | Method | 六週到上線的四階段時間軸 |
| 8 | Cases | 主打案例 + 四大產業場景 |
| 9 | FAQ | 六則常見問題（手風琴，一次開一則） |
| 10 | Insights | 三則觀點文章卡片 |
| 11 | About + CTA | 公司介紹與預約診斷表單 |
| 12 | Footer | 四欄導覽、聯絡資訊 |

## 技術

- 純 HTML + CSS + vanilla JS，**零建置流程、零相依套件**
- 深色主題，CSS 變數集中管理配色（`assets/css/styles.css` 頂端 `:root`）
- `IntersectionObserver` 進場動畫、數字計數、導覽列高亮
- RWD：1024 / 860 / 700px 三個斷點，含漢堡選單
- 無障礙：skip link、`aria-*`、鍵盤操作、`prefers-reduced-motion` 支援
- SEO：Open Graph、JSON-LD Organization schema、canonical

## 檔案結構

```
.
├── index.html              # 全站內容
├── assets/
│   ├── css/styles.css      # 樣式
│   └── js/main.js          # 互動
├── .nojekyll               # 關閉 GitHub Pages 的 Jekyll 處理
└── README.md
```

## 本機預覽

```bash
python3 -m http.server 8080
# 開啟 http://localhost:8080
```

## 客製化

- **配色**：改 `assets/css/styles.css` 的 `:root`（`--teal` / `--blue` / `--violet` / `--bg`）
- **品牌名稱**：`index.html` 中搜尋 `FLUXION` 與 `聚流智能`
- **文案**：全部寫在 `index.html`，無範本引擎
- **表單**：目前為前端示範，未串接後端。要收件可改接 Formspree / Google Form / 自建 API
  （見 `assets/js/main.js` 的 `contactForm` submit handler）

## 授權

程式碼可自由取用；文案與品牌為虛構示範內容。
