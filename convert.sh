#!/usr/bin/env bash

if [ -z "$1" ] || [ -z "$2" ];then
  echo "Usage: convert.sh <inFile> <outFile>"
  exit 1;
fi

IN_FILE=$1 OUT_FILE=$2 npm run start