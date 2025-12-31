# Project Analysis - Game Arena Platform

This document answers all questions about the project structure, setup, and requirements for implementing Razorpay payments.

---

## 1️⃣ Project Structure

### **Monorepo Structure**
✅ **YES, it's a monorepo** - Frontend and backend are in the same repository.

### Folder Structure:
```
Game project/
├── frontend/          (React + Vite frontend)
│   ├── src/
│   │   ├── pages/     (AdminPage, GamingPage, ProfilePage)
│   │   ├── components/ (Header, Footer)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/            (Node.js + Express backend)
│   ├── controller/    (auth.controller, game.controller, review.controller, user.controller)
│   ├── middleware/    (auth.js - protectRoute, authorizeRoles)
│   ├── model/         (user.model, game.model, review.rating.model)
│   ├── routes/        (auth.route, gaming.route, user.route)
│   ├── utils/         (utility.js - email utilities)
│   └── server.js      (Entry point)
│
└── README.md
```

**Key Points:**
- Frontend folder: `frontend/` (React with Vite, not Next.js)
- Backend folder: `server/` (Node.js + Express)
- MongoDB models: `server/model/` folder

---

## 2️⃣ Backend Setup

### **Entry Point**
- **File:** `server/server.js`
- **Port:** 5001
- **MongoDB Connection:** Uses `mongoose.connect(process.env.MONGO_URI)`

### **Route Organization**
✅ **One file per feature** (organized approach):
- `routes/auth.route.js` - Authentication routes (login, signup, logout)
- `routes/gaming.route.js` - Game CRUD and review routes
- `routes/user.route.js` - User update routes

### **Middleware Used**
- ✅ `express.json()` - Body parser for JSON
- ✅ `express.urlencoded({ extended: true })` - Body parser for URL-encoded
- ✅ `cookie-parser` - Cookie parsing middleware
- ❌ **CORS is NOT configured** - This needs to be added for frontend-backend communication
- ✅ Custom auth middleware: `protectRoute` and `authorizeRoles` in `middleware/auth.js`

### **MongoDB Connection**
- **Library:** Mongoose
- **URI Location:** `process.env.MONGO_URI` (loaded via dotenv)
- **Connection:** Established in `server.js` lines 17-24

---

## 3️⃣ Frontend Setup

### **Pages and Components Structure**
```
frontend/src/
├── pages/
│   ├── AdminPage.jsx      (Admin dashboard)
│   ├── GamingPage.jsx     (Game browsing/details)
│   ├── ProfilePage.jsx    (User profile)
│   └── *.css files
├── components/
│   ├── Header.jsx         (Navigation header)
│   └── Footer.jsx         (Footer component)
├── App.jsx                (Main app with React Router)
└── main.jsx               (Entry point)
```

### **API Calls**
- **Library:** Axios is installed (`package.json` includes `axios: ^1.6.2`)
- **Current Status:** ❌ **Not actively used** - Pages currently use mock data (commented as "Mock data - in real app, fetch from API")
- **API Base URL:** Proxy configured in `vite.config.js` to `http://localhost:5001/api`
- **No centralized API service file yet** - Would need to create one (like `services/api.js` or `utils/axios.js`)

### **State Management**
- ❌ **No global state management** (No Context API, Redux, Zustand, etc.)
- ✅ Uses React hooks (`useState`, `useEffect`) for local component state only
- **Recommendation:** Consider adding Context API for user authentication state

### **Authentication (Frontend)**
- **Current Status:** Basic logout handler exists in Header component
- **Token Storage:** Not visible in frontend code yet, but backend uses **httpOnly cookies**
- **API Calls:** Would need to send cookies automatically with `credentials: 'include'` in fetch/axios

---

## 4️⃣ Authentication Flow

### **Token Storage**
- ✅ **Backend stores token in httpOnly cookies**
  - Cookie name: `token`
  - Max age: 1 hour (`1000 * 60 * 60` ms)
  - httpOnly: `true` (secure, not accessible via JavaScript)
- ❌ **No localStorage or sessionStorage usage** (secure approach!)

### **Token Sending (API Calls)**
- **Method:** Cookies are sent automatically by browser (when `credentials: 'include'` is set)
- **Current Status:** Frontend doesn't configure axios/fetch with credentials yet
- **Required:** Need to configure axios to send cookies:
  ```js
  axios.defaults.withCredentials = true;
  // OR for fetch:
  fetch(url, { credentials: 'include' })
  ```

### **Token Validation (Backend)**
- ✅ **Middleware:** `protectRoute` in `middleware/auth.js`
- **Validation Process:**
  1. Reads token from `req.cookies.token`
  2. Verifies JWT using `jwt.verify(token, process.env.JWT_SECRET)`
  3. Extracts user ID and attaches to `req.user`
  4. Calls `next()` if valid, returns 401 if invalid

### **Token Generation**
- JWT payload: `{ id: user._id }`
- Secret: `process.env.JWT_SECRET`
- Generated in: `auth.controller.js` (login & signup)

