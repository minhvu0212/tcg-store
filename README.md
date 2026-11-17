# TCG STORE – PREMIUM TRADING CARD GAME E-COMMERCE WEBSITE
### PHASE 1: COMPLETE FRONTEND UI DESIGN PROTOTYPE

> **Slogan:** *YOUR COLLECTION. YOUR LEGEND.*  
> **Định vị thương hiệu:** Premium Trading Card Game & Collectibles Store.

---

## 1. Giới thiệu dự án

**TCG STORE** là website thương mại điện tử cao cấp chuyên kinh doanh và trưng bày Trading Card Game (TCG), tập trung vào các dòng thẻ bài biểu tượng:
- **Pokémon Trading Card Game**: Scarlet & Violet 151, Crown Zenith, Evolving Skies, Special Illustration Rares (Charizard ex #199, Umbreon VMAX Moonbreon, Pikachu Secret Rare, Mew ex, Gengar VMAX Alt Art, Elite Trainer Boxes, Booster Displays).
- **Yu-Gi-Oh! Trading Card Game**: Thẻ bài cổ điển và thi đấu hiện đại (Blue-Eyes White Dragon 1st Ed, Dark Magician, Dark Magician Girl, Red-Eyes Black Dragon, Exodia, Ash Blossom & Joyous Spring, Infinite Impermanence, 25th Anniversary Rarity Collection, Structure Deck Albaz Strike).
- **One Piece Card Game**: Thẻ Manga Alternate Art Secret Rares (Monkey D. Luffy Gear 5 Manga Rare, Shanks SEC, Portgas D. Ace, Roronoa Zoro, Romance Dawn Booster Boxes).
- **TCG Accessories & Protection**: Sleeves bảo vệ thi đấu (Dragon Shield, Ultimate Guard), Binders chống ẩm (Vault X Exo-Tec 9-Pocket Zip), Deck Boxes (Gamegenic Watchtower), Toploaders nam châm chống tia UV (Ultra PRO 35pt Magnetic One-Touch), Thảm đấu Stitched-Edge Playmat.

---

## 2. Công nghệ sử dụng

- **Framework**: React 18 + Vite 6
- **Ngôn ngữ**: JavaScript (ES Modules) / JSX
- **Styling**: Tailwind CSS + Custom Dark Luxury Theme
- **Icons**: Lucide Icons
- **Kiến trúc dữ liệu**: Structured Mock Data (Hơn 30 sản phẩm thẻ bài và phụ kiện có thật 100% kèm ảnh độ phân giải cao).
- **Trạng thái & Lưu trữ**: React Context API + LocalStorage (Giỏ hàng, Wishlist, Đơn hàng mẫu, Bộ lọc).

---

## 3. Cấu trúc thư mục chuẩn

```text
WEB TCG/
│
├── index.html                  # File HTML chính khởi chạy ứng dụng
├── package.json                # Khai báo dependencies và scripts
├── package-lock.json           # Khóa phiên bản npm
├── vite.config.js              # Cấu hình Vite & plugin phục vụ ảnh tĩnh
├── tailwind.config.js          # Cấu hình bảng màu Dark Luxury & Font
├── postcss.config.js           # Cấu hình PostCSS
├── README.md                   # Hướng dẫn chi tiết
│
├── Images/                     # Toàn bộ hình ảnh sản phẩm và thương hiệu
│   ├── logo/                   # Logo SVG, Favicon vector
│   ├── banners/                # Banner Hero, Showcase, Khuyến mãi
│   ├── pokemon/                # Thẻ Pokémon thật (Charizard, Umbreon, Pikachu, Mew, Gengar...)
│   ├── yugioh/                 # Thẻ Yu-Gi-Oh! thật (Blue-Eyes, Dark Magician, Ash Blossom...)
│   ├── one-piece/              # Thẻ One Piece thật (Luffy Gear 5, Shanks, Ace, Zoro...)
│   ├── products/               # Booster Box, ETB, Structure Deck thật
│   ├── accessories/            # Sleeves, Binders, Toploaders, Deck Boxes, Playmats
│   ├── icons/                  # Biểu tượng bổ sung
│   └── METADATA.md             # Đăng ký metadata nguồn ảnh & bản quyền
│
├── Scripts/                    # Toàn bộ mã nguồn JavaScript / React
│   ├── main.jsx                # Điểm khởi chạy React DOM
│   ├── App.jsx                 # Component ứng dụng chính & Router
│   ├── context/
│   │   └── StoreContext.jsx    # Quản lý giỏ hàng, wishlist, toast, user
│   ├── components/             # Các component tái sử dụng (Header, Footer, Card, Modals...)
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── QuickViewModal.jsx
│   │   ├── ConditionGuideModal.jsx
│   │   └── ToastContainer.jsx
│   ├── pages/                  # Toàn bộ các trang chức năng
│   │   ├── Home.jsx            # Trang chủ với Hero, 4 Featured Sections, Bestsellers...
│   │   ├── Shop.jsx            # Cửa hàng với bộ lọc Sidebar đa chiều, sắp xếp, tìm kiếm
│   │   ├── ProductDetail.jsx   # Chi tiết sản phẩm, zoom thẻ, thông số, tab lore & đóng gói
│   │   ├── Cart.jsx            # Giỏ hàng, điều chỉnh số lượng, mã giảm giá, tính phí ship
│   │   ├── Checkout.jsx        # Thanh toán mô phỏng, phương thức vận chuyển & bảo mật
│   │   ├── Wishlist.jsx        # Danh sách thẻ yêu thích (Grail Wishlist)
│   │   ├── Profile.jsx         # Hồ sơ người sưu tập, điểm tích lũy, huy hiệu
│   │   ├── Orders.jsx          # Lịch sử đơn hàng, trạng thái bưu kiện & mã vận đơn demo
│   │   ├── Login.jsx           # Đăng nhập tài khoản
│   │   ├── Register.jsx        # Đăng ký thành viên
│   │   ├── News.jsx            # Danh sách bài viết xu hướng thị trường & cẩm nang
│   │   ├── NewsDetail.jsx      # Chi tiết bài phân tích chuyên sâu
│   │   ├── About.jsx           # Giới thiệu câu chuyện TCG STORE & 4 trụ cột chất lượng
│   │   ├── Contact.jsx         # Liên hệ hỗ trợ & gửi yêu cầu tìm thẻ
│   │   ├── FAQ.jsx             # Câu hỏi thường gặp về giám định thẻ & đóng gói
│   │   └── AdminDashboard.jsx  # Bảng điều khiển quản trị (Doanh thu, Sản phẩm, Đơn hàng...)
│   ├── data/                   # Mock Data chuẩn hóa (Products, Categories, News, Admin...)
│   └── utils/                  # Tiện ích bổ sung
│
├── Styles/                     # Toàn bộ mã CSS
│   ├── index.css               # Tailwind directives, custom scrollbar
│   ├── global.css              # Hiệu ứng ánh kim Holographic Foil Shimmer & Badges
│   ├── components/
│   │   └── card.css            # Style đặc tả cho thẻ card
│   └── pages/
│       └── store.css           # Style mở rộng cho trang shop
│
├── Sounds/                     # Thư mục âm thanh (mở gói bài, hiệu ứng)
│   └── README.md
│
└── Videos/                     # Thư mục video (trailer, clip unboxing)
    └── README.md
```

---

## 4. Hướng dẫn chạy trên Visual Studio Code

1. Mở thư mục dự án **`WEB TCG`** bằng Visual Studio Code:
   ```bash
   code "c:\WEB TCG"
   ```
2. Mở Terminal tại thư mục gốc của dự án (`c:\WEB TCG`).
3. Chạy lệnh cài đặt các thư viện phụ thuộc (nếu chưa cài):
   ```bash
   npm install
   ```
4. Khởi chạy máy chủ phát triển Vite:
   ```bash
   npm run dev
   ```
5. Mở trình duyệt web và truy cập địa chỉ localhost được cung cấp:
   ```text
   http://localhost:3000/
   ```

---

## 5. Các tính năng tương tác đã hoạt động

- **Điều hướng Hash-based**: Hỗ trợ chuyển đổi mượt mà giữa tất cả các trang (`#home`, `#shop`, `#product/ygo-01`, `#cart`, `#checkout`, `#wishlist`, `#profile`, `#orders`, `#news`, `#about`, `#contact`, `#faq`, `#admin`).
- **Mega Menu thông minh**: Hover vào Yu-Gi-Oh! và Pokémon TCG trên Header để duyệt nhanh các dòng sản phẩm.
- **Tìm kiếm trực tiếp (Live Search)**: Tìm kiếm tức thì theo tên thẻ bài, mã sản phẩm hoặc dòng TCG với dropdown xem trước.
- **Bộ lọc & Sắp xếp đa tiêu chí (Shop Filters)**:
  - Lọc theo Dòng TCG (Yu-Gi-Oh!, Pokémon, One Piece, Phụ kiện).
  - Lọc theo Phân loại (Thẻ lẻ Single, Booster Box, ETB, Structure Deck).
  - Lọc theo Độ hiếm (Secret Rare, SAR, Manga Rare, Ultra Rare...).
  - Lọc theo Tình trạng (Gem Mint 10, Near Mint, Nguyên Seal).
  - Thanh trượt giới hạn giá tiền.
  - Sắp xếp: Nổi bật, Mới nhất, Bán chạy nhất, Giá tăng/giảm dần, Đánh giá cao nhất.
- **Thẻ bài tương tác (Product Card)**:
  - Hiệu ứng ánh kim phản quang (Holographic Foil Shine) khi hover.
  - Xem nhanh (Quick View Modal) xem chi tiết và thêm nhanh vào giỏ.
  - Thả tim lưu vào Danh sách ước (Wishlist) có hiệu ứng và đếm số lượng.
- **Trang chi tiết sản phẩm cao cấp (Product Detail)**:
  - Zoom cận cảnh thẻ bài 125% khi rê chuột để soi chi tiết in ấn và góc thẻ.
  - Bảng tra cứu tình trạng thẻ (Condition & Grading Scale Modal).
  - Thông số kỹ thuật chuyên biệt cho thẻ TCG (ATK/DEF, HP, Stage, Illustrator, Code).
  - Tab diễn giải cốt truyện thẻ bài & Quy trình đóng gói chống sốc (Armored Packaging).
- **Giỏ hàng & Đơn hàng mẫu (Cart & Checkout Simulation)**:
  - Thêm, bớt, tăng giảm số lượng thẻ bài, tự động tính tổng tiền.
  - Nhập mã giảm giá demo: `LEGEND10` (giảm 10%) hoặc `TCG2026` (giảm 15% VIP).
  - Miễn phí vận chuyển bảo hiểm cho đơn từ $150.
  - Mô phỏng đặt hàng demo và lưu vào lịch sử đơn hàng.
- **Cổng quản trị riêng biệt (Admin Dashboard)**:
  - Biểu đồ doanh thu mô phỏng 6 tháng gần nhất.
  - Bảng quản lý kho sản phẩm: Thêm mới thẻ bài (Demo Modal), chỉnh sửa, xóa thẻ bài.
  - Quản lý đơn hàng (Orders) với cập nhật trạng thái Processing / Shipped / Delivered.
  - Quản lý danh sách khách hàng VIP và phân cấp bậc.
  - Cảnh báo hàng sắp hết trong kho (&lt; 3 bản sao).

---

## 6. Lưu ý nghiệm thu Phase 1

- Đây là giai đoạn **Phase 1: Hoàn thiện toàn bộ giao diện Frontend UI**.
- Toàn bộ dữ liệu sử dụng **Mock Data** chuẩn hóa, không kết nối database máy chủ thật, không tích hợp cổng thanh toán ngân hàng thật.
- Mọi hình ảnh thẻ bài đều là thẻ bài có thật 100% trên thị trường từ Konami, Pokémon Company và Bandai.
