@echo off
echo ========================================
echo  Installing Dependencies
echo ========================================
echo.
echo Installing npm packages...
echo.

npm install

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✓ Installation completed successfully!
    echo ========================================
    echo.
) else (
    echo.
    echo ========================================
    echo ✗ Installation failed!
    echo ========================================
    echo.
)

pause
