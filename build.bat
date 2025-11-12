@echo off
echo ========================================
echo  Building Pocket Legal Consultant
echo ========================================
echo.
echo Building production version...
echo.

npm run build

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✓ Build completed successfully!
    echo ========================================
    echo.
    echo Production files are in the 'dist' folder
    echo.
) else (
    echo.
    echo ========================================
    echo ✗ Build failed!
    echo ========================================
    echo.
)

pause
