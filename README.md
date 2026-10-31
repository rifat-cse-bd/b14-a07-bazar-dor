# 🛒 বাজার দর (BazarDor)

**বাজার দর** shows today's prices of everyday essentials in Bangladesh (rice, lentils, oil, vegetables, fish, meat, eggs and spices) in one place. Every product has its price change since yesterday and a market-by-market breakdown across divisions, all in Bengali.

## ✨ Key Features

1. **Live price ticker:** an endlessly scrolling strip under the navbar with every product's price and ▲/▼ change.
2. **Today's movers:** the home page lists the top 6 price risers and the top 6 fallers, followed by every product.
3. **Category pages with sorting:** browse by category and sort by price (low to high or high to low). Sorting uses numeric values, so Bengali numerals sort correctly.
4. **Detailed product page (login required):** lowest, highest and average price, plus a table of today's price in each market.
5. **Authentication with BetterAuth:** email/password sign up and sign in, plus Google and GitHub login, with toast notifications.
6. **Profile management:** view your profile and update your name on a separate update page.
7. **Responsive and friendly states:** works on mobile, tablet and desktop, with skeleton loaders while data loads and a Bengali 404 page.

## 🛠️ Technologies Used

- [Next.js 16](https://nextjs.org) (App Router, Cache Components)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com) + [daisyUI 5](https://daisyui.com)
- [BetterAuth](https://better-auth.com) with MongoDB
- [react-hot-toast](https://react-hot-toast.com)
- Hind Siliguri font via `next/font`

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   BETTER_AUTH_SECRET=your-random-secret
   BETTER_AUTH_URL=http://localhost:3000
   BETTER_AUTH_DB_URL=your-mongodb-connection-string

   BETTER_AUTH_GOOGLE_CLIENT_ID=
   BETTER_AUTH_GOOGLE_CLIENT_SECRET=

   BETTER_AUTH_GITHUB_CLIENT_ID=
   BETTER_AUTH_GITHUB_CLIENT_SECRET=
   ```

   OAuth callback URLs:
   - Google: `http://localhost:3000/api/auth/callback/google`
   - GitHub: `http://localhost:3000/api/auth/callback/github`

3. Start the dev server and open [http://localhost:3000](http://localhost:3000):

   ```bash
   npm run dev
   ```

## 📁 Routes

| Route | Description |
| --- | --- |
| `/` | Home: hero, price risers and fallers, all products |
| `/category/[slug]` | Products of one category, with sorting |
| `/product/[slug]` | Product details (login required) |
| `/signin`, `/signup` | Authentication |
| `/profile`, `/profile/update` | Profile and update name (login required) |

## 📡 Data Source

Product and category data comes from the Programming Hero BazarDor API:
`https://openapi.programming-hero.com/api/bazardor`
