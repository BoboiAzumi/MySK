# Diagram Architecture
<img src="https://raw.githubusercontent.com/BoboiAzumi/MySK/refs/heads/main/assets/Diagram.png">

# Installation
## Prerequisite
| Operating System | Ubuntu ^22.04 |
|------------------|---------------|
| Docker           | ^27.4.1       |
| Postgresql       | ^16.6         |

## Clone repository
```bash
git clone https://github.com/BoboiAzumi/MySK
```

## Setup Backend
Update ```backend-service/.env.docker```
```bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# Only change postgresql user and password, don't change postgresql host, port, and db
DATABASE_URL="postgresql://postgres:<your password>@172.17.0.1:5432/mysk?schema=public"
HOST="localhost:3000"

# Recomended to change JWT_SECRET for more security
JWT_SECRET="mysk"
```

You can using external postgresql server
```bash
DATABASE_URL="postgresql://postgres:<your password>@your.postgresql.domain:5432/mysk?schema=public"
```
Change the JWT_SECRET for more security
```bash
JWT_SECRET="<NEW JWT SECRET>"
```

## Setup Frontend
Update ```frontend-service/.env```
```bash
VITE_ENVIRONMENT="DEVELOPMENT"
VITE_BACKEND_URL="http://www.abcd.com"
```

Change ```VITE_ENVIRONMENT``` into ```PRODUCTION``` for deploying, or change into ```SPLIT``` if deploy in separate server.

If you change ```VITE_ENVIRONMENT``` into ```SPLIT``` you mush change ```VITE_BACKEND_URL```.

## Setup Nginx Reverse Proxy
Update ```nginx/default.conf```

```bash
server {
    listen 3000;

    location / {
        proxy_pass http://172.120.0.3;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api/ {
        proxy_pass http://172.120.0.2:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
By default, nginx will open port 3000, if you want change this port, you must edit ```listen``` into port number you want.
And then, you must edit configuration in ```docker-compose.yaml```.
```bash
reverse-proxy:
    build:
      context: ./nginx
      dockerfile: Dockerfile

    tty: true
    restart: always

    ports:
      - "3000:3000"

    depends_on:
      - backend-service
      - frontend-service
    
    networks:
      mysk-network:
        ipv4_address: 172.120.0.4
```
change ```ports``` into port number you want, for example

```bash
reverse-proxy:
    build:
      context: ./nginx
      dockerfile: Dockerfile

    tty: true
    restart: always

    ports:
      - "8080:8080"

    depends_on:
      - backend-service
      - frontend-service
    
    networks:
      mysk-network:
        ipv4_address: 172.120.0.4
```

## Deploy
If all prerequisite and configuration already done, you can deploy this project by only command
```bash
sudo docker compose up -d
```

## Shutdown
You can shutdown and delete all running service by command
```bash
sudo docker compose down --rmi "all"
```

## File Store
All files will store in
```
/var/mysk
```