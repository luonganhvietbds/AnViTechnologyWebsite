TỔNG QUAN KIẾN TRÚC DATABASE

USERS
 ├─ ORDERS
 │   ├─ ORDER_ITEMS
 │       ├─ WEBAPPS
 │       └─ SOFTWARE
 ├─ USER_WEBAPP_PERMISSIONS
 ├─ LICENSES
 └─ ADMIN_LOGS


1️⃣ USERS – NGƯỜI DÙNG

users
------
id (PK)
email (UNIQUE)
password_hash
status            -- active | blocked
role              -- user | admin
created_at
updated_at


2️⃣ WEBAPPS – WEBAPP VIẾT KỊCH BẢN

webapps
-------
id (PK)
name
slug                    -- co-tich-nguoc
subdomain               -- cotichnguoc.anvitech.vn
description
style_type              -- cổ tích, kinh tế, storytelling...
demo_video_url
price
status                  -- active | inactive
created_at
updated_at


3️⃣ SOFTWARE – PHẦN MỀM PHỤ TRỢ (ONLINE / OFFLINE)

software
--------
id (PK)
name
software_type           -- online | offline
description
demo_video_url
price
status                  -- active | inactive
created_at
updated_at


4️⃣ ORDERS – ĐƠN HÀNG

orders
------
id (PK)
order_code (UNIQUE)
user_id (FK → users.id)
total_amount
payment_method          -- bank_transfer
payment_status          -- pending | paid | confirmed | cancelled
created_at
updated_at

5️⃣ ORDER_ITEMS – CHI TIẾT ĐƠN HÀNG

order_items
-----------
id (PK)
order_id (FK → orders.id)
item_type               -- webapp | software
item_id                 -- id của webapps hoặc software
price
created_at


6️⃣ USER_WEBAPP_PERMISSIONS – QUYỀN TRUY CẬP WEBAPP

user_webapp_permissions
-----------------------
id (PK)
user_id (FK → users.id)
webapp_id (FK → webapps.id)
order_id (FK → orders.id)
status                  -- active | revoked
granted_at
expired_at (NULLABLE)


7️⃣ LICENSES – LICENSE PHẦN MỀM

licenses
--------
id (PK)
license_key (UNIQUE)
user_id (FK → users.id)
software_id (FK → software.id)
order_id (FK → orders.id)
status                  -- active | expired | revoked
activated_at
expired_at
created_at


8️⃣ PAYMENT_CONFIRMATIONS – XÁC NHẬN THANH TOÁN (ADMIN)

payment_confirmations
---------------------
id (PK)
order_id (FK → orders.id)
admin_id (FK → users.id)
confirmed_amount
confirmed_at
note


9️⃣ ADMIN_LOGS – NHẬT KÝ QUẢN TRỊ

admin_logs
----------
id (PK)
admin_id (FK → users.id)
action                  -- confirm_payment, grant_access...
target_type             -- order | user | webapp | license
target_id
created_at


🔐 LUỒNG CẤP QUYỀN (RẤT QUAN TRỌNG)

User tạo Order
→ Thanh toán QR
→ Admin xác nhận (payment_confirmations)
→ order.payment_status = confirmed
→ Tạo record:
   - user_webapp_permissions
   - hoặc licenses
→ User truy cập WebApp / Software


🔐 1. TỔNG QUAN LUỒNG XÁC THỰC SUB-DOMAIN
Mục tiêu

User đăng nhập 1 lần

Truy cập được nhiều sub-domain webapp

Mỗi sub-domain tự check quyền

Không lộ logic, không bypass được

🧭 Sơ đồ tổng quát (logic)

User → Login (main domain)
     → Nhận Access Token (JWT)
     → Truy cập sub-domain webapp
     → Sub-domain verify token
     → Check quyền trong DB
     → Cho phép / từ chối

🔑 2. HỆ THỐNG AUTH TRUNG TÂM (SSO)

2.1 Domain & Cookie chiến lược
Thành phần	Giá trị
Domain chính	anvitech.vn
Sub-domain	*.anvitech.vn
Auth cookie	.anvitech.vn
Token	JWT

👉 Cookie set với domain .anvitech.vn → mọi sub-domain đều đọc được.

2.2 Login Flow (Main Domain)
Khi user đăng nhập /dang-nhap

POST /api/auth/login
→ Check users.email + password_hash
→ Tạo JWT
→ Set-Cookie: auth_token
   - HttpOnly
   - Secure
   - Domain=.anvitech.vn

JWT payload (tối giản, KHÔNG nhồi quyền)

{
  "user_id": "uuid",
  "email": "user@email.com",
  "role": "user",
  "iat": 123456789
}

❗ Không embed danh sách webapp vào JWT
→ tránh token phình to + tránh quyền stale.

🌐 3. LUỒNG TRUY CẬP SUB-DOMAIN WEBAPP

Ví dụ

User truy cập:

https://cotichnguoc.anvitech.vn

3.1 Middleware Auth ở Sub-domain
Bước 1 – Lấy token

const token = getCookie("auth_token")

Nếu KHÔNG có token

→ Redirect về:

https://anvitech.vn/dang-nhap

3.2 Verify Token

verifyJWT(token)

❌ Token sai / hết hạn
→ Logout + redirect login

🔎 4. CHECK QUYỀN TRUY CẬP WEBAPP (CỐT LÕI)
4.1 Xác định webapp hiện tại

Mỗi sub-domain mapping cố định với webapps.slug

subdomain = "cotichnguoc"
→ webapp.slug = "co-tich-nguoc"

4.2 Query DB check quyền

SELECT *
FROM user_webapp_permissions
WHERE user_id = :user_id
  AND webapp_id = :webapp_id
  AND status = 'active'
  AND (expired_at IS NULL OR expired_at > NOW())
LIMIT 1;


4.3 Kết quả
✅ Có record

→ Cho phép load WebApp UI

❌ Không có record

→ Hiển thị trang Không có quyền truy cập

4.4 UI khi KHÔNG có quyền

❌ KHÔNG redirect thẳng
✔ Hiển thị rõ ràng:

Bạn chưa có quyền truy cập WebApp này
Vui lòng mua quyền sử dụng hoặc liên hệ hỗ trợ

Nút:

“Về Dashboard”

“Xem WebApp”

🧠 5. FLOW SAU KHI THANH TOÁN
5.1 Admin xác nhận thanh toán

Admin → Confirm Order
→ orders.payment_status = confirmed

5.2 Cấp quyền

Nếu item là WebApp:
INSERT INTO user_webapp_permissions (
  user_id,
  webapp_id,
  order_id,
  status,
  granted_at
)

5.3 User reload sub-domain

👉 KHÔNG cần login lại

→ Cookie còn
→ JWT hợp lệ
→ DB có permission
→ Access OK

🛡️ 6. CÁC LỚP BẢO VỆ BẮT BUỘC
6.1 Không tin frontend

Frontend chỉ hiển thị

Quyền luôn check backend

6.2 Không expose webapp list trong token

Token chỉ để xác thực

Quyền đọc DB realtime

6.3 Chặn index sub-domain
X-Robots-Tag: noindex, nofollow

6.4 Rate limit API WebApp

Tránh abuse

Dễ log hành vi

🧪 7. PSEUDO FLOW TỔNG HỢP (RẤT QUAN TRỌNG)

User login → JWT cookie
User vào sub-domain
→ Middleware đọc token
→ Verify JWT
→ Query user_webapp_permissions
→ IF allowed:
     Load WebApp
  ELSE:
     Show Access Denied UI

