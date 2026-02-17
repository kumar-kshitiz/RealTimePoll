# 🗳 Realtime Polling App

🔗 **Live Demo:** https://kshitiz-instavote-kumar.vercel.app/

> **Note:** Frontend is deployed on **Vercel** and backend on **Render**.  
> The backend runs on Render’s free tier, so the first request may take ~30–60 seconds or even more if the server has been inactive (cold start).

A realtime anonymous polling application where users can join a poll via a shareable link and vote live.  
Votes are persisted in the database and results update instantly using WebSockets.

Built to demonstrate **system design, realtime communication, and fair anonymous voting controls**.

---

## 🚀 Features

- Create and share polls via unique share links  
- Realtime voting using Socket.io  
- One vote per device (anonymous voting control)  
- Votes persist after refresh  
- Live vote count updates for all users  
- Scalable backend validation  
- Clean UI with instant feedback  

---

## 🧱 Tech Stack

### **Frontend**
- React  
- TailwindCSS  
- Socket.io Client  

### **Backend**
- Node.js  
- Express  
- MongoDB (Mongoose)  
- Socket.io  

---

## ⚖️ Fairness & Anti-Abuse Mechanisms

To prevent duplicate anonymous voting while still allowing multiple users on the same network, the system uses **two main strategies**.

### **1. Device-Level Vote Restriction (Primary)**

Each browser generates a **unique device identifier** using fingerprinting on the frontend.

- Device fingerprint restriction  
- Database-level uniqueness enforcement  

This ensures that each device can only vote once per poll.

---

### **2. Edge Cases Covered**

The system handles several common voting edge cases:

- Double-click voting  
- Page refresh after voting  
- Multiple tabs open  
- Multiple users on the same Wi-Fi  
- Incognito mode usage  
- User clears browser storage  

---

## ⚠️ Known Limitations

While the system provides strong anonymous vote protection, some limitations exist:

1. **Device fingerprinting is not 100% foolproof**  
   Highly technical users could bypass restrictions using VMs or privacy browsers.

2. **Incognito mode differences**  
   Some browsers generate a new fingerprint in incognito mode, allowing an extra vote.

3. **Anonymous by design**  
   The system ensures **one vote per device**, not one vote per person.

4. **Poll lifecycle not implemented yet**  
   Poll expiration, closing, or scheduling logic is not currently implemented.

---

## 🛠 Future Improvements

- Poll expiration / auto-close logic  
- Admin controls for polls  
- Rate limiting  
- Analytics dashboard  
- Horizontal scaling with Redis adapter for Socket.io  

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/kumar-kshitiz/RealTimePoll .