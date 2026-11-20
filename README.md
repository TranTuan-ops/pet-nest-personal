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

## Deploy với MongoDB Atlas Free và Render

1. Trong [MongoDB Atlas](https://cloud.mongodb.com/), tạo cluster **Free (M0)** và một database user có quyền `readWrite` trên database `pet-nest`. Lấy URI từ **Connect → Drivers**, điền mật khẩu đã URL-encode và dùng tên database ngay trước dấu `?`, ví dụ `mongodb+srv://<user>:<password>@<cluster>/pet-nest?retryWrites=true&w=majority`. [Tài liệu Atlas Free](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/)
2. Đưa các thay đổi triển khai lên GitHub. Trong [Render Dashboard](https://dashboard.render.com/), chọn **New → Blueprint**, cấp quyền cho repo `trantuandev/pet-nest-personal` và chọn nhánh có [render.yaml](render.yaml). Blueprint tạo hai Web Service gói Free ở Singapore và sinh `JWT_SECRET` cùng `OTP_ENCRYPTION_KEY` cho backend. [Tài liệu Render Blueprint](https://render.com/docs/infrastructure-as-code)
3. Nhập các biến môi trường bên dưới khi tạo Blueprint. Nếu Render cấp hostname khác với ví dụ, cập nhật các biến URL theo hostname thực tế trong dashboard rồi redeploy frontend để Next.js đưa URL mới vào bản build.

   | Service | Biến môi trường | Giá trị |
   | --- | --- | --- |
   | Backend | `MONGO_URI` | URI kết nối Atlas của database `pet-nest` |
   | Backend | `CLIENT_URL` | URL frontend, ví dụ `https://pet-nest-personal-web.onrender.com` |
   | Frontend | `NEXT_PUBLIC_API_URL` | URL backend kèm `/api`, ví dụ `https://pet-nest-personal-api.onrender.com/api` |

4. Trên service backend, vào **Connect → Outbound** và thêm các dải IP được liệt kê vào **Network Access → IP Access List** của Atlas. Nếu lần deploy đầu thất bại trong lúc cấu hình danh sách IP, chạy **Manual Deploy** lại sau khi Atlas áp dụng thay đổi. [Dải IP outbound của Render](https://render.com/docs/outbound-ip-addresses)
5. Mở `<URL-backend>/health` để kiểm tra HTTP 200 và JSON `{"status":"ok"}`. Sau đó mở `<URL-frontend>/homepage` và kiểm tra các API lấy danh mục, sản phẩm và dịch vụ.

Cluster mới chứa database trống. `db_PETSHOP.rar` chứa các tệp JSON theo collection, gồm cả dữ liệu tài khoản và giao dịch. Với bản demo, chọn dữ liệu đã rà soát và dùng [`mongoimport --jsonArray`](https://www.mongodb.com/docs/atlas/import/mongoimport/) để đưa từng collection cần thiết vào `pet-nest`. Giữ lại `_id` của tài liệu để các quan hệ còn hoạt động.

### Tích hợp tùy chọn

- Đăng nhập Google cần `GOOGLE_CLIENT_ID` trên backend, cùng giá trị trong `NEXT_PUBLIC_GOOGLE_CLIENT_ID` trên frontend, và URL frontend trong danh sách JavaScript origins của Google OAuth.
- Đăng ký bằng email, đặt lại mật khẩu và email đăng ký nhận tin cần `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD` và địa chỉ gửi đã xác minh trong `EMAIL_FROM`. Render Free chặn các cổng SMTP 25, 465 và 587. Có thể cấu hình một relay hỗ trợ cổng 2525. [Giới hạn Render Free](https://render.com/docs/free) · [Cổng SMTP của Brevo](https://help.brevo.com/hc/en-us/articles/10905415650322-Which-SMTP-port-should-I-use-Port-587-465-or-2525)
- Các tính năng đã tích hợp Cloudinary cần `CLOUDINARY_NAME`, `CLOUDINARY_KEY` và `CLOUDINARY_SECRET` trên backend. Các ảnh blog, banner, thú cưng và dịch vụ spa lưu trong `be/uploads` hiện chỉ tồn tại trong vòng đời của instance Render Free. [Lưu trữ trên Render Free](https://render.com/docs/free#local-files-lost-on-redeploy)
- PayOS cần `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY`. Các tính năng Gemini cần `GEMINI_API_KEY` trên backend.

Render Free đưa dịch vụ vào trạng thái ngủ sau 15 phút không có lưu lượng. Các Web Service Free dùng chung hạn mức giờ chạy của workspace. [Giới hạn Render Free](https://render.com/docs/free)

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
