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
git clone https://github.com/trantuandev/pet-nest-personal.git
cd pet-nest-personal
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

## Deploy with MongoDB Atlas and Render

Render hosts the Express API and the Next.js frontend as separate Node.js Web Services. The frontend calls the API, and the API connects to the `pet-nest` database on MongoDB Atlas.

- [Deployed frontend](https://pet-nest-personal.onrender.com/homepage)
- [Deployed API health check](https://pet-nest-personal-api.onrender.com/health)

### 1. Set Up MongoDB Atlas

1. Create a **Free (M0)** cluster, or use an existing Atlas cluster. [Atlas Free cluster setup](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/)
2. Under **Security → Database & Network Access → Database Users**, create a password-authenticated database user with `readWrite` access to `pet-nest`.
3. Open **Clusters → Connect → Drivers and Client Libraries → Node.js** and copy the connection string. Replace the password placeholder with the database user's password, percent-encoding any reserved characters. Add `pet-nest` after the hostname and before `?`, and keep the query parameters Atlas provides. [Atlas connection instructions](https://www.mongodb.com/docs/atlas/driver-connection/)

```text
mongodb+srv://<db-user>:<encoded-password>@<atlas-host>/pet-nest?retryWrites=true&w=majority
```

Save the URI in the backend's Render environment. For local development with Atlas, put it in `be/.env` and add your own IP address to Atlas. Keep credentials out of Git.

### 2. Deploy the API and Frontend on Render

Push your changes to GitHub, then connect `trantuandev/pet-nest-personal` to Render. To provision both services together, select **New → Blueprint**, choose the `main` branch, and use the root [render.yaml](render.yaml). The Blueprint requests Free services and generates the backend secrets. [Render Blueprint setup](https://render.com/docs/infrastructure-as-code)

To configure the services manually, select **New → Web Service** for each one and use the following settings. Deploy the backend first so you can use its public URL when configuring the frontend. [Render monorepo settings](https://render.com/docs/monorepo-support#setting-a-root-directory)

| Setting | Backend | Frontend |
| --- | --- | --- |
| Branch | `main` | `main` |
| Runtime | Node | Node |
| Instance type | Free | Free |
| Root Directory | `be` | `fe` |
| Build Command | `npm ci` | `npm ci --include=dev && npm run build -- --webpack` |
| Start Command | `npm start` | `npm start` |
| Health Check Path | `/health` | `/homepage` |

Set these variables in the **Environment** tab of the matching service. Use the public URLs assigned to your services.

| Service | Variable | Value |
| --- | --- | --- |
| Backend | `MONGO_URI` | Atlas connection string for the `pet-nest` database |
| Backend | `CLIENT_URL` | Frontend origin, such as `https://pet-nest-personal.onrender.com` |
| Backend | `JWT_SECRET` | A long, randomly generated secret for signing tokens |
| Backend | `OTP_ENCRYPTION_KEY` | A separate random secret for password-reset codes |
| Frontend | `NEXT_PUBLIC_API_URL` | Backend URL ending in `/api`, such as `https://pet-nest-personal-api.onrender.com/api` |
| Both | `NODE_VERSION` | `>=24.0.0 <25.0.0`, as configured in the Blueprint |

For a manual deployment, generate the two backend secrets independently. If Render assigns the frontend a different URL, update `CLIENT_URL` and redeploy the backend. Redeploy the frontend whenever `NEXT_PUBLIC_API_URL` changes because Next.js reads it at build time.

### 3. Allow Render to Reach Atlas

1. On the **backend** service in Render, open **Connect → Outbound** and copy its outbound IP ranges. [Render outbound IP addresses](https://render.com/docs/outbound-ip-addresses)
2. In Atlas, open **Security → Database & Network Access → IP Access List**. Add each range as a separate **Access List Entry** and keep the CIDR suffix, such as `/24`. [Atlas IP access list](https://www.mongodb.com/docs/atlas/security/ip-access-list/)
3. Once the entries are **Active**, select **Manual Deploy → Deploy latest commit** on the backend if its first deploy failed.

### 4. Verify the Deployment

Open `/health` on the backend URL and check for HTTP 200 with `{"status":"ok"}`. Open `/api/products/all` to verify the catalog, then visit `/homepage` and `/products` on the frontend.

A new Atlas database starts without Pet Nest records. For a demo, review the JSON files in `db_PETSHOP.rar` and import the collections you need into `pet-nest` with `mongoimport --jsonArray`. Preserve document `_id` values so references between collections still work. The archive also contains account and transaction records. [Atlas JSON import instructions](https://www.mongodb.com/docs/atlas/import/mongoimport/)

### Optional Integrations and Free-Tier Limits

- Google sign-in uses `GOOGLE_CLIENT_ID` on the backend and the same ID in `NEXT_PUBLIC_GOOGLE_CLIENT_ID` on the frontend. Add the public frontend origin to the Google OAuth client's authorized JavaScript origins.
- Email registration, password reset, and subscription messages use `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, and a verified address in `EMAIL_FROM`. Render Free blocks SMTP ports 25, 465, and 587. A relay that supports port 2525 can be used. [Render Free limits](https://render.com/docs/free) · [Brevo SMTP ports](https://help.brevo.com/hc/en-us/articles/10905415650322-Which-SMTP-port-should-I-use-Port-587-465-or-2525)
- Cloudinary-backed uploads use `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, and `CLOUDINARY_SECRET`. Uploads stored in `be/uploads` are temporary on Render Free and can be lost when a service restarts. [Render filesystem limits](https://render.com/docs/free#local-files-lost-on-redeploy)
- PayOS uses `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, and `PAYOS_CHECKSUM_KEY`. Gemini features use `GEMINI_API_KEY`.

Render Free services spin down after 15 minutes of inactivity. The next request may take about a minute while the service starts again. The Free services share the workspace's monthly instance hours. [Render Free limits](https://render.com/docs/free)

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
