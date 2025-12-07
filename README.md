# Inventory Management App

A simple inventory management application built with **React** and **Firebase**.

This app allows admins to manage items and users to request items. Admins can approve or reject requests, and users get real-time notifications when their requests are processed.

---

## Features

* **Admin Panel**:

  * Add new inventory items
  * Approve or reject user requests
  * See all requests with their status
* **User Panel**:

  * View available inventory items
  * Send requests for items
  * Receive real-time notifications when requests are approved or rejected
* **Realtime Updates**:

  * Users see immediate feedback via Snackbar notifications
* **Environment Variables**:

  * Firebase configuration stored in `.env` file

---

## Tech Stack

* **React**
* **MUI Joy** (UI components)
* **Firebase Firestore** (database)
* **Firebase Auth**

---

## Setup

1. **Clone the repository:**

```bash
git clone https://github.com/stefansavic23/inventory-management-app.git
cd inventory-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

---

## Usage

* **Admin**:

  * Open the admin panel
  * Add new items to the inventory
  * Approve or reject user requests

* **User**:

  * Browse available inventory items
  * Click “Get” to request an item
  * Receive a notification when the request is approved or rejected