---

## 5️⃣ Payment-Specific Requirements

### **Current Payment Setup**
❌ **NO payment integration exists yet**
- No payment models
- No payment routes
- No payment controllers
- No Razorpay SDK installed

### **Recommendations for Payment Integration:**

#### **Payment Type**
- Start with **one-time payments** (simpler to implement)
- Can extend to recurring/subscriptions later if needed

#### **Payment Structure**
- **Tied to order/cart:** Recommended approach
- Create an **Order model** with:
  - `user` (reference to users)
  - `games` (array of game references)
  - `totalAmount`
  - `paymentStatus` (pending, completed, failed)
  - `razorpayOrderId`
  - `razorpayPaymentId`
  - `razorpaySignature`

#### **Order + Payment Storage**
✅ **YES, save full order + payment info in MongoDB**
- Store complete transaction details for:
  - Order history
  - Refund processing
  - Analytics/reports
  - Audit trail

---

## 6️⃣ Environment Variables

### **Backend `.env` Variables (Currently Used)**
```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/game-arena  # (example)

# JWT Authentication
JWT_SECRET=your-secret-key-here

# Email (for nodemailer in utils/utility.js)
SENDER_MAIL=your-email@gmail.com
PASSWORD=your-app-password
```

### **Required for Razorpay Integration**
```env
# Add these to server/.env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### **Frontend Environment Variables**
- ❌ **No `.env` file exists** in frontend currently
- **For Razorpay:** Razorpay key_id can be used in frontend (it's public)
- **Recommended:** Create `frontend/.env` for:
  ```env
  VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
  ```

### **Secret Keys**
- ✅ `JWT_SECRET` - Already in use
- ✅ Email credentials - Already in use (for nodemailer)
- ⚠️ **Keep Razorpay secrets secure** - Only `key_secret` should be server-side

---

## 7️⃣ Frontend UX

### **Current Pages**
1. **HomePage** (`/`) - Landing page
2. **GamingPage** (`/gaming`) - Game browsing/details
3. **AdminPage** (`/admin`) - Admin dashboard
4. **ProfilePage** (`/profile`) - User profile

### **Payment Button Location Options**

#### **Recommended Approaches:**

1. **Game Detail Page (GamingPage.jsx)**
   - Add "Buy Now" or "Purchase" button on individual game pages
   - Single item purchase flow

2. **Cart/Checkout Page (NEW)**
   - Create a new `/checkout` or `/cart` page
   - Multiple games in cart
   - Order summary with total

3. **Game Listing Page**
   - "Buy" button on each game card
   - Redirects to checkout or opens payment

### **Payment UI Approach**

#### **Option 1: Razorpay Checkout (Recommended for MVP)**
- ✅ **Razorpay Standard Checkout** (popup/modal)
- **Pros:**
  - Fastest to implement
  - Handles UI/UX automatically
  - Mobile-responsive
  - Secure (PCI compliant)
- **Implementation:**
  - Load Razorpay script
  - Call `RazorpayCheckout.open()` on button click
  - Handle success/failure callbacks

#### **Option 2: Custom Embedded Form**
- ❌ More complex
- Requires building custom UI
- More time-consuming
- Not recommended for initial implementation

### **Recommended Flow:**
```
User clicks "Buy Game" 
  ↓
Create order in backend (POST /api/v1/payment/create-order)
  ↓
Backend creates Razorpay order → returns order_id
  ↓
Frontend opens Razorpay Checkout with order_id
  ↓
User completes payment in Razorpay popup
  ↓
Razorpay redirects to success callback
  ↓
Frontend calls backend to verify payment (POST /api/v1/payment/verify)
  ↓
Backend verifies signature → Updates order status → Saves to DB
  ↓
Show success message / redirect to order confirmation page
```

---

## Summary & Next Steps

### **What Exists:**
✅ Monorepo structure
✅ Backend authentication with JWT + cookies
✅ MongoDB models (User, Game, Review)
✅ Express routes organized by feature
✅ React frontend with Vite
✅ Basic pages (Gaming, Admin, Profile)

### **What's Missing for Payments:**
❌ CORS configuration in backend
❌ Payment/Order models
❌ Payment routes and controllers
❌ Razorpay SDK installation
❌ Frontend payment integration
❌ Order/checkout pages
❌ API service setup in frontend
❌ Credentials configuration for axios/fetch

### **Immediate Action Items:**
1. Add CORS middleware to `server.js`
2. Create Order model in `server/model/order.model.js`
3. Create Payment controller in `server/controller/payment.controller.js`
4. Create Payment routes in `server/routes/payment.route.js`
5. Install Razorpay SDK: `npm install razorpay` (backend)
6. Add Razorpay script to frontend (via CDN or npm)
7. Create checkout/payment page in frontend
8. Configure axios with `withCredentials: true` in frontend
9. Add environment variables for Razorpay keys

---

**Last Updated:** Based on codebase analysis as of current date
