#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

echo "Waiting for database to be healthy..."
# Simple check - relies on depends_on: condition: service_healthy

echo "Checking database migration status..."
# Run 'prisma migrate status'. Capture output. Use '|| true' so set -e doesn't exit on expected "errors" (like drift).
STATUS_OUTPUT=$(npx prisma migrate status || true)
echo "Prisma Status Output:"
echo "$STATUS_OUTPUT"

# Check if the specific "Database schema is up to date" message is NOT present.
# grep -q returns 0 if found, 1 if not found. We trigger migrations if NOT found (exit code 1).
if ! echo "$STATUS_OUTPUT" | grep -q "Database schema is up to date"; then
  echo "WARNING: Database schema is not up to date or drift detected."

  # --- DANGER ZONE ---
  echo "Running: npx prisma migrate reset --force"
  # !!! THIS IS DESTRUCTIVE - IT WILL WIPE YOUR DATABASE !!!
  # Consider adding an environment variable check to only allow this in dev:
  # if [ "$NODE_ENV" = "development" ]; then
  #   npx prisma migrate reset --force
  # else
  #   echo "ERROR: Destructive reset attempted in non-development environment. Aborting."
  #   exit 1
  # fi
  npx prisma migrate reset --force # REMOVE or GUARD THIS LINE for production/staging

  echo "Running: npx prisma migrate dev --name entrypoint-init"
  # 'migrate dev' might be okay after a reset, but 'migrate deploy' is safer if migrations exist
  npx prisma migrate dev --name entrypoint-init # Consider using migrate:deploy here instead
  # --- END DANGER ZONE ---

  echo "Migrations applied after reset/dev."
else
  echo "Database schema is already up to date. Skipping reset/dev."
  # Optionally, you could still run 'deploy' here just in case, though status should be reliable.
  # echo "Applying any potentially missed migrations (safety check)..."
  # npx prisma migrate deploy
fi

echo "Starting application..."
# Execute the command passed as CMD (which should now be ["npm", "start"])
exec "$@"