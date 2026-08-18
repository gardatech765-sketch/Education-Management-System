# 1. Pastikan di main branch & update
git checkout main
git pull origin main

# 2. Buat branch baru untuk fitur
git checkout -b feature/auth-login

# 3. Coding... lalu commit
git add .
git commit -m "feat: add login authentication"

# 4. Push ke GitHub
git checkout main

# 5. gabungkan 
git merge feature/Home


# 5. cek
git pull origin main
From https://github.com/vann19/garda_tech
 * branch            main       -> FETCH_HEAD
Already up to date.


# 5. push github
git push origin main