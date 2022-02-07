#!/bin/sh

# Replace env in app.*.js
for file in /usr/share/nginx/html/js/app.*.js;
do
  echo "[Info] Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi

  envsubst '$VUE_APP_BASE_URI' < $file.tmpl.js > $file
  envsubst '$VUE_APP_API_BASE_URL' < $file > $file
  envsubst '$VUE_APP_AVATAR_BASE_URL' < $file > $file
done

# Replace env in index.html
file="/usr/share/nginx/html/index.html";

echo "[Info] Processing $file ...";
cp $file $file.tmp

head_tag="<\/head>"
if [ -z "${VUE_APP_ANALYTICS_GOOGLE_TAG}" ]; then
  echo "[Info] VUE_APP_ANALYTICS_GOOGLE_TAG env value is not defined";
else 
  # Inject google analytics
  g_tag='<script>window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga("create", "'$VUE_APP_ANALYTICS_GOOGLE_TAG'", "auto");ga("send", "pageview");<\/script><script async src="https:\/\/www.google-analytics.com\/analytics.js"><\/script>\n'$head_tag
  sed -i "s/$head_tag/$g_tag/g" $file
fi

echo "[Info] Starting Nginx ..."
nginx -g 'daemon off;'