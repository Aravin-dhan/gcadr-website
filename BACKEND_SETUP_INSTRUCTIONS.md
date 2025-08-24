# 🚀 GCADR Backend Setup Instructions

## 📋 Prerequisites

Before starting, ensure you have:
- **Python 3.8 or higher** installed
- **Git** installed
- **Terminal/Command Prompt** access

## 🔧 Step-by-Step Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Create Virtual Environment
```bash
# Try python3 first (recommended)
python3 -m venv venv

# If python3 doesn't work, try python
python -m venv venv
```

### Step 3: Activate Virtual Environment
```bash
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

**✅ Success indicator**: Your terminal prompt should now show `(venv)` at the beginning.

### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 5: Set Up Database
```bash
# Try python3 first
python3 manage.py migrate

# If python3 doesn't work, try python
python manage.py migrate
```

### Step 6: Create Admin User
```bash
# Try python3 first
python3 manage.py createsuperuser

# If python3 doesn't work, try python
python manage.py createsuperuser
```
**When prompted, enter:**
- Username: `admin`
- Email: `admin@gcadr.gnlu.ac.in`
- Password: `admin123`
- Confirm password: `admin123`

### Step 7: Start the Server
```bash
# Try python3 first
python3 manage.py runserver

# If python3 doesn't work, try python
python manage.py runserver
```

**✅ Success indicator**: You should see:
```
Starting development server at http://127.0.0.1:8000/
```

## 🌐 Access Points

Once the server is running, you can access:

- **Admin Panel**: http://localhost:8000/admin/
  - Username: `admin`
  - Password: `admin123`

- **Content Manager**: http://localhost:8000/content/
  - Easy-to-use web interface for content management

- **API Endpoints**: http://localhost:8000/api/
  - RESTful API for frontend integration

## 📝 Quick Content Management

### Using the Web Interface
1. **Go to**: http://localhost:8000/content/
2. **Login** with admin credentials
3. **Edit content** using the visual interface
4. **Click "Build Static Content"** to generate files
5. **Commit and push** changes to deploy

### Using Admin Panel
1. **Go to**: http://localhost:8000/admin/
2. **Login** with admin credentials
3. **Navigate** to the model you want to edit:
   - **Team members**: Core → Team members
   - **Blog posts**: Core → Blog posts
   - **Announcements**: Core → Announcements
   - **Carousel images**: Core → Carousel images

## 🔄 Daily Workflow

### Starting Work
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python manage.py runserver
```

### Making Changes
1. **Edit content** via web interface or admin panel
2. **Build static content**:
   ```bash
   python manage.py export_static_content
   ```
3. **Commit changes**:
   ```bash
   cd ..
   git add .
   git commit -m "Update content"
   git push
   ```

### Stopping Work
- **Press `Ctrl+C`** in the terminal to stop the server
- **Type `deactivate`** to exit the virtual environment

## 🛠️ Troubleshooting

### Issue: "python: command not found"
**Solution**: Try `python3` instead of `python`

### Issue: "pip: command not found"
**Solution**: Try `pip3` instead of `pip`

### Issue: Virtual environment not activating
**Windows Solution**:
```bash
venv\Scripts\activate.bat
```

**macOS/Linux Solution**:
```bash
source venv/bin/activate
```

### Issue: Permission denied
**Solution**: Add `sudo` before commands (macOS/Linux only):
```bash
sudo python3 -m venv venv
```

### Issue: Port already in use
**Solution**: Use a different port:
```bash
python manage.py runserver 8001
```

### Issue: Database errors
**Solution**: Reset database:
```bash
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

## 📦 What Each Command Does

- **`python -m venv venv`**: Creates isolated Python environment
- **`source venv/bin/activate`**: Activates the virtual environment
- **`pip install -r requirements.txt`**: Installs all required packages
- **`python manage.py migrate`**: Sets up the database structure
- **`python manage.py createsuperuser`**: Creates admin user account
- **`python manage.py runserver`**: Starts the development server

## 🎯 Success Checklist

- [ ] Virtual environment created and activated
- [ ] Dependencies installed without errors
- [ ] Database migrations completed
- [ ] Admin user created
- [ ] Server starts without errors
- [ ] Can access admin panel at http://localhost:8000/admin/
- [ ] Can login with admin/admin123
- [ ] Can access content manager at http://localhost:8000/content/

## 🆘 Need Help?

If you encounter any issues:

1. **Check Python version**: `python --version` (should be 3.8+)
2. **Check if virtual environment is active**: Look for `(venv)` in terminal
3. **Check error messages**: Copy the exact error message
4. **Try restarting**: Stop server (Ctrl+C) and run `python manage.py runserver` again

## 🚀 Next Steps

Once the backend is running:
1. **Explore the admin panel** to understand the content structure
2. **Try the content manager** for easier editing
3. **Make a test change** and see it reflected on the website
4. **Follow the deployment workflow** in LOCAL_DEVELOPMENT_WORKFLOW.md

Your GCADR backend is now ready for content management! 🎉
