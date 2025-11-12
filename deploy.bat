@echo off
echo ================================
echo  Deploying to GitHub
echo ================================
echo.

echo Staging all changes...
git add .

echo.
set /p message="Enter commit message: "

echo.
echo Committing changes...
git commit -m "%message%"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ================================
echo  Deployment Complete!
echo ================================
echo.
echo Your changes have been pushed to GitHub.
echo GitHub Actions will automatically build and deploy.
echo.
echo Check deployment status:
echo https://github.com/Hillarymukuka/legalconsult/actions
echo.
echo Your live app (after deployment completes):
echo https://hillarymukuka.github.io/legalconsult/
echo.
pause
