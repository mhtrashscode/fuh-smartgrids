# Copies relevant files from /dev to /rootfs.
# /rootfs can then be copied to the Home Assistant addon directory without moving node.js dependecies (to avoid large data transfers).
# /rootfs is copied into the addon container image when Home Assistant installs the addon. Node.js dependencies are then installed within the addon container.

if (Test-Path -Path "rootfs\") {
    Remove-Item -LiteralPath "rootfs\" -Force -Recurse
}

Copy-Item -Path "dev\app\src" -Destination "rootfs\app\src" -Recurse
Copy-Item -Path "dev\app\static" -Destination "rootfs\app\static" -Recurse
Copy-Item -Path "dev\app\package.json" -Destination "rootfs\app"

# /data is available inside the addon container by default
# New-Item -Path "rootfs" -Name "data" -ItemType "directory"