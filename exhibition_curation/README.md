# CurationStudio: An Exhibition Curation Platform - Frontend 🖌️

This is the frontend repository for CurationStudio, a web application that allows users and guests to browse, save, and curate artworks from public museum APIs including:
- The Art Institute of Chicago 
- Harvard Art Museums.

## 🌐 Live Demo
Visit the live application [here](https://curation-studio.netlify.app ).


## ✨ Features

- Browse artworks from AIC and Harvard Art Museums
- Search and filter by title, artist, and artwork type
- Sort artworks by title or date
- Save artworks as a registered user or as a guest
- View saved artworks (guest or user-specific)
- User login and registration

## 🔗 Backend
The backend for this project can be found [here](https://github.com/your-username/be-exhibitions).

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- React (App Router, Client Components)
- Tailwind CSS
- Axios

## 🚀 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/[your-username]/fe-exhibitions.git
cd fe-launchpad/exhibition-curation
```

### 2. Install dependencies
Install all used dependencies using the following command:
```bash
npm install
```

### 3. Create a .env.local file
Insert the following key to access the artwork from the Harvard Art Museums. 
```bash
NEXT_PUBLIC_HARVARD_API_KEY=your_harvard_api_key
```
Your Harvard API key can be extracted by filling in the following [form](https://docs.google.com/forms/d/e/1FAIpQLSfkmEBqH76HLMMiCC-GPPnhcvHC9aJS86E32dOd0Z8MpY2rvQ/viewform) which was found [here](https://harvardartmuseums.org/collections/api). This will give access to the Harvard API and allow you to make requests to it.

### 4. Start the development server
```bash
npm run dev
```
Visit http://localhost:3000 in your browser.



### 📁 Folder Structure

src/app – Pages and route handlers

api.js – Axios-based API functions for interaction between the frontend and backend

public/ – Static assets

### 📦 Deployment
This app can be deployed on Netlify or Vercel as a static Next.js project. Make sure to set the correct environment variables in your platform's dashboard.

### 🔗 API Access
Most API requests are made to the live backend at:
https://be-exhibitions.onrender.com