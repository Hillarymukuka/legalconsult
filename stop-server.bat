@echo off
echo ========================================
echo  Stopping Pocket Legal Consultant
echo ========================================
echo.
echo Searching for Node.js processes...
echo.

REM Kill all node processes (this will stop the Vite dev server)
taskkill /F /IM node.exe 2>nul

if %errorlevel% equ 0 (
    echo.
    echo ✓ Server stopped successfully!
) else (
    echo.
    echo ℹ No running server found.
)

echo.
pause
