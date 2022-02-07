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
  cp $file $file.tmpl.js
  envsubst '$VUE_APP_API_BASE_URL' < $file.tmpl.js > $file
  cp $file $file.tmpl.js
  envsubst '$VUE_APP_AVATAR_BASE_URL' < $file.tmpl.js > $file
done

# -------------
# CSP Rule
# -------------
NGINX_CONF_FILE="/etc/nginx/conf.d/default.conf"
INDEX_HTML_FILE="/usr/share/nginx/html/index.html";

# Add avatars url to csp
if [ -z "${VUE_APP_AVATAR_BASE_URL}" ]; then
  echo "[Warn] VUE_APP_AVATAR_BASE_URL env value is not defined, it can cause problem on profile avatar image loading !"
else
  sed -i "s~img-src~img-src $VUE_APP_AVATAR_BASE_URL~g" $NGINX_CONF_FILE
fi

# Replace env in index.html
echo "[Info] Processing $INDEX_HTML_FILE ...";
cp $INDEX_HTML_FILE $INDEX_HTML_FILE.tmp

HEAD_TAG="<\/head>"

# Add google analytics tag to head & csp
if [ -z "${VUE_APP_ANALYTICS_GOOGLE_TAG}" ]; then
  echo "[Info] VUE_APP_ANALYTICS_GOOGLE_TAG env value is not defined";
else 
  GA_TAG='<script>window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga("create", "'$VUE_APP_ANALYTICS_GOOGLE_TAG'", "auto");ga("send", "pageview");<\/script><script async src="https:\/\/www.google-analytics.com\/analytics.js"><\/script>'

  sed -i "s/$HEAD_TAG/$GA_TAG\n$HEAD_TAG/g" $INDEX_HTML_FILE

  sed -i "s~script-src~script-src https://www.google-analytics.com~g" $NGINX_CONF_FILE
fi

echo "[Info] Starting Nginx ..."
nginx -g 'daemon off;'