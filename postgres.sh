#!/bin/bash

# Author: chankruze (chankruze@geekofia.in)
# Created: Thu Oct 08 2020 05:01:14 GMT+0530 (India Standard Time)

# Copyright (c) Geekofia 2020 and beyond

clear
REQUIRED_PKG="postgresql"
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' $REQUIRED_PKG | grep "install ok installed")
echo "Checking for $REQUIRED_PKG: $PKG_OK"

if [ "" = "$PKG_OK" ]; then
  echo "No $REQUIRED_PKG. Setting up $REQUIRED_PKG."
  # Create the file repository configuration
  sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
  # Import the repository signing key
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
  # Update the package lists
  sudo apt-get update
  # Install the latest version of PostgreSQL.
  # If you want a specific version, use 'postgresql-12' or similar instead of 'postgresql'
  sudo apt-get -y install postgresql
  # restart postgresql
  sudo pg_lsclusters $(pg_lsclusters | grep "main" | cut -d" " -f1) main start
  sudo service postgresql restart
  pg_lsclusters
fi

PG_CLUSTER=$(pg_lsclusters | grep "main" | cut -d" " -f1)
PG_STATUS=$(pg_lsclusters | grep "main" | cut -d" " -f8)

if [ "$PG_STATUS" = "down" ]; then
sudo pg_lsclusters $PG_CLUSTER main start
  sudo service postgresql restart
  pg_lsclusters
fi

DB=""
USER=""

while getopts ":d:u:p:" opt; do
  case $opt in
  d)
    sudo -u postgres createdb $OPTARG
    DB=$OPTARG
    ;;
  \?)
    echo "Invalid option: -$OPTARG" >&2
    exit 1
    ;;
  :)
    echo "Option -$OPTARG requires an username." >&2
    exit 1
    ;;
  esac
  case $opt in
  u)
    sudo -u postgres createuser $OPTARG
    USER=$OPTARG
    ;;
  \?)
    echo "Invalid option: -$OPTARG" >&2
    exit 1
    ;;
  :)
    echo "Option -$OPTARG requires an username." >&2
    exit 1
    ;;
  esac
  case $opt in
  p)
    sudo -u postgres psql -c "ALTER USER $USER PASSWORD '$OPTARG';"
    sudo -u postgres psql -c "grant all privileges on database \"$DB\" to $USER;"
    ;;
  \?)
    echo "Invalid option: -$OPTARG" >&2
    exit 1
    ;;
  :)
    echo "Option -$OPTARG requires an password." >&2
    exit 1
    ;;
  esac
done

sudo -u postgres psql -c "\l"
sudo -u postgres psql -c "\du"
