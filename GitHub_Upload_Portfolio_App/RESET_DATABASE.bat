@echo off
title Reset / Seed Database
set "PATH=C:\Harshit_Freelancing\_tools\node-v24.16.0-win-x64;%PATH%"
cd /d "%~dp0"

echo Creating database tables and seeding sample blog posts...
call npx prisma db push --skip-generate
call node prisma\seed.mjs
echo.
echo Done. You can close this window.
pause
