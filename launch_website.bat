@echo off

cd /d "backend"
start cmd /k "python manage.py runserver"

cd..

cd /d "frontend"
start cmd /k "npm start"
