@echo off
title Capital Cooperative Bank - Server
echo ============================================
echo   Capital Cooperative Bank - Starting...
echo ============================================
echo.

cd /d "%~dp0"

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Checking for Node.js in Program Files...
    if not exist "C:\Program Files\nodejs\node.exe" (
        echo ERROR: Node.js is not installed!
        echo Please install Node.js from https://nodejs.org
        pause
        exit /b 1
    )
    REM Add Node to PATH if not already there
    set "PATH=C:\Program Files\nodejs;%PATH%"
)

if not exist node_modules (
    echo Installing dependencies...
    call "C:\Program Files\nodejs\npm.cmd" install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
)

echo Starting server...
echo.
echo   Website:     http://localhost:3000
echo   Member Login: http://localhost:3000/member-login.html
echo   Admin Login:  http://localhost:3000/admin-login.html
echo.
echo   Admin: admin01 / Admin@123
echo.
echo ============================================
echo   Press Ctrl+C to stop the server
echo ============================================
echo.

REM Start the browser
timeout /t 2 /nobreak
start http://localhost:3000

REM Run the server with explicit path
"C:\Program Files\nodejs\node.exe" server.js
pause
