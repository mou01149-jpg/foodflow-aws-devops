# 🍔 FoodFlow – Campus & College Food Delivery Web App

**FoodFlow** is a modern, responsive, high-performance web application designed for campus and local food ordering. Built with zero external framework dependencies using HTML5, CSS3, Vanilla JavaScript, and LocalStorage, FoodFlow is optimized for high-speed static delivery via Apache HTTP Server on **AWS EC2** using an automated **AWS DevOps CI/CD Pipeline**.

---

## 🌟 Key Features

* 🍔 **Interactive Menu & Category Filtering**: Filter by Burger, Pizza, Indian, Asian, Desserts, and Drinks with live search & price sort.
* 🛒 **Real-Time Shopping Cart**: Add, edit quantity, remove items, apply coupon codes (`FOOD10`, `COLLEGE20`), choose delivery vs pickup with dynamic fee calculation.
* 📦 **Order Management & Live Tracking**: Simulated real-time order status workflow (Order Placed ➔ Preparing ➔ Out for Delivery ➔ Delivered) saved in `LocalStorage`.
* 💬 **Feedback & Reviews System**: Interactive star ratings and customer review submission.
* 📞 **Contact & Support Form**: Integrated query form with collapsible FAQ accordion.
* 📱 **Mobile First & Ultra Responsive**: Glassmorphism aesthetic, modern color palette, smooth micro-animations.
* 🚀 **Zero Dependencies**: Pure HTML, CSS, JavaScript — no NPM packages, React, or heavy backend runtime needed.

---

## 📁 Repository Structure

```text
FoodFlow/
├── index.html              # Home page with hero, categories, featured items & reviews
├── menu.html               # Full menu page with search, filters, sorting & cart modal
├── cart.html               # Dedicated Shopping Cart page with checkout modal
├── orders.html             # Order History & Live Order Tracking page
├── about.html              # About Us, Mission, Stats & Team page
├── contact.html            # Contact form, location info & FAQ accordion
├── style.css               # Unified Design System CSS (CSS variables, components, dark elements)
├── script.js              # Complete application state management (Cart, Orders, Filters, Toast notifications)
├── buildspec.yml           # AWS CodeBuild specification for validation & artifact packaging
├── appspec.yml             # AWS CodeDeploy application specification & lifecycle hook configuration
├── scripts/                # AWS CodeDeploy Shell Automation Scripts
│   ├── install_dependencies.sh  # Installs Apache httpd and sets web directory permissions
│   ├── stop_server.sh           # Halts Apache service prior to file updates
│   ├── start_server.sh          # Sets strict permissions and restarts Apache server
│   └── validate_service.sh      # Performs HTTP health check against local endpoint
└── README.md               # Project documentation & AWS CI/CD Setup Guide
```

---

## 🛠️ Technology Stack

* **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), Vanilla JavaScript (ES6+)
* **State & Persistence**: Web Browser `LocalStorage`
* **Web Server**: Apache HTTP Server (`httpd`) on Amazon Linux
* **Cloud & DevOps**: AWS EC2, AWS CodePipeline, AWS CodeBuild, AWS CodeDeploy, AWS IAM

---

## 🚀 AWS DevOps CI/CD Deployment Architecture

```text
[ GitHub Repository ]
         │ (Git Push to main)
         ▼
[ AWS CodePipeline ]
         │
         ├───► [ AWS CodeBuild ] ──► (Validates structure, DOCTYPEs, generates build-info.txt)
         │
         └───► [ AWS CodeDeploy ] ──► (Triggers Lifecycle Hooks on EC2 instance)
                      │
                      ▼
             [ Amazon EC2 Instance ] ──► (Apache httpd serving /var/www/html)
```

---

## 📖 Step-by-Step AWS Deployment Guide

### Step 1: Launch & Configure Amazon EC2 Instance
1. Log in to **AWS Management Console** and open **EC2**.
2. Launch a new instance:
   * **AMI**: Amazon Linux 2023 or Amazon Linux 2
   * **Instance Type**: `t2.micro` (Free Tier eligible)
   * **Security Group Rules**:
     * Allow **HTTP (Port 80)** from Anywhere (`0.0.0.0/0`)
     * Allow **SSH (Port 22)** from your IP
