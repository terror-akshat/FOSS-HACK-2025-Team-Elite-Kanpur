# FOSS-HACK-2025-Team- The Elite-Kanpur

📸 Screenshots & Demo
website: https://funny-trifle-39cd51.netlify.app/


#  BoardMeet - Real-time Whiteboard & Video Calling for Two Users 🎨🎥
🚀 BoardMeet is a real-time collaborative whiteboard and one-on-one video conferencing application. It enables two users to draw, communicate, and brainstorm visually in an interactive session.
Built using Node.js, Express, Socket.io, and WebRTC, BoardMeet ensures low-latency communication for a seamless experience.


# ✨ Features
✅ Real-Time Whiteboard Collaboration – Instantly sync drawings and sketches between two users.
🎥 One-on-One Video Calls – Secure, high-quality peer-to-peer communication using WebRTC.
🔗 Easy Room Creation – Join a session by simply sharing a room ID.
⚡ Low-Latency Communication – Built with Socket.io for fast updates.
🔒 Private & Secure – Only two participants per session, ensuring privacy.

# 📌 How It Works
1️⃣ Create a Meeting Room – One user creates a unique room ID.
2️⃣ Join the Room – The second user enters the room using the same ID.
3️⃣ Start the Collaboration –
   * Video Call: Communicate in real-time.
   * Whiteboard: Draw and see live updates instantly.
4️⃣ Exit Anytime – The session ends when a user disconnects.


# 🛠️ Tech Stack
Backend: Node.js, Express, Socket.io
Real-Time Communication: WebRTC, Socket.io
Frontend (Deployed At): Netlify
Hosting: Deployed on Heroku/Vercel/Render


# 🚀 Installation & Setup
# 🔧 Backend Setup
 * Clone the repository
   git clone https://github.com/your-username/BoardMeet.git

*  Navigate to the project directory
   cd BoardMeet

*  Install dependencies
   npm install

* Start the server
  node server.js


# 🛠 API Endpoints
Endpoint     	Method	        Description
/	             GET	       Check if the server is running
callUser	     POST	       Initiate a video call
answerCall	   POST	       Accept a call invitation
draw	         POST	       Send whiteboard drawing data


# 📜 License
This project is licensed under the MIT License.


# 🙏 Acknowledgments
A huge thanks to the open-source community and technologies like:
* Node.js & Express for backend support
* Socket.io for real-time data transfer
* WebRTC for enabling video calls
