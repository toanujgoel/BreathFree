@echo off
echo ========================================
echo    CleverQuit Production Build Script
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Building application for production...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo [3/4] Copying .htaccess file to dist folder...
copy ".htaccess.template" "dist\.htaccess"
if %errorlevel% neq 0 (
    echo WARNING: Could not copy .htaccess file
)

echo.
echo [4/4] Build completed successfully!
echo.
echo ========================================
echo   DEPLOYMENT INSTRUCTIONS
echo ========================================
echo.
echo 1. Go to your Hostinger hPanel
echo 2. Open File Manager
echo 3. Navigate to public_html folder
echo 4. Delete all existing files
echo 5. Upload ALL files from the 'dist' folder:
echo    - index.html
echo    - assets folder
echo    - .htaccess file
echo.
echo Your application will be live at:
echo https://cleverquit.com
echo.
echo ========================================
pause