<div align="center">

# ✨ RenderBox

### *Because your pixels deserve better than that crusty MS Paint treatment*

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

<br />

**A full-stack SaaS platform for AI-powered media processing.**  
*Upload. Transform. Download. Touch grass. Repeat.*


---

## 🤔 What is this ?

**RenderBox** is a production-ready SaaS application that handles all the boring media processing stuff so you don't have to open Photoshop (we know you don't have a license anyway 👀).

Built with the latest and greatest in web tech — because using outdated frameworks is basically a personality disorder at this point.

---

## 🎯 Features

### 🎬 Video Upload & Compression
> *"My 4GB video is now 40MB and it still looks good? What kind of black magic..."*

- Upload videos up to **70MB**
- Automatic compression while preserving quality
- Cloud storage via Cloudinary
- Track original vs compressed size (flex on your storage savings)

### 🪄 AI Background Removal
> *"Goodbye, embarrassing background. Hello, professional headshot."*

- One-click background removal powered by Cloudinary AI
- Works on literally anything (yes, even that photo)
- Instant preview & download
- No green screen required — we're not cavemen

### ✨ AI Image Enhancement
> *"It's like Instagram filters, but actually good."*

- AI-powered image enhancement
- Before/after comparison
- Download enhanced images instantly
- Make your potato-quality photos look like they were taken by a professional

### 📱 Social Media Image Creator
> *"Finally, I don't have to Google 'Instagram post dimensions' every single time."*

- Pre-configured formats for all major platforms:
  - Instagram Square (1:1) & Portrait (4:5)
  - Twitter Post (16:9) & Header (3:1)
  - Facebook Cover (205:78)
- Smart cropping with AI-powered gravity
- One-click download, optimized for each platform

---

## 🛠️ Tech Stack

| Category | Technology | Why? |
|----------|------------|------|
| **Framework** | Next.js 16 | Because we like living on the edge (literally, edge functions) |
| **Frontend** | React 19, TypeScript | Type safety or chaos — pick one |
| **Styling** | Tailwind CSS, DaisyUI | Beautiful UI without crying over CSS |
| **Auth** | Clerk | Auth that doesn't make you want to quit programming |
| **Database** | PostgreSQL + Prisma 7 | ORM that actually sparks joy |
| **Media** | Cloudinary | The wizard behind the curtain |
| **Notifications** | React Hot Toast | Because `alert()` is a war crime |

---

## 📦 Installation

### Prerequisites

- Node.js 18+ (seriously, upgrade already)
- PostgreSQL database
- Cloudinary account (free tier works fine, we're not monsters)
- Clerk account

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/RenderBox.git
cd RenderBox
```

### 2. Install dependencies

```bash
npm install
# or if you're a yarn person (no judgment... okay, maybe a little)
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/RenderBox"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/home
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/home

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and witness the magic ✨

---

## 📁 Project Structure

```
RenderBox/
├── 📂 app/
│   ├── 📂 (app)/              # Protected routes (the good stuff)
│   │   ├── 📂 ai-enhancer/    # AI image enhancement
│   │   ├── 📂 background-removal/
│   │   ├── 📂 home/           # Dashboard
│   │   ├── 📂 social-share/   # Social media formatter
│   │   └── 📂 video-upload/   # Video upload & compression
│   ├── 📂 (auth)/             # Auth pages
│   ├── 📂 api/                # API routes
│   │   ├── 📂 image-upload/   # Handles image uploads
│   │   ├── 📂 video-upload/   # Handles video uploads
│   │   └── 📂 video/          # Video operations
│   └── 📄 layout.tsx          # Root layout
├── 📂 components/             # Reusable components
├── 📂 prisma/                 # Database schema & migrations
├── 📂 public/                 # Static assets
└── 📂 types/                  # TypeScript types
```

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/RenderBox)

1. Push your code to GitHub
2. Import your repo to Vercel
3. Add your environment variables
4. Deploy and grab a coffee ☕

### Other Platforms

Works anywhere Node.js runs. We're not picky.

---

## 📊 API Reference

### `POST /api/image-upload`

Upload an image for processing.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | `File` | The image file to upload |

**Response:**
```json
{
  "publicId": "RenderBox/abc123xyz"
}
```

### `POST /api/video-upload`

Upload a video for compression.

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | `File` | Video file (max 70MB) |
| `title` | `string` | Video title |
| `description` | `string` | Optional description |
| `originalSize` | `string` | Original file size |

---

## 🧪 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Lint your code (please) |

---

## 🤝 Contributing

Contributions are what make the open-source community awesome. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

*And please, write descriptive commit messages. "fixed stuff" tells us nothing.* 😤

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

*Translation: Do whatever you want, just don't sue us.*

---

## 🙏 Acknowledgments

- [Cloudinary](https://cloudinary.com) — For making media processing not suck
- [Clerk](https://clerk.com) — For auth that doesn't require a PhD
- [Vercel](https://vercel.com) — For deployment that actually works
- Coffee ☕ — The real MVP

---

<div align="center">

**Built with 💜 and an unhealthy amount of caffeine**

**Feel free to reach out**

*If this helped you, consider giving it a ⭐ — it's free and makes us happy*

</div>

