<div align="center">

# ⚔️ Ashen Throne

**A Dark Fantasy MMORPG Web Experience**

Official landing page and community portal for the upcoming dark fantasy MMORPG, Ashen Throne.
Features an interactive world map, dynamic class selection, lore chronicles, and a custom shopping cart — all built with zero heavy frameworks for maximum performance.

[![Eleventy](https://img.shields.io/badge/Eleventy-v2.0-222222?style=for-the-badge&logo=11ty&logoColor=white)](https://11ty.dev/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![PageSpeed](https://img.shields.io/badge/PageSpeed-100/100-00C853?style=for-the-badge&logo=lighthouse&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## ⚡ Особливості (Features)

<table>
<tr>
<td width="50%">

### 🎮 Ігровий контент
- 🗺 **Інтерактивна мапа світу** — досліджуй регіони, фракції та рівні небезпеки.
- 🛡 **Класи персонажів** — динамічний вибір 8 унікальних класів з відображенням статів (Radar chart) та анімаціями.
- 📜 **Lore & Chronicles** — таймлайн подій світу та сюжетні фракції.
- 🛒 **Косметичний магазин** — клієнтський кошик покупок з фільтрами категорій та цін.

</td>
<td width="50%">

### 🚀 Продуктивність (100/100)
- **Zero Frameworks** — жодного React/Vue/jQuery, лише нативний JS.
- **Inlined Critical CSS** — миттєвий LCP (Largest Contentful Paint), без FOUC.
- **Minified Assets** — автоматична мініфікація CSS (`clean-css`) та JS (`terser`).
- **Bot Detection** — пропуск важких анімацій (прелоадер) для пошукових ботів та Lighthouse.

</td>
</tr>
</table>

---

## 🛠 Технологічний стек

| Шар | Технологія | Навіщо |
|:-----|:-----------|:------|
| **SSG** | **Eleventy (11ty)** | Швидка генерація статики, нульовий runtime overhead. |
| **Templating** | **Nunjucks** (`.njk`) | Модульна структура, partials, макроси. |
| **Styling** | **Custom CSS** + CSS Variables | Нативна тема з кастомними властивостями та анімаціями. |
| **Scripts** | **Vanilla JS** (ES6+) | Інтерактив (мапа, кошик, частинки, слайдери) без залежностей. |
| **Build Tools** | `clean-css-cli`, `terser` | Оптимізація та мініфікація ассетів перед деплоєм. |
| **Hosting** | **Firebase Hosting** | Глобальний CDN, швидка доставка контенту. |

> 💡 **Фокус на PageSpeed:** Сайт оптимізовано під жорсткі вимоги Core Web Vitals. Вирішено проблеми render-blocking CSS, layout thrashing та довгого LCP.

---

## 📂 Структура проєкту

```text
ashen-throne/
│
├── src/                        # Початкові файли (Eleventy input)
│   ├── _includes/              # Шаблони та partials
│   │   ├── layouts/            # Base layout
│   │   └── partials/           # Header, Footer, SEO-head
│   ├── _data/                  # Глобальні дані для шаблонів
│   ├── news/                   # Markdown файли з новинами
│   ├── pages/                  # Статичні сторінки (Terms, Privacy, 404)
│   ├── index.njk               # Головна сторінка
│   ├── classes.njk             # Компендіум класів
│   ├── world.njk               # Інтерактивна мапа
│   └── ...                     # Інші сторінки (Shop, Lore, Download)
│
├── assets/                     # Статичні ресурси (JS, CSS, Images)
│   ├── css/
│   │   ├── style.css           # Основний файл стилів
│   │   └── style.min.css       # Згенерований мініфікований CSS
│   ├── js/
│   │   ├── main.js             # Логіка сайту
│   │   └── particles.js        # Кастомна система частинок
│   └── images/                 # Оптимізована графіка (.webp, .svg)
│
├── _site/                      # Згенерована статика (Eleventy output)
├── .eleventy.js                # Конфігурація SSG та кастомні фільтри/шорткоди
├── firebase.json               # Налаштування деплою Firebase
└── package.json                # Скрипти та залежності
```

---

## 🚀 Швидкий старт

### 1. Встановлення залежностей

```bash
git clone https://github.com/FeriKO-tech/ashen-throne.git
cd ashen-throne

# Встановлюємо 11ty, clean-css-cli та terser
npm install
```

### 2. Розробка (Local Server)

```bash
# Запуск локального сервера з hot-reload на порту 3000
npm run dev
```

### 3. Збірка для Production

```bash
# Мініфікує CSS/JS та генерує фінальну статику в папку _site/
npm run build
```

---

## ☁️ Деплой (Firebase)

Сайт готовий до миттєвого деплою на Firebase Hosting.

```bash
# Авторизація
firebase login

# Ініціалізація (якщо ще не налаштовано)
firebase init hosting

# Деплой в один клік
firebase deploy --only hosting
```

---

## 📈 Останні оптимізації

- **Render-Blocking CSS:** Повністю усунуто. `style.min.css` автоматично інлайниться в `<head>` під час збірки Eleventy.
- **LCP (Largest Contentful Paint):** Прелоадер на головній сторінці перевіряє `navigator.userAgent` і миттєво зникає для роботів та тестів продуктивності.
- **Forced Reflow (Layout Thrashing):** Відрефакторено логіку ресайзу `canvas` у `particles.js`, щоб читати `window.innerWidth/innerHeight` перед зміною DOM.
- **Heading Hierarchy:** Виправлено семантику заголовків у футері для кращої доступності (a11y).
- **JS Minification:** Додано пайплайн мініфікації `main.js` через `terser` для зменшення розміру бандлу.

---

<div align="center">

## License

**MIT** — feel free to use and modify for your own projects.

Made for the **Ashen Throne** community.

</div>