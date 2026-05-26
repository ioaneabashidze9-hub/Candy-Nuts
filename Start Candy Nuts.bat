@echo off
echo ==============================================
echo        Starting Candy Nuts Local Server...
echo ==============================================
cd /d "%~dp0"
start "" http://localhost:5173
call npm run dev
pause
