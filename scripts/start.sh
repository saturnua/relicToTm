#!/bin/sh

# shellcheck disable=SC2039
if [ "$NODE_ENV" == "production" ] ; then
  npm run start
else
  npm run dev
fi