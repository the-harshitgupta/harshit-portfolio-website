@echo off
title Harshit Gupta Portfolio - Local Server
REM Use the portable Node that was installed for this project
set "PATH=C:\Harshit_Freelancing\_tools\node-v24.16.0-win-x64;%PATH%"
cd /d "%~dp0"

echo ============================================================
echo   Starting your website...
echo   When you see "Ready", open:  http://localhost:3000
echo   Admin panel:                 http://localhost:3000/admin
echo   (Press Ctrl + C in this window to stop the server.)
echo ============================================================
echo.

REM Open the browser a few seconds after the server starts
start "" cmd /c "timeout /t 5 >nul && start http://localhost:3000"

npm run dev
pause
