---
description: Start the local PostgreSQL database using Podman
---

# Start Database

This workflow checks if the Podman machine is running and starts a PostgreSQL container for the local database.
Note: Uses port 5433 to avoid conflicts with default Postgres port.

1. Start the Podman machine if it's not running
```powershell
podman machine start
```

2. Run the PostgreSQL container
// turbo
```powershell
podman run --name antigravity-db -e POSTGRES_PASSWORD=leon -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -p 5433:5432 -d postgres:latest
```