3. Create an **IAM Role** for EC2 (e.g. `EC2-CodeDeploy-Role`) with the policy:
   * `AWSCodeDeployFullAccess` or Amazon S3 read permissions for CodeDeploy deployment artifacts.
4. Attach this IAM Role to your EC2 instance under **Actions ➔ Security ➔ Modify IAM Role**.

---

### Step 2: Install CodeDeploy Agent on EC2
Connect to your EC2 instance via SSH or Instance Connect and run:

```bash
sudo dnf update -y || sudo yum update -y
sudo dnf install -y ruby wget || sudo yum install -y ruby wget

# Download and install AWS CodeDeploy Agent (replace region with your AWS region, e.g. us-east-1)
cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto

# Enable and start CodeDeploy agent service
sudo systemctl enable codedeploy-agent
sudo systemctl start codedeploy-agent
sudo systemctl status codedeploy-agent
```

---

### Step 3: Create AWS IAM Service Roles

1. **CodeDeploy Service Role** (`CodeDeployServiceRole`):
   * Trusted entity: `CodeDeploy`
   * Policy: `AWSCodeDeployRole`

2. **CodePipeline Service Role** (`CodePipelineServiceRole`):
   * Created automatically when building the pipeline in AWS Console.

---

### Step 4: Configure AWS CodeBuild
1. Go to **AWS CodeBuild** ➔ **Create build project**.
2. **Project Name**: `FoodFlow-Build`
3. **Source Provider**: GitHub (Connect your account and select the `FoodFlow` repository).
4. **Environment**:
   * Operating System: Amazon Linux
   * Runtime: Standard, Image: `aws/codebuild/amazonlinux2-x86_64-standard:5.0`
5. **Buildspec**: Use `buildspec.yml` in repository root.

---

### Step 5: Configure AWS CodeDeploy
1. Go to **AWS CodeDeploy** ➔ **Create application**.
   * Application Name: `FoodFlow-App`
   * Compute Platform: **EC2/On-premises**
2. **Create Deployment Group**:
   * Deployment Group Name: `FoodFlow-DG`
   * Service Role: Select `CodeDeployServiceRole`
   * Deployment Type: In-place
   * Environment Configuration: Select **Amazon EC2 instances**, Tag Key: `Name`, Value: Your EC2 Instance Tag Name.
   * Deployment Config: `CodeDeployDefault.OneAtATime`
   * Load Balancer: Uncheck if testing single EC2 instance.

---

### Step 6: Create AWS CodePipeline
1. Go to **AWS CodePipeline** ➔ **Create pipeline**.
2. **Pipeline Name**: `FoodFlow-Pipeline`
3. **Source Stage**:
   * Source Provider: **GitHub (Version 2)**
   * Repository & Branch: `main`
   * Output format: CodePipeline default
4. **Build Stage**:
   * Provider: **AWS CodeBuild**
   * Project Name: `FoodFlow-Build`
5. **Deploy Stage**:
   * Provider: **AWS CodeDeploy**
   * Application Name: `FoodFlow-App`
   * Deployment Group: `FoodFlow-DG`
6. Click **Create Pipeline**.

Now, every time you commit code to the `main` branch on GitHub, AWS CodePipeline will automatically build, validate, and deploy your FoodFlow application directly to Apache on your EC2 instance! 🎉

---

## 💻 Local Testing & Development

To test FoodFlow locally on your computer:

### Option 1: Direct File Opening
Simply double-click `index.html` to open it in any modern web browser.

### Option 2: Local HTTP Server (Python)
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Option 3: VS Code Live Server
Right click `index.html` in VS Code and click **Open with Live Server**.

---

## 📜 License & Credits

Built as a high-fidelity frontend reference & AWS DevOps deployment project for college & enterprise showcase.
