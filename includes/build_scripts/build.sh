#!/bin/sh
printf "[build.sh]: Build Start $(date --utc +%m-%d-%Y_%H:%M:%SZ) (UTC)\n" > build_log.txt

python build_js_version_tick.py >> build_log.txt
python build_css_version_tick.py >> build_log.txt
python build_localhost_path_cleanup.py >> build_log.txt
python build_zip_plugin.py >> build_log.txt

printf "[build.sh]: Build Completed Successfully" >> build_log.txt