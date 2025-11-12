@echo off
echo ================================
echo  Deploying Cloudflare Worker
echo ================================
echo.

cd worker
wrangler deploy

echo.
echo ================================
echo  Worker Deployed!
echo ================================
echo.
echo Worker URL:
echo https://legalconsult-ai-proxy.hillarymukuka.workers.dev
echo.
pause
