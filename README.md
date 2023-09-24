# **GenArchi : Backend**

## **Pre-requisite**
- [NodeJS](https://nodejs.org/en/) installed with npm
- Docker install for _development environment_
<br>

## **Branch, commit and PR**

### **Branch**

A branch should be named like this:

`{fix/feat}-{ticketNumber}/quick-description`

ex: `fix-1330/remove-admin-button`

### **Commit**

A commit should follow this pattern:

`{:gitmoji:} ({ticketNumber})({subject}): {commit message}`

ex: `🩹 (1330)(api): fix routes`

Gitmojis can be found [here](https://gitmoji.dev/)

We will use those gitmojis in priority:<br>
:adhesive_bandage: - Bug: Fix a bug <br>
:sparkles: - Feature: Add a new feature <br>
:construction: - WIP<br>
:recycle: - Refactor code<br>
:truck: - Move or rename files<br>
:whale: - Prisma changes (database)<br>

Optionnaly you can add some comments and/or a link to the specified ticket in commit's body

### **Pull Request**

When you submit a pull request, add a quick description of the ticket (what's the issue reported or wanted feature), how this PR resolve the ticket (what did you change/add) and write how to test your feature/changes. <br>
**The last point is very important, don't hesitate to add details !**

## **Start**

### **Environmment variables**
Create `.env` file :
```bash
# Environment variables

# development / staging / production
NODE_ENV=development

SESSION_SECRET="CHANGE-ME"

# Database
DATABASE_NAME="postgres"
DATABASE_USER="admin"
DATABASE_PASSWORD="CHANGE-ME"
DATABASE_HOST="localhost"
DATABASE_URL="postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:8208"
```

### **Install packages**
```bash
npm install
```

### **Start database**
```bash
npm run start:database
npm run migrate
npm run seed

# To stop database
npm run stop:database
```

### **Start backend**
You can start the backend in the terminal :
```bash
npm run start
```

<br>


## **Additonal informations**

- To stop the database and backend
    ```bash
    npm run stop
    ```
- To stop and __delete__ the volumes of the database and backend
    ```bash
    docker-compose down -v
    ```
- See tables in the [schema.prisma](prisma/schema.prisma). You can edit the file, and then run this command to update the state of the database in the migrations folder
    ```bash
    npm run migrate
    ```
