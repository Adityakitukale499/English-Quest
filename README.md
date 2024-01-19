# Project Setup

### 1. Clone the project to your local machine using git.

### 2. Open the terminal navigate to the project directory and run 
   ```bash
npm install 
```

### 3. Get your MongoDB connection string 
```bash
mongodb+srv://<your_username>:<your_password>@cluster.mongodb.net
```

### 4. Create a ```.env``` file inside the project folder as :
```javascript
DATABASE_HOST= cluster.mongodb.net
DATABASE_PORT= 27017
DATABASE_NAME= mongo
DATABASE_USERNAME= your_username
DATABASE_PASSWORD= your_password
DATABASE_SSL= true
DATABASE_SRV= true
```
**Note:** The above credentials to be updated as per the DB configs.

### 5. Open terminal and run 
```bash
npm run develop
``` 

