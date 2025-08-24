@echo off
REM 🚀 GCADR Backend Automated Setup Script for Windows
REM This script sets up the Django backend automatically

echo 🚀 Starting GCADR Backend Setup...
echo ==================================

REM Check if we're in the backend directory
if not exist "manage.py" (
    echo [ERROR] manage.py not found. Please run this script from the backend directory.
    echo Usage: cd backend && setup_backend.bat
    pause
    exit /b 1
)

echo [INFO] Found Django project. Continuing setup...

REM Step 1: Check Python version
echo [INFO] Checking Python version...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    set PYTHON_CMD=python
    set PIP_CMD=pip
    echo [SUCCESS] Found Python
) else (
    python3 --version >nul 2>&1
    if %errorlevel% equ 0 (
        set PYTHON_CMD=python3
        set PIP_CMD=pip3
        echo [SUCCESS] Found Python3
    ) else (
        echo [ERROR] Python not found. Please install Python 3.8 or higher.
        pause
        exit /b 1
    )
)

REM Step 2: Create virtual environment
echo [INFO] Creating virtual environment...
if exist "venv" (
    echo [WARNING] Virtual environment already exists. Removing old one...
    rmdir /s /q venv
)

%PYTHON_CMD% -m venv venv
if %errorlevel% neq 0 (
    echo [ERROR] Failed to create virtual environment
    pause
    exit /b 1
)
echo [SUCCESS] Virtual environment created successfully!

REM Step 3: Activate virtual environment
echo [INFO] Activating virtual environment...
call venv\Scripts\activate.bat
echo [SUCCESS] Virtual environment activated!

REM Step 4: Upgrade pip
echo [INFO] Upgrading pip...
%PIP_CMD% install --upgrade pip
echo [SUCCESS] Pip upgraded successfully!

REM Step 5: Install dependencies
echo [INFO] Installing dependencies...
if not exist "requirements.txt" (
    echo [ERROR] requirements.txt not found!
    pause
    exit /b 1
)

%PIP_CMD% install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully!

REM Step 6: Run migrations
echo [INFO] Setting up database...
%PYTHON_CMD% manage.py migrate
if %errorlevel% neq 0 (
    echo [ERROR] Database migration failed
    pause
    exit /b 1
)
echo [SUCCESS] Database migrations completed!

REM Step 7: Create superuser
echo [INFO] Creating admin user...
echo from django.contrib.auth import get_user_model > create_admin.py
echo User = get_user_model() >> create_admin.py
echo if User.objects.filter(username='admin').exists(): >> create_admin.py
echo     User.objects.filter(username='admin').delete() >> create_admin.py
echo     print("Removed existing admin user") >> create_admin.py
echo admin_user = User.objects.create_superuser( >> create_admin.py
echo     username='admin', >> create_admin.py
echo     email='admin@gcadr.gnlu.ac.in', >> create_admin.py
echo     password='admin123' >> create_admin.py
echo ) >> create_admin.py
echo print("Admin user created successfully!") >> create_admin.py
echo print("Username: admin") >> create_admin.py
echo print("Password: admin123") >> create_admin.py

%PYTHON_CMD% manage.py shell < create_admin.py
del create_admin.py
echo [SUCCESS] Admin user created: admin/admin123

REM Step 8: Collect static files
echo [INFO] Collecting static files...
%PYTHON_CMD% manage.py collectstatic --noinput
echo [SUCCESS] Static files collected!

REM Final success message
echo.
echo 🎉 GCADR Backend Setup Complete!
echo =================================
echo.
echo [SUCCESS] ✅ Virtual environment created and activated
echo [SUCCESS] ✅ Dependencies installed
echo [SUCCESS] ✅ Database set up and migrated
echo [SUCCESS] ✅ Admin user created (admin/admin123)
echo [SUCCESS] ✅ Static files collected
echo.
echo 🚀 To start the server:
echo    %PYTHON_CMD% manage.py runserver
echo.
echo 🌐 Access points:
echo    Admin Panel: http://localhost:8000/admin/
echo    Content Manager: http://localhost:8000/content/
echo    API: http://localhost:8000/api/
echo.
echo 👤 Admin credentials:
echo    Username: admin
echo    Password: admin123
echo.
echo [SUCCESS] Setup completed successfully! 🎉
echo.
echo Press any key to start the server...
pause >nul

REM Start the server
echo [INFO] Starting Django server...
%PYTHON_CMD% manage.py runserver
