@echo off
title MARTINE - serveur du jeu
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"

echo.
echo    ===============================================
echo      MARTINE demarre...
echo.
echo      - Le jeu va s'ouvrir tout seul dans ton
echo        navigateur (patiente quelques secondes).
echo      - LAISSE cette fenetre noire OUVERTE pendant
echo        que tu joues.
echo      - Pour ARRETER : ferme simplement cette fenetre.
echo    ===============================================
echo.

rem --- Libere le port 5173 s'il est reste bloque par un ancien serveur ---
rem (sinon --strictPort refuse de demarrer). On garde 5173 pour ne pas
rem perdre la progression, qui est enregistree pour cette adresse.
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":5173 " ^| findstr LISTENING') do taskkill /F /PID %%p >nul 2>&1

node "node_modules\vite\bin\vite.js" --open --port 5173 --strictPort

echo.
echo    Le serveur s'est arrete. Tu peux fermer cette fenetre.
pause
