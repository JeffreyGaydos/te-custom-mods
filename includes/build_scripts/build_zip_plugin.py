printPrefix = "[build_zip_plugin.py]: "

import shutil
import os

buildDir = "build"

if(os.path.exists(buildDir)):
    shutil.rmtree(buildDir)
# shutil.copy("../")
os.mkdir(buildDir) # put everything that needs zipped in here
print(printPrefix + "created " + buildDir)
os.mkdir(buildDir + "/includes")
print(printPrefix + "created " + buildDir + "/includes")

jsPrefix = "./includes/js"
jsDest = buildDir + "/includes/js"
os.mkdir(jsDest)
print(printPrefix + "created " + jsDest)
for jsfile in os.listdir(jsPrefix):
    shutil.copy(jsPrefix + "/" + jsfile, jsDest)
    print(printPrefix + "copied '" + jsfile + "' to '" + jsDest + "'")
cssPrefix = "./includes/css"
cssDest = buildDir + "/includes/css"
os.mkdir(cssDest)
print(printPrefix + "created " + cssDest)
for cssfile in os.listdir(cssPrefix):
    shutil.copy(cssPrefix + "/" + cssfile, cssDest)
    print(printPrefix + "copied '" + cssfile + "' to '" + cssDest + "'")
shutil.copy("./includes/tec-functions.php", buildDir + "/includes")
print(printPrefix + "copied 'tec-functions.php'")
shutil.copy("./te-custom-mods.php", buildDir)
print(printPrefix + "copied 'te-custom-mods.php'")
imgPrefix = "./images"
imgDest = buildDir + "/images"
os.mkdir(imgDest)
print(printPrefix + "created " + imgDest)
for img in os.listdir(imgPrefix):
    shutil.copy(imgPrefix + "/" + img, imgDest)
    print(printPrefix + "copied '" + img + "' to '" + imgDest + "'")

print(printPrefix + "zipping...")
zipName = "te-custom-mods"
zipExt = "zip"
shutil.make_archive(zipName, zipExt, buildDir)
print(printPrefix + "zipped to '" + zipName + zipExt + "'")

if(os.path.exists(buildDir)):
    shutil.rmtree(buildDir)
print(printPrefix + "Deleted build directory. Build Complete")

