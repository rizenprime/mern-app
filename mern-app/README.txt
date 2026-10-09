HOW TO RUN (use Command Prompt, or PowerShell after fixing the execution policy)

1. Open the mern-app folder in VS Code (File > Open Folder).

2. Open server/.env and replace PASTE_YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE with your
   Atlas string, with a database name before the "?", for example:
   MONGO_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/studentdb?retryWrites=true&w=majority
   (PORT=5000 must stay on its OWN line.)

3. Terminal 1 (backend):
   cd server
   npm install
   node server.js
   -> should print: Server running on port 5000  and  MongoDB connected

4. Terminal 2 (frontend):
   cd client
   npm install
   npm run dev
   -> open http://localhost:5173
