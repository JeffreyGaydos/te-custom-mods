printPrefix = "[build_zip_plugin.py]: "

import shutil
import os
import datetime

def pprint(any):
    print(f"{datetime.datetime.now()} {printPrefix}{any}")

buildDir = "build"

if(os.path.exists(buildDir)):
    shutil.rmtree(buildDir)
# shutil.copy("../")
os.mkdir(buildDir) # put everything that needs zipped in here
pprint("created " + buildDir)
os.mkdir(buildDir + "/includes")
pprint("created " + buildDir + "/includes")

jsPrefix = "./includes/js"
jsDest = buildDir + "/includes/js"
os.mkdir(jsDest)
pprint("created " + jsDest)
for jsfile in os.listdir(jsPrefix):
    shutil.copy(jsPrefix + "/" + jsfile, jsDest)
    pprint("copied '" + jsfile + "' to '" + jsDest + "'")
cssPrefix = "./includes/css"
cssDest = buildDir + "/includes/css"
os.mkdir(cssDest)
pprint("created " + cssDest)
for cssfile in os.listdir(cssPrefix):
    shutil.copy(cssPrefix + "/" + cssfile, cssDest)
    pprint("copied '" + cssfile + "' to '" + cssDest + "'")
shutil.copy("./includes/tec-functions.php", buildDir + "/includes")
pprint("copied 'tec-functions.php'")
shutil.copy("./te-custom-mods.php", buildDir)
pprint("copied 'te-custom-mods.php'")
imgPrefix = "./images"
imgDest = buildDir + "/images"
os.mkdir(imgDest)
pprint("created " + imgDest)
for img in os.listdir(imgPrefix):
    shutil.copy(imgPrefix + "/" + img, imgDest)
    pprint("copied '" + img + "' to '" + imgDest + "'")

pprint("zipping...")
zipName = "te-custom-mods"
zipExt = "zip"
shutil.make_archive(zipName, zipExt, buildDir)
pprint("zipped to '" + zipName + zipExt + "'")

if(os.path.exists(buildDir)):
    shutil.rmtree(buildDir)
pprint("Deleted build directory. Build Complete")

