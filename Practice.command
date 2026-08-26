#!/bin/bash
# Double-click this file to start your guitar practice session.
cd "$(dirname "$0")"
# Kill any previous session on this port
lsof -ti:7432 | xargs kill -9 2>/dev/null
# Start server quietly in background
python3 -m http.server 7432 &>/dev/null &
SERVER_PID=$!
# Give it a moment to start
sleep 0.5
# Open the practice page
open "http://localhost:7432/index.html"
# Keep the terminal window alive so the server keeps running
echo "Guitar practice server running. Close this window to stop."
wait $SERVER_PID
