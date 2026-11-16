# 🐾 Pet Nest — Pet Care & E-commerce Platform

Pet Nest is a web application that brings pet products, pet profiles, and spa services together in one place. Customers can browse products, manage their pets, book spa services, and keep track of their orders, while administrators manage the store and its content.

---

## 🌟 Key Features

- **Authentication & Accounts:** Register and sign in with email or Google, verify email addresses, and recover passwords.
- **Customer Pet Profiles:** Create and manage profiles for pets.
- **Online Store:** Browse products and categories, manage a cart and wishlist, place orders, and apply voucher codes.
- **Spa Services & Bookings:** Browse spa services and make bookings; staff and administrators can manage booking workflows.
- **Blog & Homepage Content:** Read blog articles and view promotional content on the homepage.
- **Admin Management:** Manage blog articles, promotional banners, vouchers, reviews, spa services (CRUD), products, categories, users, and orders.
- **Staff Tools:** Access staff dashboards, schedules, customer information, services, and messages.
- **Messaging & Notifications:** Support customer/staff messaging and real-time notifications.
- **Dashboard & Analytics:** View operational summaries and charts.
- **Bilingual Interface:** Vietnamese and English language support.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **UI & Styling:** Tailwind CSS 4, Material UI, Radix UI, Framer Motion
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens, Google OAuth, bcrypt
- **Integrations & Utilities:** Cloudinary, Socket.IO, Nodemailer, PayOS, Google GenAI, Axios, Recharts

---

## ⚙️ Installation & Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/tranhieu8888/pet-nest.git
cd pet-nest
```

### 2. Configure and Start the Backend

Install dependencies:

```bash
cd be
npm install
```

Create `be/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pet-nest
JWT_SECRET=replace-with-a-long-random-secret
```

Start the backend:

```bash
npm run dev
```

The API is available at `http://localhost:5000/api`. Make sure MongoDB is running. Configure integration credentials in `be/.env` when using Google sign-in, email, Cloudinary, PayOS, or Gemini features. Never commit `.env` files or credentials.

### 3. Configure and Start the Frontend

Open a second terminal:

```bash
cd fe
npm install
```

Create `fe/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To run the frontend in production mode, build it first and then start the production server:

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```text
pet-nest/
├── be/
│   ├── config/          # Database, OAuth, mail, and service configuration
│   ├── controllers/     # API request handlers
│   ├── middleware/      # Authentication and authorization middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Express API routes
│   └── services/        # Integrations and business services
└── fe/
    ├── public/          # Static assets
    ├── src/
    │   ├── app/         # Next.js pages and route segments
    │   ├── api/         # Frontend API modules
    │   ├── components/  # Shared UI components
    │   ├── context/     # React context providers
    │   ├── hooks/       # Shared React hooks
    │   ├── lib/         # Shared frontend libraries
    │   └── config/      # Frontend configuration
    └── utils/           # Shared frontend API/config utilities
```

---

## 👥 Team Members & Contributions

- **Tran Tuan**
  - Developed the admin blog management and homepage.
  - Developed voucher management.
  - Developed admin review management.
  - Developed admin promotional banner management and homepage banner display.
  - Developed customer pet profile management.
  - Developed admin spa service management (CRUD).
- **Van Nguyen**
- **Huy**
- **Hieu**
- **Minh**
